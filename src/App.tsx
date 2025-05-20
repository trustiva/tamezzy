import React, { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import Home from './pages/Home'
import Results from './pages/Results'

function App() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [showResults, setShowResults] = useState(false)

  const handleImageUpload = (imageUrl: string) => {
    setUploadedImage(imageUrl)
    setShowResults(true)
  }

  return (
    <div className="min-h-screen">
      <Toaster position="top-center" />
      <main className="container mx-auto px-4 py-8">
        {!showResults ? (
          <Home onImageUpload={handleImageUpload} />
        ) : (
          <Results imageUrl={uploadedImage!} onBack={() => setShowResults(false)} />
        )}
      </main>
    </div>
  )
}

export default App 