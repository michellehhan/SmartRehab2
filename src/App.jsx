import React, { useState } from 'react'
import ElbowChart from './components/ElbowChart'

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [currentPage, setCurrentPage] = useState('dashboard')

  const metrics = {
    elbowFlexion: 78,
    elbowExtension: 85,
    compensationLevel: 23,
    overallHealth: 82,
    bicepsActivity: 72,
    tricepsActivity: 89,
    forearmStability: 76,
    jointMobility: 81
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
            <nav className="flex space-x-6 mr-8">
              <button
                onClick={() => setCurrentPage('dashboard')}
                className={`px-4 py-2 rounded-md text-base font-medium ${
                  currentPage === 'dashboard'
                    ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setCurrentPage('impacts')}
                className={`px-4 py-2 rounded-md text-base font-medium ${
                  currentPage === 'impacts'
                    ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Impact & Purpose
              </button>
            </nav>
            
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              {darkMode ? (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {currentPage === 'dashboard' ? (
        <div className="flex min-h-[calc(100vh-4rem)]">
          {/* Main Content */}
          <main className="flex-1 p-8">
          {/* Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Elbow Flexion</h3>
                <div className="h-4 w-4 bg-red-500 rounded"></div>
              </div>
              <div className="text-2xl font-bold">{metrics.elbowFlexion}%</div>
              <p className="text-xs text-gray-500">-1.2% from baseline</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Elbow Extension</h3>
                <div className="h-4 w-4 bg-blue-500 rounded"></div>
              </div>
              <div className="text-2xl font-bold">{metrics.elbowExtension}%</div>
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

          {/* Movement Visualization */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Elbow Movement Tracking</h3>
              <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
                <div className="text-center">
                  {/* Simplified arm representation focused on elbow */}
                  <div className="flex items-center justify-center">
                    {/* Upper arm */}
                    <div className="w-20 h-6 bg-blue-500 rounded-l-full"></div>
                    {/* Elbow joint - highlighted */}
                    <div className="w-8 h-8 bg-red-500 rounded-full border-4 border-yellow-400"></div>
                    {/* Forearm */}
                    <div className="w-20 h-6 bg-green-500 rounded-r-full"></div>
                  </div>
                  <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                    Elbow Joint Focus
                  </div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <div className="text-gray-600 dark:text-gray-400">Biceps Activity</div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{width: `${metrics.bicepsActivity}%`}}></div>
                  </div>
                </div>
                <div>
                  <div className="text-gray-600 dark:text-gray-400">Triceps Activity</div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{width: `${metrics.tricepsActivity}%`}}></div>
                  </div>
                </div>
                <div>
                  <div className="text-gray-600 dark:text-gray-400">Forearm Stability</div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{width: `${metrics.forearmStability}%`}}></div>
                  </div>
                </div>
                <div>
                  <div className="text-gray-600 dark:text-gray-400">Joint Mobility</div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full" style={{width: `${metrics.jointMobility}%`}}></div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Elbow Movement Tracking and Exercise Recommendations */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Elbow Movement Tracking */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <ElbowChart />
            </div>

            {/* Exercise Recommendations */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">AI Exercise Recommendations</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium text-gray-900 dark:text-white">Balance Training</h4>
                    <span className="text-sm bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-2 py-1 rounded">High Priority</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Single-leg stands, 3 sets of 30 seconds</p>
                  <div className="flex items-center mt-2">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{width: '65%'}}></div>
                    </div>
                    <span className="text-xs text-gray-500">65%</span>
                  </div>
                </div>
                
                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium text-gray-900 dark:text-white">Gait Training</h4>
                    <span className="text-sm bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded">Medium</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Heel-to-toe walking, 10 meters x 3</p>
                  <div className="flex items-center mt-2">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{width: '80%'}}></div>
                    </div>
                    <span className="text-xs text-gray-500">80%</span>
                  </div>
                </div>
                
                <div className="border-l-4 border-purple-500 pl-4 py-2">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium text-gray-900 dark:text-white">Strength Training</h4>
                    <span className="text-sm bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 px-2 py-1 rounded">Low</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Leg extensions, 2 sets of 12 reps</p>
                  <div className="flex items-center mt-2">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{width: '45%'}}></div>
                    </div>
                    <span className="text-xs text-gray-500">45%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Session History & Progress</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded">
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">Today's Session</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">45 min • Balance & Gait</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">92%</div>
                    <div className="text-xs text-gray-500">Completion</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded">
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">Yesterday</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">30 min • Strength Training</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-blue-600">87%</div>
                    <div className="text-xs text-gray-500">Completion</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded">
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">2 Days Ago</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">40 min • Full Assessment</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-purple-600">95%</div>
                    <div className="text-xs text-gray-500">Completion</div>
                  </div>
                </div>
                
                <div className="mt-4 p-4 border border-gray-200 dark:border-gray-600 rounded">
                  <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">Weekly Progress</div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-300">Sessions Completed</span>
                    <span className="font-medium">5/7</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-1">
                    <span className="text-gray-600 dark:text-gray-300">Average Score</span>
                    <span className="font-medium text-green-600">91%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Muscle Activity */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
            <h3 className="text-lg font-semibold mb-4">Elbow-Related Muscle Activity</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Biceps Brachii</div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div className="bg-blue-500 h-3 rounded-full" style={{width: '72%'}}></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">Moderate Activity</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Triceps Brachii</div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div className="bg-green-500 h-3 rounded-full" style={{width: '89%'}}></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">High Activity</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Brachialis</div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div className="bg-yellow-500 h-3 rounded-full" style={{width: '58%'}}></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">Moderate Activity</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Brachioradialis</div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div className="bg-orange-500 h-3 rounded-full" style={{width: '67%'}}></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">Elevated Activity</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Pronator Teres</div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div className="bg-purple-500 h-3 rounded-full" style={{width: '45%'}}></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">Normal Activity</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Supinator</div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div className="bg-indigo-500 h-3 rounded-full" style={{width: '52%'}}></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">Normal Activity</div>
              </div>
            </div>
          </div>

          {/* Risk Assessment & Alerts */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Risk Assessment & Early Warnings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Current Risk Factors</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                      <span className="text-sm font-medium">Gait Asymmetry</span>
                    </div>
                    <span className="text-sm text-yellow-700 dark:text-yellow-300">Moderate</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                      <span className="text-sm font-medium">Fall Risk</span>
                    </div>
                    <span className="text-sm text-red-700 dark:text-red-300">High</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                      <span className="text-sm font-medium">Muscle Fatigue</span>
                    </div>
                    <span className="text-sm text-green-700 dark:text-green-300">Low</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Predictive Analytics</h4>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded">
                    <div className="flex items-center mb-2">
                      <svg className="w-4 h-4 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm font-medium text-blue-900 dark:text-blue-100">Movement Trend</span>
                    </div>
                    <p className="text-sm text-blue-800 dark:text-blue-200">Stability improving by 2.3% weekly based on current therapy adherence</p>
                  </div>
                  
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded">
                    <div className="flex items-center mb-2">
                      <svg className="w-4 h-4 text-purple-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm font-medium text-purple-900 dark:text-purple-100">Therapy Optimization</span>
                    </div>
                    <p className="text-sm text-purple-800 dark:text-purple-200">AI suggests increasing balance training frequency to 4x/week</p>
                  </div>
                </div>
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
      ) : (
        <ImpactsPage />
      )}
    </div>
  )
}

function ImpactsPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Transforming Neuromuscular Health Through AI
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            SmartRehab leverages cutting-edge artificial intelligence to provide real-time monitoring, 
            early detection, and personalized rehabilitation for individuals with neuromuscular conditions.
          </p>
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">85%</div>
            <div className="text-gray-600 dark:text-gray-300">Improvement in early detection of movement disorders</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">60%</div>
            <div className="text-gray-600 dark:text-gray-300">Reduction in rehabilitation time with personalized therapy</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">92%</div>
            <div className="text-gray-600 dark:text-gray-300">Patient satisfaction with continuous monitoring</div>
          </div>
        </div>

        {/* Key Benefits */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Key Benefits</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Early Detection</h3>
                  <p className="text-gray-600 dark:text-gray-300">Identify movement abnormalities before they become severe, enabling proactive intervention.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Personalized Therapy</h3>
                  <p className="text-gray-600 dark:text-gray-300">AI-driven recommendations adapt to individual patient needs and progress.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Continuous Monitoring</h3>
                  <p className="text-gray-600 dark:text-gray-300">24/7 tracking provides comprehensive insights into patient progress and setbacks.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Target Conditions</h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Parkinson's Disease</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Monitor tremors, gait instability, and movement patterns</p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Stroke Recovery</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Track rehabilitation progress and muscle reactivation</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Muscular Dystrophy</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Assess muscle weakness progression and compensation patterns</p>
                </div>
                <div className="border-l-4 border-yellow-500 pl-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Spinal Cord Injuries</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Monitor recovery and adaptive movement strategies</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Technology Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Data Collection</h3>
              <p className="text-gray-600 dark:text-gray-300">EMG sensors and motion capture collect real-time movement data</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">AI Analysis</h3>
              <p className="text-gray-600 dark:text-gray-300">Machine learning algorithms analyze patterns and detect anomalies</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Actionable Insights</h3>
              <p className="text-gray-600 dark:text-gray-300">Personalized recommendations and alerts delivered in real-time</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Empowering Better Health Outcomes
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Join the future of neuromuscular health monitoring. SmartRehab is transforming lives through 
            intelligent, compassionate, and personalized care.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 font-medium">
              Learn More
            </button>
            <button className="border border-green-600 text-green-600 dark:text-green-400 px-6 py-3 rounded-lg hover:bg-green-50 dark:hover:bg-green-900 font-medium">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
