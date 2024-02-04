import React, { useEffect, useState } from "react";
import TaksDetails from "./TasksDetails";
import TaskDelete from "../Modal/TaskModal/TaskDelete";
import EditTask from "../Modal/TaskModal/EditTask";

export default function Tasks({ subtasks, task, columnId }) {
  const [isMounted, setIsMounted] = useState(false);
  const [details, setDetails] = useState(false);
  const [edit, setEdit] = useState(false);
  const [taskDelete, setTaskDelete] = useState(false);
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
        onOpenEdit={() => setEdit(true)}
        onOpenDelete={() => setTaskDelete(true)}
        task={task}
        columnId={columnId}
      />
      <EditTask
        task={task}
        isOpen={edit}
        onClose={() => setEdit(false)}
        columnId={columnId}
      />
      <TaskDelete
        task={task}
        isOpen={taskDelete}
        onClose={() => setTaskDelete(false)}
        columnId={columnId}
      />
    </div>
  );
}
