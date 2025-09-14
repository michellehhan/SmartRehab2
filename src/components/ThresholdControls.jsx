import React, { useState } from 'react'
import { 
  Settings, 
  RotateCcw, 
  Save,
  Activity,
  Zap,
  AlertTriangle,
  User
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

const ThresholdControls = () => {
  const [thresholds, setThresholds] = useState({
    gaitDeviation: [15],
    emgNoiseSensitivity: [25],
    movementSmoothness: [70],
    compensationLevel: [30],
    muscleActivation: [80],
    stabilityThreshold: [75]
  })

  const [autoCalibration, setAutoCalibration] = useState(true)
  const [alertsEnabled, setAlertsEnabled] = useState(true)
  const [realTimeMonitoring, setRealTimeMonitoring] = useState(true)

  const [populationNorms] = useState({
    gaitDeviation: 12,
    emgNoiseSensitivity: 20,
    movementSmoothness: 85,
    compensationLevel: 15,
    muscleActivation: 75,
    stabilityThreshold: 82
  })

  const handleThresholdChange = (key, value) => {
    setThresholds(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const resetToDefaults = () => {
    setThresholds({
      gaitDeviation: [15],
      emgNoiseSensitivity: [25],
      movementSmoothness: [70],
      compensationLevel: [30],
      muscleActivation: [80],
      stabilityThreshold: [75]
    })
  }

  const resetToPopulationNorms = () => {
    setThresholds({
      gaitDeviation: [populationNorms.gaitDeviation],
      emgNoiseSensitivity: [populationNorms.emgNoiseSensitivity],
      movementSmoothness: [populationNorms.movementSmoothness],
      compensationLevel: [populationNorms.compensationLevel],
      muscleActivation: [populationNorms.muscleActivation],
      stabilityThreshold: [populationNorms.stabilityThreshold]
    })
  }

  const getComparisonBadge = (userValue, normValue) => {
    const diff = Math.abs(userValue - normValue)
    const percentDiff = (diff / normValue) * 100

    if (percentDiff < 10) return { variant: 'default', text: 'Similar' }
    if (percentDiff < 25) return { variant: 'secondary', text: 'Moderate' }
    return { variant: 'destructive', text: 'Significant' }
  }

  const thresholdConfig = [
    {
      key: 'gaitDeviation',
      label: 'Gait Deviation Tolerance',
      description: 'Maximum acceptable deviation from normal gait pattern',
      icon: <Activity className="h-4 w-4" />,
      unit: '%',
      min: 5,
      max: 50,
      step: 1
    },
    {
      key: 'emgNoiseSensitivity',
      label: 'EMG Noise Sensitivity',
      description: 'Threshold for detecting signal noise in EMG readings',
      icon: <Zap className="h-4 w-4" />,
      unit: '%',
      min: 10,
      max: 50,
      step: 1
    },
    {
      key: 'movementSmoothness',
      label: 'Movement Smoothness',
      description: 'Minimum acceptable movement smoothness score',
      icon: <TrendingUp className="h-4 w-4" />,
      unit: '%',
      min: 50,
      max: 95,
      step: 1
    },
    {
      key: 'compensationLevel',
      label: 'Compensation Level Alert',
      description: 'Maximum acceptable compensation before alert',
      icon: <AlertTriangle className="h-4 w-4" />,
      unit: '%',
      min: 10,
      max: 60,
      step: 1
    },
    {
      key: 'muscleActivation',
      label: 'Muscle Overactivation',
      description: 'Threshold for muscle overactivation warnings',
      icon: <Zap className="h-4 w-4" />,
      unit: '%',
      min: 60,
      max: 100,
      step: 1
    },
    {
      key: 'stabilityThreshold',
      label: 'Stability Threshold',
      description: 'Minimum stability score before concern',
      icon: <User className="h-4 w-4" />,
      unit: '%',
      min: 60,
      max: 95,
      step: 1
    }
  ]

  return (
    <div className="p-4 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <Settings className="h-5 w-5" />
        <h3 className="text-lg font-semibold">Adaptive Thresholds</h3>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4">
        {/* Global Settings */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Global Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Auto-Calibration</span>
              <Switch
                checked={autoCalibration}
                onCheckedChange={setAutoCalibration}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Real-time Alerts</span>
              <Switch
                checked={alertsEnabled}
                onCheckedChange={setAlertsEnabled}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Live Monitoring</span>
              <Switch
                checked={realTimeMonitoring}
                onCheckedChange={setRealTimeMonitoring}
              />
            </div>
          </CardContent>
        </Card>

        {/* Threshold Controls */}
        {thresholdConfig.map((config) => (
          <div key={config.key}>
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {config.icon}
                    <CardTitle className="text-sm">{config.label}</CardTitle>
                  </div>
                  <Badge {...getComparisonBadge(thresholds[config.key][0], populationNorms[config.key])}>
                    vs Population
                  </Badge>
                </div>
                <CardDescription className="text-xs">
                  {config.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Current</span>
                    <span className="text-sm font-medium">
                      {thresholds[config.key][0]}{config.unit}
                    </span>
                  </div>
                  <Slider
                    value={thresholds[config.key]}
                    onValueChange={(value) => handleThresholdChange(config.key, value)}
                    min={config.min}
                    max={config.max}
                    step={config.step}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{config.min}{config.unit}</span>
                    <span>{config.max}{config.unit}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted-foreground">Population norm:</span>
                  <span className="font-medium">
                    {populationNorms[config.key]}{config.unit}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}

      </div>

      <Separator className="my-4" />

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button variant="default" size="sm" className="w-full">
          <Save className="h-4 w-4 mr-2" />
          Save Settings
        </Button>
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm" onClick={resetToDefaults}>
            <RotateCcw className="h-4 w-4 mr-1" />
            Reset
          </Button>
          <Button variant="outline" size="sm" onClick={resetToPopulationNorms}>
            <User className="h-4 w-4 mr-1" />
            Use Norms
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ThresholdControls
