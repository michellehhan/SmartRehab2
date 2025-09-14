import React, { useState } from 'react'

function App() {
  const [darkMode, setDarkMode] = useState(false)

  const metrics = {
    gaitStability: 78,
    movementSmoothness: 85,
    compensationLevel: 23,
    overallHealth: 82
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header */}
      <header className="border-b bg-white dark:bg-gray-800 shadow-sm">
        <div className="flex h-16 items-center px-6">
          <div className="flex items-center space-x-3">
            <div className="h-6 w-6 bg-green-600 rounded"></div>
            <h1 className="text-xl font-bold">SmartRehab</h1>
          </div>

          <div className="ml-auto flex items-center space-x-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-sm"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </header>

      <div className="flex min-h-[calc(100vh-4rem)]">
        {/* Main Content */}
        <main className="flex-1 p-8">
          {/* Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Gait Stability</h3>
                <div className="h-4 w-4 bg-red-500 rounded"></div>
              </div>
              <div className="text-2xl font-bold">{metrics.gaitStability}%</div>
              <p className="text-xs text-gray-500">-1.2% from baseline</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Movement Smoothness</h3>
                <div className="h-4 w-4 bg-blue-500 rounded"></div>
              </div>
              <div className="text-2xl font-bold">{metrics.movementSmoothness}%</div>
              <p className="text-xs text-gray-500">+1.8% from baseline</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Compensation Level</h3>
                <div className="h-4 w-4 bg-yellow-500 rounded"></div>
              </div>
              <div className="text-2xl font-bold">{metrics.compensationLevel}%</div>
              <p className="text-xs text-gray-500">-0.8% from baseline</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Overall Health</h3>
                <div className="h-4 w-4 bg-green-500 rounded"></div>
              </div>
              <div className="text-2xl font-bold">{metrics.overallHealth}%</div>
              <p className="text-xs text-gray-500">+1.5% from baseline</p>
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Avatar Visualization */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Movement Visualization</h3>
              <div className="h-96 bg-gradient-to-b from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 rounded-lg flex items-center justify-center">
                {/* Simple stick figure */}
                <svg width="80" height="120" viewBox="0 0 80 120" className="text-green-600">
                  <circle cx="40" cy="20" r="12" fill="currentColor" />
                  <line x1="40" y1="32" x2="40" y2="75" stroke="currentColor" strokeWidth="4" />
                  <line x1="40" y1="45" x2="20" y2="60" stroke="currentColor" strokeWidth="3" />
                  <line x1="40" y1="45" x2="60" y2="60" stroke="currentColor" strokeWidth="3" />
                  <line x1="40" y1="75" x2="25" y2="105" stroke="currentColor" strokeWidth="3" />
                  <line x1="40" y1="75" x2="55" y2="105" stroke="currentColor" strokeWidth="3" />
                </svg>
              </div>
              
              <div className="mt-6 space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Gait Stability</span>
                    <span className="text-sm font-bold text-green-600">Good</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div className="bg-green-600 h-3 rounded-full" style={{width: `${metrics.gaitStability}%`}}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Movement Smoothness</span>
                    <span className="text-sm font-bold text-green-600">Good</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div className="bg-green-600 h-3 rounded-full" style={{width: `${metrics.movementSmoothness}%`}}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* EMG Chart Placeholder */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">EMG Signal Activity</h3>
              <div className="h-80 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-2">📊</div>
                  <p className="text-gray-600 dark:text-gray-400">EMG Chart</p>
                  <p className="text-sm text-gray-500">Interactive muscle activity data</p>
                </div>
              </div>
            </div>

            {/* Muscle Activity */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Muscle Activity Levels</h3>
              <div className="space-y-6">
                {[
                  { name: 'Quadriceps', value: 65, color: 'bg-blue-500' },
                  { name: 'Hamstrings', value: 45, color: 'bg-green-500' },
                  { name: 'Calves', value: 78, color: 'bg-yellow-500' },
                  { name: 'Glutes', value: 52, color: 'bg-purple-500' },
                  { name: 'Tibialis', value: 38, color: 'bg-red-500' }
                ].map((muscle) => (
                  <div key={muscle.name}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">{muscle.name}</span>
                      <span className="text-sm font-bold">{muscle.value}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                      <div 
                        className={`${muscle.color} h-4 rounded-full transition-all duration-300`}
                        style={{width: `${muscle.value}%`}}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="hidden xl:block w-72 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold mb-4">Threshold Controls</h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Gait Deviation Tolerance</label>
              <input 
                type="range" 
                min="5" 
                max="50" 
                defaultValue="15"
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>5%</span>
                <span>50%</span>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">EMG Noise Sensitivity</label>
              <input 
                type="range" 
                min="10" 
                max="50" 
                defaultValue="25"
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>10%</span>
                <span>50%</span>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Movement Smoothness</label>
              <input 
                type="range" 
                min="50" 
                max="95" 
                defaultValue="70"
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>50%</span>
                <span>95%</span>
              </div>
            </div>
          </div>
          
          <div className="mt-8 space-y-3">
            <button className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700">
              Save Settings
            </button>
            <div className="grid grid-cols-2 gap-2">
              <button className="py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700">
                Reset
              </button>
              <button className="py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700">
                Use Norms
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default App
