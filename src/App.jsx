import { useState } from 'react'
import reactLogo from './assets/react.svg'
import Navbar from './UI/Navbar'
import './main.css'
import Sidenav from './UI/Sidenav'

function App() {

  return (
    <>
      <Navbar />
      <Sidenav/>
      <div>task management</div>
    </>
  )
}

export default App
