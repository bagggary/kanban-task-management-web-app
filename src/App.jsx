import { useState } from 'react'
import reactLogo from './assets/react.svg'
import Navbar from './Components/Navbar'
// import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='container'>
      <Navbar />
    </div>
  )
}

export default App
