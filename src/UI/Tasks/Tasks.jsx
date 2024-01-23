import React, { useEffect, useState } from "react";
import TaksDetails from "./TasksDetails";

export default function Tasks({ subtasks, task, columnId }) {
  const [isMounted, setIsMounted] = useState(false);
  const [details, setDetails] = useState(false);
  const completedTasks = () => {
    const completedSubtasks = subtasks.filter((subtask) => subtask.isCompleted);
    return completedSubtasks.length;
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div
      className={`task-card ${isMounted ? "scale-in" : ""}`}
      onClick={() => setDetails(true)}
    >
      <h3>{task.title}</h3>
      <p>{`${completedTasks()} of ${subtasks.length} subtasks`}</p>
      <TaksDetails
        isOpen={details}
        onClose={() => setDetails(false)}
        task={task}
        columnId={columnId}
      />
    </div>
  );
}
