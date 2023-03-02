import React, { useEffect, useState , useRef } from 'react'
import useToggle from '../hooks/useToggle';
import EditTask from './Forms/EditTask';
import Overlay from './Overlay';
export default function TaksDetails({task , data , selectedBoard , setData , formAppear , setFormAppear}) {
  const [show , toggleShow ] = useToggle(false)
  const [currentStatus , setCurrentStatus] = useState(task.status || data[selectedBoard].columns[0].name )
  const optionsRef = useRef(null)
  const detailsRef = useRef(null)
  useEffect (() =>{
    function outsideClick(e){
      if(detailsRef.current && !detailsRef.current.contains(e.target)){
        setFormAppear((prev) => {
          return {
            ...prev ,
            sub : false ,
            overlay : false 
            
          }
        });
      }
    }
    document.addEventListener('mousedown' , outsideClick);
    return () => {
      document.removeEventListener('mousedown' , outsideClick)
    } ;
  } , [detailsRef])
  useEffect(() => {
      function outsideClick(event) {
        if (optionsRef.current && !optionsRef.current.contains(event.target) ) {
          setFormAppear(prev => {
              return {
                  ...prev,
                  subOption : false
              }
          });
        }
      }
      document.addEventListener('mousedown', outsideClick);
      return () => {
        document.removeEventListener('mousedown', outsideClick);
      };
    }, [optionsRef]);

  

  function updateStatus(targetStatus){
    const statusColumns = [...data[selectedBoard].columns];
    let colIndex;
    statusColumns.forEach((col, index) => {
      if (col.name === task.status) {
        colIndex = index;
      }
    });

    const statusTasks = [...statusColumns[colIndex].tasks];
    const statusIndex = statusTasks.findIndex((stat) => stat.title === task.title);
    const removedTask = statusTasks.splice(statusIndex, 1)[0];
    removedTask.status = targetStatus;
    const newStatusIndex = statusColumns.findIndex((col) => col.name === targetStatus);
    statusColumns[colIndex].tasks = statusTasks;
    statusColumns[newStatusIndex].tasks.push(removedTask);
    setData((prev) => {
      let newData = [...prev]
      newData[selectedBoard] = {...newData[selectedBoard] , columns : statusColumns}
      return newData
    })
    // setData({
    //   ...data,
    //   [selectedBoard]: {
    //     ...data[selectedBoard],
    //     columns: statusColumns,
    //   },
    //   // adding different approach to deliver to the main element that are consist to get it done by the end of what is called the updatedTask however there are different approach to trigger this
    // });
  }

  function handleSubtaskChange(index) {

    // const updatedSubtasks = [...task.subtasks];
    // updatedSubtasks[index].isCompleted = !updatedSubtasks[index].isCompleted;
    // const updatedTask = {...task, subtasks: updatedSubtasks};
    // const updatedTasks = data[selectedBoard].columns.flatMap((column) => column.tasks.map((t) => t.id === updatedTask.id ? updatedTask : t));
    // const updatedColumns = data[selectedBoard].columns.map((column) => ({...column, tasks: updatedTasks.filter((t) => t.status === column.name)}));
    // const updatedData = {...data, [selectedBoard]: {...data[selectedBoard], columns: updatedColumns}};
  const updatedTask = { ...task };
  updatedTask.subtasks[index].isCompleted = !updatedTask.subtasks[index].isCompleted;
  const taskIndex = data[selectedBoard].columns.findIndex((col) => col.name === task.status);
  const updatedColumns = [...data[selectedBoard].columns];
  const taskIndexInColumn = updatedColumns[taskIndex].tasks.findIndex((t) => t.title === task.title);
  updatedColumns[taskIndexInColumn].tasks[taskIndexInColumn] = updatedTask;
  // setData({ ...data, [selectedBoard]: { ...data[selectedBoard], columns: updatedColumns } });
  setData((prev) => {
    let newData = [...prev]
    newData[selectedBoard] = {...newData[selectedBoard] , columns : updatedColumns}
    return newData
  })
  }

  function handleTriggerSubOption(){
    setFormAppear((prev) => {
      return {
        ...prev , 
        subOption : !prev.subOption
      }
    })
  }

  function handleDeleteTask(){
    setFormAppear(prev => {
      return {
        ...prev ,
        subOption : false,
        sub: false , 
        taskDelete : true 
      }
    })
  }




  function statusHandler(e){
    if(currentStatus === e.target.textContent){
      return ;
    }
    updateStatus(e.target.textContent)
    setCurrentStatus(e.target.textContent);
    // let newData = updateStatus();
    // setData(newData);
  }

  function handleEditTask(){
    setFormAppear((prev) => {
      return {
        ...prev ,
        subOption : false,
        editTask : true,
        sub : false 
      }
    })
  }

    return (
      <div className='detailed-info' ref={detailsRef}>
        <div className='detailed-info-title' onClick={handleTriggerSubOption}>
          <h1>{task.title}</h1>
          <div className="detailed-info-title-icon" ref={optionsRef}>
          <svg
            width='5'
            height='20'
            xmlns='http://www.w3.org/2000/svg'
          >

            <g fill='#828FA3' fillRule='evenodd'>
              <circle cx='2.308' cy='2.308' r='2.308' />
              <circle cx='2.308' cy='10' r='2.308' />
              <circle cx='2.308' cy='17.692' r='2.308' />
            </g>
          </svg>
          <div className={`transition detailed-info-title-icon-selection ${formAppear.subOption ? 'show' : 'hide'}`}  >
                    <div onClick={handleEditTask}>Edit Task</div>
                    <div onClick={handleDeleteTask}>Delete Task</div>
                </div>
          </div>
        </div>
        <p>{task.description}</p>
        <div className='detailed-info-subtasks'>
          <h2>Subtask(2 of 3)</h2>
          <div className='detailed-info-subtasks-container'>
          {task && task.subtasks.map((subtask , i) => (
            <div className='detailed-info-subtasks-container-sub' key={i}>
              <input
              type='checkbox'
              name='checkbox'
              id= {`sub-${i}`}
              onChange = {() => handleSubtaskChange(i)}
              defaultChecked = {subtask.isCompleted}
            />
              <label htmlFor={`sub-${i}`}> {subtask.title}</label>
          </div>
        ))}
        </div>
      </div>
      <div className='detailed-info-status'>
        <h1>Current Status</h1>
        <div className='f-stat' onClick={toggleShow}>
                <div className='stat-title' >{currentStatus}</div>
                <span ><svg width="10" height="7" xmlns="http://www.w3.org/2000/svg" ><path stroke="#635FC7" strokeWidth="2" fill="none" d="m1 1 4 4 4-4"/></svg></span>
                <div className={`stat-dropdown ${show ? 'show' : ''} transition`} >
                    <ul>{data && data[selectedBoard].columns.map((stat , index) => {
                        return (
                            <li key={index} id = {index} onClick = {statusHandler} >{stat.name}</li>
                        )
                    })}
                    </ul>
                </div>
            </div>
      </div>
    </div>
  );
}










// export default function TaksDetails({task , subtask }) {

//   return (
//     <div className='detailed-info'>
//         <div className='detailed-info-title'>
//             <h1>{task}</h1>
//             <svg width="5" height="20" xmlns="http://www.w3.org/2000/svg"><g fill="#828FA3" fill-rule="evenodd"><circle cx="2.308" cy="2.308" r="2.308"/><circle cx="2.308" cy="10" r="2.308"/><circle cx="2.308" cy="17.692" r="2.308"/></g></svg>
//         </div>
//         <p>description paragraph</p>
//         <div className='detailed-info-subtasks'>
//             <div className='detailed-info-subtasks-sub'>
//                 <label htmlFor="sub">subtask</label>
//                 <input type="checkbox" name="checkbox" id="sub" />
//             </div>
//         </div>
//         <div className='detailed-info-status'>
//             <h1> status</h1>
//             <div className="detailed-info-status-dropdown">
//                 status dropdown selection menu
//             </div>
//         </div>
//     </div>
//   )

// }



// first draft of creating the status updated to update the status 

 // let statusColumns = [...data[selectedBoard].columns]
    // let colIndex ;
    //  statusColumns.map((col , index) =>{
    // if(col.name === task.status){
    //   colIndex = index
    //   console.log(statusColumns[colIndex])
    // } 
    // return ;
    // })
    // const statusTasks = [...statusColumns[colIndex].tasks]
    // const statusIndex =  statusTasks.findIndex((stat) => stat.title === task.title)
    // let  removedTask =  statusTasks.splice(statusIndex , 1)
    // // change the status of the removed task , then changed to the new column name differnetiate between different approach to deliver various compoent
    // console.log(removedTask)
    // let statusColumns = [...data[selectedBoard].columns];
    // let currentColumnIndex = statusColumns.findIndex(
    //   (col) => col.name === task.status
    // );
    // let currentTasks = [...statusColumns[currentColumnIndex].tasks];
    // let currentTaskIndex = currentTasks.findIndex(
    //   (t) => t.title === task.title
    // );
    // let newStatus = currentStatus;
    // let newColumnIndex = statusColumns.findIndex(
    //   (col) => col.name === newStatus
    // );
    // let newTasks = [...statusColumns[newColumnIndex].tasks];
    // currentTasks.splice(currentTaskIndex, 1);
    // newTasks.push(task);
    // statusColumns[currentColumnIndex].tasks = currentTasks;
    // statusColumns[newColumnIndex].tasks = newTasks;
    // let newData = { ...data };
    // newData[selectedBoard].columns = statusColumns;
    // return newData
