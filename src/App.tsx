import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import HomePage from './pages/HomePage'
import ResultsPage from './pages/ResultsPage'
import SplashScreen from './pages/SplashScreen'
import BeforeAfterPage from './pages/BeforeAfterPage'

function App() {
  return (
    <Router>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/before-after" element={<BeforeAfterPage />} />
      </Routes>
    </Router>
  )
}

export default App 