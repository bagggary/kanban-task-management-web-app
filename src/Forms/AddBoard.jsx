import React from 'react'

export default function () {
  return (
    <div className="overlay">
         <div className='add-new board'>
        <h1>Add New Board</h1>
        <form>
            <div className='f-tit'>
                <label htmlFor="title">Title</label>
                <input type="text" id='title' placeholder='e.g. Take coffee break' />
            </div>
            <div className='f-sub'>
                <label htmlFor="sub">Columns</label>
                <div className='sub - 1'>
                    <input type="text" id='sub' placeholder='e.g. Col 1'/>
                    <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg"><g fill="#828FA3" fill-rule="evenodd"><path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z"/><path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z"/></g></svg>
                </div>
                <div className='sub - 2'>
                    <input type="text" id='sub' placeholder='e.g. Col 2'/>
                    <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg"><g fill="#828FA3" fill-rule="evenodd"><path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z"/><path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z"/></g></svg>
                </div>
                <button type='button'> + Add New Column</button>
            </div>

            <button type='button'>Create New Board</button>
        </form>
    </div>
    </div>
  )
}
