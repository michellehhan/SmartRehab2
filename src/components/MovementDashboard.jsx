import React, { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  User, 
  Activity, 
  Zap
} from 'lucide-react'

const MovementDashboard = ({ metrics }) => {
  // Static EMG data for demonstration
  const [emgData] = useState([
    { time: '10:00', quadriceps: 45, hamstrings: 38, calves: 52, glutes: 42, tibialis: 28 },
    { time: '10:01', quadriceps: 52, hamstrings: 42, calves: 58, glutes: 48, tibialis: 32 },
    { time: '10:02', quadriceps: 48, hamstrings: 45, calves: 55, glutes: 45, tibialis: 30 },
    { time: '10:03', quadriceps: 55, hamstrings: 48, calves: 62, glutes: 52, tibialis: 35 },
    { time: '10:04', quadriceps: 50, hamstrings: 40, calves: 58, glutes: 46, tibialis: 28 },
    { time: '10:05', quadriceps: 58, hamstrings: 52, calves: 65, glutes: 55, tibialis: 38 },
    { time: '10:06', quadriceps: 46, hamstrings: 38, calves: 52, glutes: 42, tibialis: 25 },
    { time: '10:07', quadriceps: 62, hamstrings: 55, calves: 68, glutes: 58, tibialis: 42 },
    { time: '10:08', quadriceps: 48, hamstrings: 42, calves: 55, glutes: 45, tibialis: 30 },
    { time: '10:09', quadriceps: 52, hamstrings: 45, calves: 60, glutes: 48, tibialis: 35 }
  ])

  const [muscleActivity] = useState({
    quadriceps: 65,
    hamstrings: 45,
    calves: 78,
    glutes: 52,
    tibialis: 38
  })


  const getHealthColor = (value) => {
    if (value >= 80) return 'text-green-500'
    if (value >= 60) return 'text-yellow-500'
    return 'text-red-500'
  }

  const getHealthStatus = (value) => {
    if (value >= 80) return 'Healthy'
    if (value >= 60) return 'Caution'
    return 'Concerning'
  }


  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Avatar Visualization */}
      <Card className="lg:row-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Movement Visualization
          </CardTitle>
          <CardDescription>
            Body position and movement tracking
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative h-96 bg-gradient-to-b from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 rounded-lg overflow-hidden">
            {/* Grid background */}
            <div className="absolute inset-0 opacity-20">
              <svg width="100%" height="100%">
                <defs>
                  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            {/* Static Avatar */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <svg width="80" height="120" viewBox="0 0 80 120" className="text-primary">
                {/* Head */}
                <circle cx="40" cy="20" r="12" fill="currentColor" />
                {/* Body */}
                <line x1="40" y1="32" x2="40" y2="75" stroke="currentColor" strokeWidth="4" />
                {/* Arms */}
                <line x1="40" y1="45" x2="20" y2="60" stroke="currentColor" strokeWidth="3" />
                <line x1="40" y1="45" x2="60" y2="60" stroke="currentColor" strokeWidth="3" />
                {/* Legs */}
                <line x1="40" y1="75" x2="25" y2="105" stroke="currentColor" strokeWidth="3" />
                <line x1="40" y1="75" x2="55" y2="105" stroke="currentColor" strokeWidth="3" />
              </svg>
            </div>

            {/* Movement indicators */}
            <div className="absolute bottom-4 left-4 space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span>Stable</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span>Mild Deviation</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span>Concerning</span>
              </div>
            </div>
          </div>

          {/* Movement Metrics */}
          <div className="mt-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Gait Stability</span>
              <Badge variant={metrics.gaitStability > 80 ? "default" : "destructive"}>
                {getHealthStatus(metrics.gaitStability)}
              </Badge>
            </div>
            <Progress value={metrics.gaitStability} className="h-3" />
            
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Movement Smoothness</span>
              <Badge variant={metrics.movementSmoothness > 80 ? "default" : "destructive"}>
                {getHealthStatus(metrics.movementSmoothness)}
              </Badge>
            </div>
            <Progress value={metrics.movementSmoothness} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* EMG Signal Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            EMG Signal Activity
          </CardTitle>
          <CardDescription>
            Muscle electrical activity across muscle groups
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={emgData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="time" />
                <YAxis domain={[0, 100]} />
                <Tooltip formatter={(value, name) => [`${value.toFixed(1)}%`, name]} />
                <Line 
                  type="monotone" 
                  dataKey="quadriceps" 
                  stroke="#8884d8" 
                  strokeWidth={2}
                  dot={false}
                  name="Quadriceps"
                />
                <Line 
                  type="monotone" 
                  dataKey="hamstrings" 
                  stroke="#82ca9d" 
                  strokeWidth={2}
                  dot={false}
                  name="Hamstrings"
                />
                <Line 
                  type="monotone" 
                  dataKey="calves" 
                  stroke="#ffc658" 
                  strokeWidth={2}
                  dot={false}
                  name="Calves"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Muscle Activity Levels */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Muscle Activity Levels
          </CardTitle>
          <CardDescription>
            Current activation levels by muscle group
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {Object.entries(muscleActivity).map(([muscle, activity]) => (
              <div key={muscle} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium capitalize">{muscle}</span>
                  <span className={`text-sm font-bold ${getHealthColor(activity)}`}>
                    {activity.toFixed(0)}%
                  </span>
                </div>
                <div className="relative">
                  <Progress value={activity} className="h-4" />
                  <div 
                    className={`absolute top-0 left-0 h-4 rounded-full transition-all duration-300 ${
                      activity > 80 ? 'bg-red-500' : 
                      activity > 60 ? 'bg-yellow-500' : 
                      'bg-green-500'
                    }`}
                    style={{ width: `${activity}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default MovementDashboard
