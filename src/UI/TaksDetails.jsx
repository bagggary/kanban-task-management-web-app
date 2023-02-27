import React from 'react'
export default function TaksDetails({task}) {
    return (
      <div className='detailed-info'>
        <div className='detailed-info-title'>
          <h1>{task.title}</h1>
          <svg
            width='5'
            height='20'
            xmlns='http://www.w3.org/2000/svg'
          >

            <g fill='#828FA3' fill-rule='evenodd'>
              <circle cx='2.308' cy='2.308' r='2.308' />
              <circle cx='2.308' cy='10' r='2.308' />
              <circle cx='2.308' cy='17.692' r='2.308' />
            </g>
          </svg>
        </div>
        <p>{task.description}</p>
        <div className='detailed-info-subtasks'>
          <h2>subtask(2 of 3)</h2>
          <div className='detailed-info-subtasks-container'>
          {task && task.subtasks.map((subtask , i) => (
            <div className='detailed-info-subtasks-container-sub' key={i}>
              <input
              type='checkbox'
              name='checkbox'
              id= {`sub-${i}`}
              defaultchecked = {subtask.isCompleted}
              // defaultChecked={subtask.isCompleted}
            />
              <label htmlFor={`sub-${i}`}> {subtask.title}</label>
          </div>
        ))}
        </div>
      </div>
      <div className='detailed-info-status'>
        <h1> status</h1>
        <div className='detailed-info-status-dropdown'>
          status dropdown selection menu
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
