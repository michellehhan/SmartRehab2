import React, { useState } from 'react'
import ElbowChart from './components/ElbowChart'

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [trackingView, setTrackingView] = useState('torque')
  const [errorRange, setErrorRange] = useState(30)
  const [smoothing, setSmoothing] = useState(70)
  const [showGuides, setShowGuides] = useState(true)

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
            <img src="/logo2.png" alt="SmartRehab logo" className="h-12 w-13 rounded object-contain" />
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
              <button
                onClick={() => setCurrentPage('technology')}
                className={`px-4 py-2 rounded-md text-base font-medium ${
                  currentPage === 'technology'
                    ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Technology
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

          {/* Movement Visualization + Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold">Elbow Movement Simulation</h3>
              <div className="flex items-center gap-2 flex-nowrap">
                <button
                  onClick={() => setTrackingView('torque')}
                  className={`px-3 py-1.5 rounded-md text-sm ${
                    trackingView === 'torque'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  Exoskeleton 10.0
                </button>
                <button
                  onClick={() => setTrackingView('angle')}
                  className={`px-3 py-1.5 rounded-md text-sm ${
                    trackingView === 'angle'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  Exoskeleton 11.0
                </button>
                <button
                  onClick={() => setTrackingView('energy')}
                  className={`px-3 py-1.5 rounded-md text-sm ${
                    trackingView === 'energy'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  Exoskeleton 11.5
                </button>
              </div>
              <video
                key={trackingView}
                className="w-full h-80 rounded-md border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 object-cover"
                autoPlay
                loop
                muted
                playsInline
                src={{
                  torque: '/10.mp4',
                  angle: '/11.mp4',
                  energy: '/11.5.mp4'
                }[trackingView]}
              >
                Your browser does not support the video tag.
              </video>
              </div>
            </div>

            {/* Elbow Movement Tracking Chart */
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <ElbowChart 
                errorRange={errorRange}
                smoothing={smoothing}
                showGuides={showGuides}
              />
            </div>
}
          </div>

          {/* Exercise Recommendations and Session History */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">

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
                
                <div className="mt-1 p-4 border border-gray-200 dark:border-gray-600 rounded">
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
                      <span className="text-sm font-medium">Biceps Overactivation</span>
                    </div>
                    <span className="text-sm text-yellow-700 dark:text-yellow-300">Moderate</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                      <span className="text-sm font-medium">Triceps Weakness</span>
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
          <h3 className="text-lg font-semibold mb-4">Signal & Threshold Controls</h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Angle Error Range (±units)</label>
              <input 
                type="range" 
                min="10" 
                max="100" 
                value={errorRange}
                onChange={(e) => setErrorRange(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>±10</span>
                <span>±{errorRange}</span>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Smoothing (torque & energy)</label>
              <input 
                type="range" 
                min="10" 
                max="50" 
                value={smoothing}
                onChange={(e) => setSmoothing(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>10%</span>
                <span>{smoothing}%</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <label className="text-sm font-medium">Show Guide Lines</label>
              <input
                type="checkbox"
                checked={showGuides}
                onChange={(e) => setShowGuides(e.target.checked)}
                className="h-4 w-4"
              />
            </div>
          </div>
          
          <div className="mt-8 space-y-3">
            <button className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
              onClick={() => {
                // placeholder: could persist settings
              }}
            >
              Save Settings
            </button>
            <div className="grid grid-cols-2 gap-2">
              <button 
                className="py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
                onClick={() => {
                  setErrorRange(30)
                  setSmoothing(70)
                  setShowGuides(true)
                }}
              >
                Reset
              </button>
              <button 
                className="py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
                onClick={() => {
                  setErrorRange(40)
                  setSmoothing(80)
                  setShowGuides(true)
                }}
              >
                Use Norms
              </button>
            </div>
          </div>
        </aside>
        </div>
      ) : currentPage === 'impacts' ? (
        <ImpactsPage />
      ) : currentPage === 'technology' ? (
        <TechnologyPage />
      ) : null}

      {/* Global Footer */}
      <footer className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 text-center py-4 border-t border-gray-200 dark:border-gray-700 mt-4">
        Made with ♡ @ HackMIT • Inspired by Trexo (YC 14) • Powered by Windsurf <i className="fa-solid fa-water" aria-hidden="true"></i>
      </footer>
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
            Redefining Rehabilitation with AI-Powered Support
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            SmartRehab combines advanced biomechanics, AI-driven analysis, and continuous monitoring to transform how neuromuscular conditions are managed, which helps patients recover faster, clinicians make data-driven decisions, and healthcare systems reduce costs.
          </p>
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">85%</div>
            <div className="text-gray-600 dark:text-gray-300">Increase in precision and speed of detecting early motor impairments.</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">60%</div>
            <div className="text-gray-600 dark:text-gray-300">Reduction in overall rehabilitation duration through adaptive therapy.</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">92%</div>
            <div className="text-gray-600 dark:text-gray-300">Sustained patient engagement and confidence through 24/7 personalized feedback.</div>
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
                  <p className="text-gray-600 dark:text-gray-300">Spot early deviations in muscle activity and movement, preventing severe decline and enabling proactive care.</p>
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
                  <p className="text-gray-600 dark:text-gray-300">Adaptive, AI-guided plans that evolve with the patient’s progress and clinical needs.</p>
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
                  <p className="text-gray-600 dark:text-gray-300">Always-on insights that track subtle progressions, relapses, and improvements in real-world settings.</p>
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
                  <p className="text-sm text-gray-600 dark:text-gray-300">Track tremor frequency, gait stability, and fine motor control.</p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Stroke Recovery</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Support targeted neuro-muscular reactivation and measure therapy effectiveness.</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Muscular Dystrophy</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Monitor progression of weakness while guiding compensatory strategies.</p>
                </div>
                <div className="border-l-4 border-yellow-500 pl-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Spinal Cord Injuries</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Provide adaptive support for regaining function and independence.</p>
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
              <p className="text-gray-600 dark:text-gray-300">Wearable EMG sensors and motion capture collect rich, real-time muscle and joint data.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">AI Analysis</h3>
              <p className="text-gray-600 dark:text-gray-300">Reinforcement learning and predictive models analyze movement patterns against healthy baselines.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Actionable Insights</h3>
              <p className="text-gray-600 dark:text-gray-300">Deliver tailored therapy plans, adaptive device settings, and early warning alerts instantly.</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Driving Accessible, Scalable, and Personalized Rehabilitation
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            SmartRehab aims to shape a future where advanced rehabilitation is accessible to all. Click below to explore how we make this happen.
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="https://docs.google.com/presentation/d/e/2PACX-1vTDczIVmN10Df_3yLaa4BQAnkpcenMpSPc7sUO7t6mkL8EZnuDWbrwMcfmIZwUzrpw1urPOWIa3SXpl/pub?start=false&loop=false&delayms=3000"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 font-medium inline-flex items-center justify-center"
            >
              Learn More
            </a>
            <a
              href="mailto:help@hackmit.org"
              className="border border-green-600 text-green-600 dark:text-green-400 px-6 py-3 rounded-lg hover:bg-green-50 dark:hover:bg-green-900 font-medium inline-flex items-center justify-center"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

// --- TechnologyPage Component ---
function TechnologyPage() {
  // Carousel state
  const [carouselIdx, setCarouselIdx] = React.useState(0)
  const carouselSlides = [
    {
      img: '/images/torque-graph.png',
      caption: 'Real-time Torque Feedback Graph'
    },
    {
      img: '/images/training-curve.png',
      caption: 'AI Training Progress Curves'
    },
    {
      img: '/images/patient-ui.png',
      caption: 'Patient Adaptive Interface'
    }
  ]

  // Helper for carousel
  const prevSlide = () => setCarouselIdx(idx => (idx === 0 ? carouselSlides.length - 1 : idx - 1))
  const nextSlide = () => setCarouselIdx(idx => (idx === carouselSlides.length - 1 ? 0 : idx + 1))

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center justify-center w-20 h-20 rounded-full bg-green-100 dark:bg-green-900 shadow mb-4">
            {/* Icon: Brain/Chip SVG or emoji */}
            <span className="text-4xl" role="img" aria-label="chip">🧠</span>
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            Cutting-Edge Technology &amp; Novel Developments
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
            SmartRehab leverages advanced AI, biomechanics, and physics-based simulation to deliver adaptive, real-time rehabilitation. Our platform fuses deep reinforcement learning with wearable sensors and exoskeleton control, offering scalable, personalized therapy for every patient.
          </p>
        </div>

        {/* Grid of Innovations */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">Key Innovations</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {/* Physics-Based Simulation */}
            <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center transition transform hover:-translate-y-1 hover:shadow-2xl cursor-pointer">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
                <img src="/physics.png" alt="Physics Simulation" className="w-8 h-8" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Physics-Based Simulation</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 text-center">Biomechanical modeling and real-time simulation enable safe, effective therapy in virtual and real worlds.</p>
            </div>
            {/* Deep Reinforcement Learning */}
            <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center transition transform hover:-translate-y-1 hover:shadow-2xl cursor-pointer">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
                <img src="/rl.png" alt="Deep RL" className="w-8 h-8" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Deep Reinforcement Learning</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 text-center">AI agents learn optimal therapy strategies, adapting to patient progress and maximizing outcomes.</p>
            </div>
            {/* Adaptive Exoskeleton Control */}
            <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center transition transform hover:-translate-y-1 hover:shadow-2xl cursor-pointer">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mb-4">
                <img src="/exosk.png" alt="Exoskeleton Control" className="w-8 h-8" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Adaptive Exoskeleton Control</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 text-center">Robust control algorithms deliver smooth, safe, and responsive assistance for every movement.</p>
            </div>
            {/* Real-Time EMG Sensing */}
            <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center transition transform hover:-translate-y-1 hover:shadow-2xl cursor-pointer">
              <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mb-4">
                <img src="/emg.png" alt="EMG Sensing" className="w-8 h-8" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Real-Time EMG Sensing</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 text-center">Wearable sensors capture muscle signals, providing instant feedback and precise tracking.</p>
            </div>
          </div>
        </div>

        {/* Side-by-side Panels: Traditional vs SmartRehab */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">Why SmartRehab is Different</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Traditional */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 flex flex-col relative">
              <div className="flex flex-col items-center gap-4 mb-6">
                <img src="/trexo.png" alt="Traditional System (e.g., Trexo Robotics)" className="w-64 h-64 object-contain rounded-2xl mx-auto" />
                <h3 className="font-semibold text-gray-900 dark:text-white text-2xl">Traditional Systems</h3>
              </div>
              <ul className="text-gray-600 dark:text-gray-300 text-base space-y-2 mb-4">
                <li>
                  ⚪ Static, pre-set routines (e.g., <a href="https://www.ycombinator.com/companies/trexo-robotics" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200">Trexo Robotics YC 14</a>)
                </li>
                <li>⚪ Manual device adjustments</li>
                <li>⚪ High operational costs</li>
                <li>⚪ Limited personalization</li>
              </ul>
              <span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm text-gray-700 dark:text-gray-200 self-start">Manual &amp; Rigid</span>
            </div>
            {/* SmartRehab */}
            <div className="bg-green-50 dark:bg-green-900/30 rounded-xl shadow-lg p-8 flex flex-col border-2 border-green-400 dark:border-green-700 relative">
              <div className="flex flex-col items-center gap-4 mb-6">
                <img src="/logo2.png" alt="SmartRehab System" className="w-56 h-56 object-contain" />
                <h3 className="font-semibold text-green-700 dark:text-green-300 text-2xl">SmartRehab</h3>
              </div>
              <ul className="text-green-800 dark:text-green-200 text-base space-y-2 mb-4">
                <li>🟢 Adaptive, AI-driven plans</li>
                <li>🟢 Automatic device control</li>
                <li>🟢 Scalable &amp; cost-effective</li>
                <li>🟢 Personalized, real-time feedback</li>
              </ul>
              <span className="px-3 py-1 bg-green-600 text-white rounded-full text-sm self-start">Intelligent &amp; Adaptive</span>
            </div>
          </div>
        </div>


      </div>
    </div>
  )
}
