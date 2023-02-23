import React from 'react'

export default function TaksDetails() {
  return (
    <div className='detailed-info'>
        <div className='detailed-info-title'>
            <h1>title</h1>
            <svg width="5" height="20" xmlns="http://www.w3.org/2000/svg"><g fill="#828FA3" fill-rule="evenodd"><circle cx="2.308" cy="2.308" r="2.308"/><circle cx="2.308" cy="10" r="2.308"/><circle cx="2.308" cy="17.692" r="2.308"/></g></svg>
        </div>
        <p>description paragraph</p>
        <div className='detailed-info-subtasks'>
            <div className='detailed-info-subtasks-sub'>
                <label htmlFor="sub">subtask</label>
                <input type="checkbox" name="checkbox" id="sub" />
            </div>
        </div>
        <div className='detailed-info-status'>
            <h1> status</h1>
            <div className="detailed-info-status-dropdown">
                status dropdown selection menu
            </div>
        </div>
    </div>
  )
}
