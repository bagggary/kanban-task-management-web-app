import React, { useEffect, useState, useRef } from "react";
import useToggle from "../../hooks/useToggle";
import EditTask from "../Modal/TaskModal/EditTask";
import TaskDelete from "../Modal/TaskModal/TaskDelete";
import { useDataContext } from "../../context/DataContext";
import { useIdContext } from "../../context/IdContext";
import { createPortal } from "react-dom";
export default function TaksDetails({ task, isOpen, onClose, columnId }) {
  const [show, toggleShow] = useToggle(false);
  const [editTask, setEditTask] = useState(false);
  const [subOption, setSubOption] = useState(false);
  const [deleteTask, setDeleteTask] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(task.status);
  const { data, setData } = useDataContext();
  const { id } = useIdContext();
  const optionsRef = useRef(null);

  const board = data && data.filter((boardData) => boardData.id === id)[0];
  const currentColumn =
    board &&
    board.columns.filter((boardColumn) => boardColumn.id === columnId)[0];

  useEffect(() => {
    function outsideClick(e) {
      if (e.target.className === "overlay show") {
        onClose();
      }
    }
    document.addEventListener("click", outsideClick);
    return () => {
      document.removeEventListener("click", outsideClick);
    };
  }, [onClose]);
  useEffect(() => {
    function outsideClick(event) {
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        setSubOption(false);
      }
    }
    document.addEventListener("click", outsideClick);
    return () => {
      document.removeEventListener("click", outsideClick);
    };
  }, [optionsRef]);

  function updateStatus(targetStatus) {
    const statusColumns = [...board.columns];
    let colIndex;
    statusColumns.forEach((col, index) => {
      if (col.name === task.status) {
        colIndex = index;
      }
    });

    const statusTasks = [...currentColumn.tasks];
    console.log(statusTasks);
    const statusIndex = statusTasks.findIndex(
      (stat) => stat.title === task.title
    );
    const removedTask = statusTasks.splice(statusIndex, 1)[0];
    removedTask.status = targetStatus;
    const newStatusIndex = statusColumns.findIndex(
      (col) => col.name === targetStatus
    );
    statusColumns[colIndex].tasks = statusTasks;
    statusColumns[newStatusIndex].tasks.push(removedTask);
    setData((prev) => {
      const currentColumnIndex =
        data && data.findIndex((boardIndex) => boardIndex.id === id);
      let newData = [...prev];
      newData[currentColumnIndex] = {
        ...newData[currentColumnIndex],
        columns: statusColumns,
      };
      return newData;
    });
  }

  function handleSubtaskChange(index) {
    const updatedTask = { ...task };
    updatedTask.subtasks[index].isCompleted =
      !updatedTask.subtasks[index].isCompleted;
    const taskIndex = board.columns.findIndex(
      (col) => col.name === task.status
    );
    const updatedColumns = [...currentColumn];
    const taskIndexInColumn = updatedColumns[taskIndex].tasks.findIndex(
      (t) => t.title === task.title
    );
    updatedColumns[taskIndexInColumn].tasks[taskIndexInColumn] = updatedTask;
    const currentColumnIndex =
      data && data.findIndex((boardIndex) => boardIndex.id === id);
    setData((prev) => {
      let newData = [...prev];
      newData[currentColumnIndex] = {
        ...newData[currentColumnIndex],
        columns: updatedColumns,
      };
      return newData;
    });
  }

  function statusHandler(e) {
    if (currentStatus === e.target.textContent) {
      return;
    }
    updateStatus(e.target.textContent);
    setCurrentStatus(e.target.textContent);
  }

  return createPortal(
    <div className={`overlay ${isOpen && "show"}`}>
      <div className="detailed-info">
        <div className="detailed-info-title" onClick={() => setSubOption(true)}>
          <h1>{task.title}</h1>
          <div className="detailed-info-title-icon" ref={optionsRef}>
            <svg width="5" height="20" xmlns="http://www.w3.org/2000/svg">
              <g fill="#828FA3" fillRule="evenodd">
                <circle cx="2.308" cy="2.308" r="2.308" />
                <circle cx="2.308" cy="10" r="2.308" />
                <circle cx="2.308" cy="17.692" r="2.308" />
              </g>
            </svg>
            <div
              className={`transition detailed-info-title-icon-selection ${
                subOption ? "show" : "hide"
              }`}
            >
              <div
                onClick={() => {
                  setEditTask(true);
                  onClose();
                }}
              >
                Edit Task
              </div>
              <div
                onClick={() => {
                  setDeleteTask(true);
                  onClose();
                }}
              >
                Delete Task
              </div>
            </div>
          </div>
        </div>
        <p>{task.description}</p>
        <div className="detailed-info-subtasks">
          <div className="detailed-info-subtasks-container">
            {task &&
              task.subtasks.map((subtask, i) => (
                <div className="detailed-info-subtasks-container-sub" key={i}>
                  <input
                    type="checkbox"
                    name="checkbox"
                    id={subtask.id}
                    onChange={() => handleSubtaskChange(i)}
                    defaultChecked={subtask.isCompleted}
                  />
                  <label htmlFor={`sub-${i}`}> {subtask.title}</label>
                </div>
              ))}
          </div>
        </div>
        <div className="detailed-info-status">
          <h1>Current Status</h1>
          <div className="f-stat" onClick={toggleShow}>
            <div className="stat-title">{currentStatus}</div>
            <span>
              <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
                <path
                  stroke="#635FC7"
                  strokeWidth="2"
                  fill="none"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </span>
            <div className={`stat-dropdown ${show ? "show" : ""} transition`}>
              <ul>
                {data &&
                  board.columns.map((stat, index) => {
                    return (
                      <li key={index} id={index} onClick={statusHandler}>
                        {stat.name}
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
        </div>
        <EditTask
          task={task}
          isOpen={editTask}
          onClose={() => setEditTask(false)}
        />
        <TaskDelete
          task={task}
          isOpen={deleteTask}
          onClose={() => setDeleteTask(false)}
        />
      </div>
    </div>,
    document.querySelector("#modal-container")
  );
}
