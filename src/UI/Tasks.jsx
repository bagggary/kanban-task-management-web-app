import React, { useEffect, useState } from 'react'

export default function Tasks({ task, subtask, id , formAppear , onTaskClick}) {
  
  const [isMounted, setIsMounted] = useState(false); 
 
  const completedTasks = () => {
      const completedSubtasks = subtask.filter((subtask) => subtask.isCompleted);
      return completedSubtasks.length;
    };

    useEffect(() => {
      setIsMounted(true); 
    }, []);

    return (
          <div className={`task-card ${isMounted ? 'scale-in' : ''}`} onClick={() => onTaskClick(task)}>
            <h3>{task.title}</h3>
            <p>{`${completedTasks()} of ${subtask.length} subtasks`}</p>
          </div>
    );
  }


