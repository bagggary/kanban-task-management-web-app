import React ,  { useState } from 'react'
import reactLogo from './assets/react.svg'
import Navbar from './UI/Navbar'
import './main.css'
import Sidenav from './UI/Sidenav'
import useToggle  from "./hooks/useToggle";
import boardData from './assets/data.json'

function App() {

  const [side , toggle , setSide ] = useToggle(true)
  const [data , setData ] = useState(boardData)
  const [selectedBoard , setSelectedBoard] = useState('')
  console.log(data)


  return (
    <>
      <Navbar openNav = {side} toggleNav = {toggle} />
      <div className='content'>
      <Sidenav side = {side} toggle = {toggle}/>
      <div className= {`main-content transition container ${side ? '' : 'content-screen'}`}  >
        <div>task management</div>
      </div>
      </div>
    </>
  )
}

export default App
