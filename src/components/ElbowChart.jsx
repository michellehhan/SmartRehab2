import React, { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter, ReferenceLine } from 'recharts'
import Papa from 'papaparse'

const ElbowChart = ({ errorRange = 30, smoothing = 70, showGuides = true }) => {
  const [healthyData, setHealthyData] = useState([])
  const [sarcData, setSarcData] = useState([])
  const [exoData, setExoData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [chartType, setChartType] = useState('torque-comparison')

  useEffect(() => {
    const loadCSVFiles = async () => {
      try {
        // Load all three CSV files
        const [healthyResponse, sarcResponse, exoResponse] = await Promise.all([
          fetch('/healthy.csv'),
          fetch('/sarc.csv'),
          fetch('/data.csv')
        ])

        if (!healthyResponse.ok || !sarcResponse.ok || !exoResponse.ok) {
          throw new Error('One or more CSV files not found. Please ensure healthy.csv, sarc.csv, and data.csv are in /public/')
        }

        const [healthyText, sarcText, exoText] = await Promise.all([
          healthyResponse.text(),
          sarcResponse.text(),
          exoResponse.text()
        ])

        const parseCSV = (csvText) => {
          return new Promise((resolve) => {
            Papa.parse(csvText, {
              header: false,
              skipEmptyLines: true,
              complete: (results) => {
                const processedData = results.data.map((row, index) => ({
                  time: index * 0.01, // Assuming 100Hz sampling rate (0.01s intervals)
                  targetValue: parseFloat(row[0]) || 0,
                  weight: parseFloat(row[1]) || 0,
                  minError: parseFloat(row[2]) || 0,
                  timeToMinError: parseFloat(row[3]) || 0,
                  muscleEnergy: parseFloat(row[4]) || 0,
                  exoEnergy: parseFloat(row[5]) || 0,
                  // Simulate torque based on muscle energy and error
                  torque: (parseFloat(row[4]) || 0) / 10000 * Math.sin(index * 0.1) + (parseFloat(row[2]) || 0) * 1000,
                  angleError: (parseFloat(row[2]) || 0) * 100 // Scale error for visualization
                })).filter(row => !isNaN(row.targetValue))
                resolve(processedData)
              }
            })
          })
        }

        const [healthyParsed, sarcParsed, exoParsed] = await Promise.all([
          parseCSV(healthyText),
          parseCSV(sarcText),
          parseCSV(exoText)
        ])

        setHealthyData(healthyParsed)
        setSarcData(sarcParsed)
        setExoData(exoParsed)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    loadCSVFiles()
  }, [])

  // Smoothing helpers
  const smoothSeries = (data, key, windowSize) => {
    if (!Array.isArray(data) || windowSize <= 1) return data
    const out = [...data]
    for (let i = 0; i < data.length; i++) {
      let sum = 0, count = 0
      for (let j = Math.max(0, i - windowSize + 1); j <= i; j++) {
        const v = data[j]?.[key]
        if (v !== null && v !== undefined && !Number.isNaN(v)) {
          sum += v
          count++
        }
      }
      out[i] = { ...data[i], [key]: count ? sum / count : null }
    }
    return out
  }

  // Map single smoothing slider to window sizes
  const torqueWindow = Math.max(1, Math.round(((smoothing - 10) / 40) * 20)) // 1..20 for smoothing 10..50
  const emgWindow = Math.max(1, Math.round(((smoothing - 10) / 40) * 15))   // 1..15

  const renderChart = () => {
    if (healthyData.length === 0 && sarcData.length === 0 && exoData.length === 0) return null

    // Combine data for comparison, limit to first 500 points for better performance
    const maxLength = Math.min(500, Math.max(healthyData.length, sarcData.length, exoData.length))

    switch (chartType) {
      case 'torque-comparison':
        let combinedData = Array.from({ length: maxLength }, (_, i) => ({
          time: i * 0.01,
          healthyTorque: healthyData[i]?.torque || null,
          sarcTorque: sarcData[i]?.torque || null,
          exoTorque: exoData[i]?.torque || null
        }))
        combinedData = smoothSeries(combinedData, 'healthyTorque', torqueWindow)
        combinedData = smoothSeries(combinedData, 'sarcTorque', torqueWindow)
        combinedData = smoothSeries(combinedData, 'exoTorque', torqueWindow)

        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={combinedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="time" 
                label={{ value: 'Episode Time t (seconds)', position: 'insideBottom', offset: -20 }}
              />
              <YAxis 
                label={{ value: 'Torque (Nm)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                formatter={(value, name) => [
                  value !== null ? value.toFixed(2) : 'N/A',
                  name
                ]}
                labelFormatter={(value) => `Time: ${value}s`}
              />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
              {showGuides && <ReferenceLine y={0} stroke="#9ca3af" strokeDasharray="3 3" />}
              <Line 
                type="monotone" 
                dataKey="exoTorque" 
                stroke="#3b82f6" 
                name="Exo_11.5_wt_5.0"
                strokeWidth={1}
                dot={false}
                connectNulls={false}
              />
              <Line 
                type="monotone" 
                dataKey="healthyTorque" 
                stroke="#f97316" 
                name="Healthy_wt_5.0"
                strokeWidth={1}
                dot={false}
                connectNulls={false}
              />
              <Line 
                type="monotone" 
                dataKey="sarcTorque" 
                stroke="#22c55e" 
                name="Sarc_wt_5.0"
                strokeWidth={1}
                dot={false}
                connectNulls={false}
              />
            </LineChart>
          </ResponsiveContainer>
        )

      case 'angle-error':
        const combinedErrorData = Array.from({ length: maxLength }, (_, i) => ({
          time: i * 0.01,
          healthyError: healthyData[i]?.angleError || null,
          sarcError: sarcData[i]?.angleError || null,
          exoError: exoData[i]?.angleError || null
        }))

        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={combinedErrorData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="time" 
                label={{ value: 'Episode Time t (seconds)', position: 'insideBottom', offset: -20 }}
              />
              <YAxis 
                domain={[-errorRange, errorRange]}
                label={{ value: 'Joint Angle Error (rad)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                formatter={(value, name) => [
                  value !== null ? value.toFixed(3) : 'N/A',
                  name
                ]}
                labelFormatter={(value) => `Time: ${value}s`}
              />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
              {showGuides && (
                <>
                  <ReferenceLine y={errorRange} stroke="#ef4444" strokeDasharray="4 4" />
                  <ReferenceLine y={-errorRange} stroke="#ef4444" strokeDasharray="4 4" />
                </>
              )}
              <Line 
                type="monotone" 
                dataKey="exoError" 
                stroke="#3b82f6" 
                name="Exo_11.5_wt_5.0"
                strokeWidth={1}
                dot={false}
                connectNulls={false}
              />
              <Line 
                type="monotone" 
                dataKey="healthyError" 
                stroke="#f97316" 
                name="Healthy_wt_5.0"
                strokeWidth={1}
                dot={false}
                connectNulls={false}
              />
              <Line 
                type="monotone" 
                dataKey="sarcError" 
                stroke="#22c55e" 
                name="Sarc_wt_5.0"
                strokeWidth={1}
                dot={false}
                connectNulls={false}
              />
            </LineChart>
          </ResponsiveContainer>
        )

      case 'energy-comparison':
        let combinedEnergyData = Array.from({ length: maxLength }, (_, i) => ({
          time: i * 0.01,
          healthyMuscle: healthyData[i]?.muscleEnergy || null,
          sarcMuscle: sarcData[i]?.muscleEnergy || null,
          exoMuscle: exoData[i]?.muscleEnergy || null
        }))
        combinedEnergyData = smoothSeries(combinedEnergyData, 'healthyMuscle', emgWindow)
        combinedEnergyData = smoothSeries(combinedEnergyData, 'sarcMuscle', emgWindow)
        combinedEnergyData = smoothSeries(combinedEnergyData, 'exoMuscle', emgWindow)

        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={combinedEnergyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="time" 
                label={{ value: 'Episode Time t (seconds)', position: 'insideBottom', offset: -20 }}
              />
              <YAxis 
                label={{ value: 'Muscle Energy', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                formatter={(value, name) => [
                  value !== null ? value.toFixed(0) : 'N/A',
                  name
                ]}
                labelFormatter={(value) => `Time: ${value}s`}
              />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
              {showGuides && <ReferenceLine y={0} stroke="#9ca3af" strokeDasharray="3 3" />}
              <Line 
                type="monotone" 
                dataKey="exoMuscle" 
                stroke="#3b82f6" 
                name="Exo Muscle Energy"
                strokeWidth={1}
                dot={false}
                connectNulls={false}
              />
              <Line 
                type="monotone" 
                dataKey="healthyMuscle" 
                stroke="#f97316" 
                name="Healthy Muscle Energy"
                strokeWidth={1}
                dot={false}
                connectNulls={false}
              />
              <Line 
                type="monotone" 
                dataKey="sarcMuscle" 
                stroke="#22c55e" 
                name="Sarc Muscle Energy"
                strokeWidth={1}
                dot={false}
                connectNulls={false}
              />
            </LineChart>
          </ResponsiveContainer>
        )

      default:
        return null
    }
  }

  if (loading) {
    return (
      <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
        <div className="text-gray-500 dark:text-gray-400">Loading CSV data...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-2">Error loading data</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">{error}</div>
          <div className="text-xs text-gray-400 mt-2">
            Place your CSV file at: /public/data.csv
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Title */}
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
        Elbow Movement Tracking
      </h2>
      
      {/* Chart Type Selector */}
      <div className="mb-4 flex items-center gap-2 flex-nowrap">
        <button
          onClick={() => setChartType('torque-comparison')}
          className={`px-3 py-1.5 rounded-md text-sm ${
            chartType === 'torque-comparison'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
          }`}
        >
          Elbow Joint Torque
        </button>
        <button
          onClick={() => setChartType('angle-error')}
          className={`px-3 py-1.5 rounded-md text-sm ${
            chartType === 'angle-error'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
          }`}
        >
          Joint Angle Error
        </button>
        <button
          onClick={() => setChartType('energy-comparison')}
          className={`px-3 py-1.5 rounded-md text-sm ${
            chartType === 'energy-comparison'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
          }`}
        >
          Muscle Energy
        </button>
      </div>

      {/* Chart */}
      {renderChart()}

    </div>
  )
}

export default ElbowChart
