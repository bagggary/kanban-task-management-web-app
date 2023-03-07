import React ,  { useRef, useState} from 'react'
import Navbar from './UI/Navbar'
import './main.css'
import Sidenav from './UI/Sidenav'
import useToggle  from "./hooks/useToggle";
import boardData from './assets/data.json'
import Overlay from './UI/Overlay'
import BoardTasks from './UI/BoardTasks';
import TaksDetails from './UI/TaksDetails';
import EditTask from './UI/Forms/EditTask';
import TaskDelete from './UI/TaskDelete';

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
    deleteBoard : false ,
    sub : false,
    subOption: false ,
    editTask : false ,
    taskDelete : false ,
    boardDelete : false 
    })


    function  handleActive(id){
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
            <BoardTasks selectedBoard = {selectedBoard}  board = {col}  key={index} id = {index} formAppear = {formAppear} setFormAppear = {setFormAppear} onTaskClick={taskDetailsHandler} boardSubtask = {col.tasks}/>
          )
        })}
        <div className='new-column'> 
        
        <p>+ New Column</p>
          </div>
      </div>
      
      </div>
      {formAppear.overlay && <Overlay />}
      {formAppear.sub &&  <TaksDetails 
       task = {selectedTask} 
        selectedBoard = {selectedId}
        data = {data}
        setData = {setData}
        formAppear = {formAppear}
        setFormAppear = {setFormAppear}
        />
      }
       {formAppear.editTask && <EditTask 
       formAppear = {formAppear}
       data = {data}
       setData = {setData}
       setformAppear = {setFormAppear}
       selectedBoard = {selectedId}
       task = {selectedTask}
       />}
       {formAppear.taskDelete && <TaskDelete 
       setFormAppear = {setFormAppear}
       formAppear = {formAppear}
       task  = {selectedTask}
       data = {data}
       setData = {setData}
       selectedBoard ={selectedId}
/>}
    </>
  )
}

export default App


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
