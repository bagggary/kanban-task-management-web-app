import React from 'react'

export default function BoardDelete() {
  return (
    <div className="overlay">
        <div className='delete board-dele'>
            <h1>Delete this board?</h1>
            <p>Are you sure you want to delete the ‘Platform Launch’ board? This action will remove all columns and tasks and cannot be reversed.</p>
            <div className='delete-options'>
                <button>Delete</button>
                <button>Cancel</button>
            </div>
        </div>
    </div>
  )
}
