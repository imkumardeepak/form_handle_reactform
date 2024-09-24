import { useEffect } from 'react'
import './App.css'

function App() {
  useEffect(() => {
    document.documentElement.classList.add('dark'); // Enable dark mode by default
  }, []);

  return (
    <>
      <div>
      <div className="bg-gray-900 text-white h-screen flex justify-center items-center">
      <h1 className="text-4xl">Hello, Dark Mode!</h1>
    </div>
    </div>
    </>
  )
}

export default App
