import React from 'react'

export default function TaskDelete() {
  return (
    <div className="overlay">
    <div className='delete board-dele'>
        <h1>Delete this task?</h1>
        <p>Are you sure you want to delete the ‘Build settings UI’ task and its subtasks? This action cannot be reversed.</p>
        <div className='delete-options'>
            <button>Delete</button>
            <button>Cancel</button>
        </div>
    </div>
</div>
  )
}
