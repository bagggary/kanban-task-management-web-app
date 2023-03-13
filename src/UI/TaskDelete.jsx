import React from 'react'

export default function TaskDelete({task , data , setFormAppear , selectedBoard , setData}) {
  function deleteTask(){
    const columnsFilter = [...data[selectedBoard].columns];
    let colIndex ;
    columnsFilter.forEach((col , index) => {
      if(col.name === task.status) {
        colIndex = index;
      }
    }) ;
    const taskLocation  = [...columnsFilter[colIndex].tasks]
    const taskIndex = taskLocation.findIndex(tsk => tsk.title === task.title)
    taskLocation.splice(taskIndex , 1)
    columnsFilter[colIndex].tasks = taskLocation

    setData(prev => {
      let modifiedData = [...prev]
      modifiedData[selectedBoard] = {...modifiedData[selectedBoard] , columns : columnsFilter}
      return modifiedData
    })
    setFormAppear(prev => {
      return {
        ...prev ,
        overlay : false ,
        taskDelete : false ,
        subOption : false
      }
    })
  }

  function cancelDelete(){
    setFormAppear(prev => {
      return {
        ...prev ,
        overlay : false ,
        taskDelete : false ,
        subOption : false
      }
    })

  }


  return (
    <div className="overlay">
    <div className='delete board-dele'>
        <h1>Delete this task?</h1>
        <p>Are you sure you want to delete the <span>{task.title}</span> task and its subtasks? This action cannot be reversed.</p>
        <div className='delete-options'>
            <button onClick={deleteTask}>Delete</button>
            <button onClick={cancelDelete}>Cancel</button>
        </div>
    </div>
</div>
  )
}
