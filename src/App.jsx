import React ,  { useRef, useState} from 'react'
import Navbar from './UI/Navbar'
import './main.css'
import Sidenav from './UI/Sidenav'
import useToggle  from "./hooks/useToggle";
import boardData from './assets/data.json'
import Overlay from './UI/Overlay'
import BoardTasks from './UI/BoardTasks';
import TaksDetails from './UI/TaksDetails';

function App() {

  const [side , toggle , setSide ] = useToggle(true)
  const [data , setData ] = useState(boardData)
  const [selectedBoard , setSelectedBoard] = useState('')
  const [selectedId ,  setSelectedId] = useState(0)
  const [selectedTask, setSelectedTask] = useState(null);
  const [formAppear , setFormAppear] = useState({
    board : false ,
    editBoard : false ,
    overlay : false ,
    boardOptions : false,
    task : false ,
    sub : false,

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
    function taskDetailsHandler(task) {
      setFormAppear((prev) => {
        return {
          ...prev , 
          sub : true ,
          overlay : true
        }
      })
      setSelectedTask(task)
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
        {data[selectedId].columns.map((col , index) => {
          return (
            <BoardTasks selectedBoard = {selectedBoard}  board = {col}  key={index} id = {index} formAppear = {formAppear} setFormAppear = {setFormAppear} onTaskClick={taskDetailsHandler}/>
          )
        })}
      </div>
      </div>
      {formAppear.overlay && <Overlay />}
      { formAppear.sub &&  <TaksDetails task = {selectedTask} />}
    </>
  )
}

export default App
