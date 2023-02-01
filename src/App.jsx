import React ,  { useState } from 'react'
import reactLogo from './assets/react.svg'
import Navbar from './UI/Navbar'
import './main.css'
import Sidenav from './UI/Sidenav'
import useToggle  from "./hooks/useToggle";
import boardData from './assets/data.json'
import AddTask from './Forms/AddTask'

function App() {

  const [side , toggle , setSide ] = useToggle(true)
  const [data , setData ] = useState(boardData)
  const [selectedBoard , setSelectedBoard] = useState('')
  const [selectedId ,  setSelectedId] = useState(0)

    function handleActive(id){
        setSelectedId(id)
    }

  return (
    <>
      {/* <Navbar 
      openNav = {side}
      toggleNav = {toggle} 
      data = {data}
      handleBoard = {(e) => handleActive(e.target.id)}
      selectBoard = {selectedId}   
           />
      <div className='content'>
      <Sidenav 
      handleBoard = {(e) => handleActive(e.target.id)}
      side = {side}
      toggle = {toggle}
      data = {data}
      selectBoard = {selectedId}  
       />
      <div className= {`main-content transition container ${side ? '' : 'content-screen'}`}  >
        <div>task management</div>
      </div>
      </div> */}
      <AddTask />
    </>
  )
}

export default App
