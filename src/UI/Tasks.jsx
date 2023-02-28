import React, { useEffect, useState } from 'react'

// export default function Tasks({task , subtask , id , formAppear , setFormAppear} ) {

//     const completedTasks = () => {
//         const completedSubtasks = subtask.filter((subtask) => subtask.isCompleted);
//         return completedSubtasks.length;
//       };
//     function tasksDetails(id){
//         console.log(id)
//     }
//   return (
//     <>
//     <div className='task-card' >
//         <h3>{task.title}</h3>
//         <p>{`${completedTasks()} of ${subtask.length} subtasks`}</p>
//     </div>
//     {formAppear.sub && <TaksDetails/>}
//     </>
//   )

// }

export default function Tasks({ task, subtask, id , formAppear , onTaskClick}) {

    const completedTasks = () => {
      const completedSubtasks = subtask.filter((subtask) => subtask.isCompleted);
      return completedSubtasks.length;
    };


    return (
        <>
        <div className='task-card' onClick={() => onTaskClick(task)}>
          <h3>{task.title}</h3>
          <p>{`${completedTasks()} of ${subtask.length} subtasks`}</p>
        </div>
        </>
    );
  }


