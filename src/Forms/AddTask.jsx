import React from 'react'

export default function AddTask() {
  return (
    <div className="overlay">
         <div className='add-new task'>
        <h1>Add New Task</h1>
        <form>
            <div className='f-tit'>
                <label htmlFor="title">Title</label>
                <input type="text" id='title' placeholder='e.g. Take coffee break' />
            </div>
            <div className='f-des'>
                <label htmlFor="des">Description</label>
                 <textarea id='des' placeholder='e.g. It’s always good to take a break. This 15 minute break will 
recharge the batteries a little.'></textarea>
            </div>
            <div className='f-sub'>
                <label htmlFor="sub">Subtask</label>
                <div className='sub - 1'>
                    <input type="text" id='sub' placeholder='e.g. Make coffee'/>
                    <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg"><g fill="#828FA3" fill-rule="evenodd"><path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z"/><path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z"/></g></svg>
                </div>
                <div className='sub - 2'>
                    <input type="text" id='sub' placeholder='e.g. Drink coffee & smile'/>
                    <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg"><g fill="#828FA3" fill-rule="evenodd"><path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z"/><path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z"/></g></svg>
                </div>
                <button type='button'> + Add New Subtask</button>
            </div>
            {/* this has to change to cover the status of each board created to do so .  */}
            <div className='f-stat'>
                <label htmlFor="stat">Status</label>
                <input type="text" placeholder='holding input box to dropdown menu to be created later' />
            </div>
            <button type='button'>Create Task</button>
        </form>
    </div>
    </div>
  )
}