import React ,  { useRef, useState} from 'react'
import Navbar from './UI/Navbar'
import './main.css'
import Sidenav from './UI/Sidenav'
import useToggle  from "./hooks/useToggle";
import boardData from './assets/data.json'
import AddTask from './UI/Forms/AddTask'
import AddBoard from './UI/Forms/AddBoard'
import BoardDelete from './UI/BoardDelete'
import TaskDelete from './UI/TaskDelete'
import Overlay from './UI/Overlay'

function App() {

  const [side , toggle , setSide ] = useToggle(true)
  const [data , setData ] = useState(boardData)
  const [selectedBoard , setSelectedBoard] = useState('')
  const [selectedId ,  setSelectedId] = useState(0)
  const [formAppear , setFormAppear] = useState({
    board : false ,
    editBoard : false ,
    overlay : false ,
    boardOptions : false,
    task : false ,
  })
  // const sharedRefs = useRef(null)
  // useEffect(() => {
  //   function outsideClick(event) {
  //     if (sharedRefs.current && !sharedRefs.current.contains(event.target)) {
  //       setFormAppear(prev => {
  //           return {
  //               ...prev,
  //               board: false,
  //               overlay: false
  //           }
  //       });
  //     }
  //   }
  //   document.addEventListener('mousedown', outsideClick);
  //   return () => {
  //     document.removeEventListener('mousedown', outsideClick);
  //   };
  // }, [sharedRefs]);

  // const updateBoard = (obj) => {
  //   setData(prev => {
  //     return [
  //       ...prev.boards ,
  //       obj 
  //     ]
  //   }, obj)
  // }

    function handleActive(id){
        setSelectedId(id)
    }

  return (
    <>
      <Navbar 
      openNav = {side}
      toggleNav = {toggle} 
      data = {data}
      handleBoard = {(e) => handleActive(e.target.id)}
      selectBoard = {selectedId}   
      formAppear = {formAppear}
      setFormAppear = {setFormAppear}
      setData = {setData}
           />
      <div className='content'>
      <Sidenav 
      handleBoard = {(e) => handleActive(e.target.id)}
      side = {side}
      toggle = {toggle}
      data = {data}
      selectBoard = {selectedId}
      formAppear = {formAppear}
      setFormAppear = {setFormAppear}
      setData = {setData}
       />
      <div className= {`main-content transition container ${side ? '' : 'content-screen'}`}  >
        <div>task management</div>
      </div>
      </div>
      {formAppear.overlay && <Overlay />}
    </>
  )
}

export default App
