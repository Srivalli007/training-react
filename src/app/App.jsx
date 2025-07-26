import { useState } from 'react'
import reactLogo from '../assets/react.svg'

import viteLogo from '/vite.svg'
import { Button } from "../components/ui/button";

function App() {
  const [count, setCount] = useState(0) // <- states

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-4xl mx-auto p-8 text-center">
        <div className="flex justify-center space-x-8 mb-8">
          <a href="https://vite.dev" target="_blank" className="hover:scale-110 transition-transform">
            <img src={viteLogo} className="h-24 w-24" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank" className="hover:scale-110 transition-transform">
            <img src={reactLogo} className="h-24 w-24 animate-spin-slow" alt="React logo" />
          </a>
        </div>
        
        <h1 className="text-5xl font-bold text-gray-800 mb-8">Vite + React + Tailwind</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <button 
            onClick={() => setCount((count) => count + 1)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors mb-4"
          >
            count is {count}
          </button>
          <p className="text-gray-600">
            Edit <code className="bg-gray-200 px-2 py-1 rounded text-sm">src/App.jsx</code> and save to test HMR
          </p>
        </div>
        
        <p className="text-gray-500">
          Click on the Vite and React logos to learn more
        </p>
        <div className="mt-6">
           <Button>Click Me</Button>
        </div>
      </div>
    </div>
  )
}

export default App
