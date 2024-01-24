import React from "react";
import { createPortal } from "react-dom";
import { useDataContext } from "../../../context/DataContext";
import { useIdContext } from "../../../context/IdContext";

export default function TaskDelete({ task, setFormAppear, selectedBoard }) {
  const { data, setData } = useDataContext();
  const { id, setId } = useIdContext();

  const board = data && data.filter((boardData) => boardData.id === id)[0];

  function deleteTask() {
    const columnsFilter = [...board.columns];
    let colIndex;
    columnsFilter.forEach((col, index) => {
      if (col.name === task.status) {
        colIndex = index;
      }
    });
    const taskLocation = [...columnsFilter[colIndex].tasks];
    const taskIndex = taskLocation.findIndex((tsk) => tsk.title === task.title);
    taskLocation.splice(taskIndex, 1);
    columnsFilter[colIndex].tasks = taskLocation;

    setData((prev) => {
      let modifiedData = [...prev];
      modifiedData[selectedBoard] = {
        ...modifiedData[selectedBoard],
        columns: columnsFilter,
      };
      return modifiedData;
    });
    setFormAppear((prev) => {
      return {
        ...prev,
        overlay: false,
        taskDelete: false,
        subOption: false,
      };
    });
  }

  function cancelDelete() {
    setFormAppear((prev) => {
      return {
        ...prev,
        overlay: false,
        taskDelete: false,
        subOption: false,
      };
    });
  }

  return createPortal(
    <div className="overlay">
      <div className="delete board-dele">
        <h1>Delete this task?</h1>
        <p>
          Are you sure you want to delete the <span>{task.title}</span> task and
          its subtasks? This action cannot be reversed.
        </p>
        <div className="delete-options">
          <button onClick={deleteTask}>Delete</button>
          <button onClick={cancelDelete}>Cancel</button>
        </div>
      </div>
    </div>,
    document.querySelector("#modal-container")
  );
}
