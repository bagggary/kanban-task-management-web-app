import React, { useState } from 'react'
import TaksDetails from './TaksDetails';
import Tasks from './Tasks';

export default function BoardTasks({selectedBoard , board , formAppear , setFormAppear , onTaskClick}) {

  return (
    <>
    <div className='board-column'>
      <div className='board-column-name'>
        <div className='board-column-name-bullet'></div>
        <h3> {`${board.name.toUpperCase()} (3)`} </h3>
      </div>
        <div className='tasks-description'>
           {board.tasks.map((tsk , index) => {
             return (
             <Tasks task = {tsk} 
              subtask = {tsk.subtasks}
              id = {index} 
              formAppear = {formAppear}
              setFormAppear = {setFormAppear}
              onTaskClick = {onTaskClick}
              />
              )
             })}
        </div>
    </div>
    </>
  )
}
