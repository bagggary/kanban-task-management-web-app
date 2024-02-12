import React from "react";
import { createPortal } from "react-dom";
import { useDataContext } from "../../../context/DataContext";
import { useIdContext } from "../../../context/IdContext";
import { Tasks } from "../../../types";

export type TaskOptionsProps = {
  task: Tasks;
  isOpen: boolean;
  onClose: () => void;
  columnId: string;
};

export default function TaskDelete({
  task,
  isOpen,
  onClose,
  columnId,
}: TaskOptionsProps) {
  const { data, setData } = useDataContext();
  const { id } = useIdContext();

  const board = data && data.filter((boardData) => boardData.id === id)[0];

  function deleteTask() {
    const currentBoardIndex = data.findIndex(
      (currentBoard) => currentBoard.id === id
    );
    const currentColumnIndex =
      board &&
      board.columns.findIndex((currentColumn) => currentColumn.id === columnId);
    const currentTaskIndex = data[currentBoardIndex].columns[
      currentColumnIndex
    ].tasks.findIndex((currentTask) => currentTask.id === task?.id);
    const columnsFilter = [...board.columns];
    const taskLocation = [...columnsFilter[currentColumnIndex].tasks];
    taskLocation.splice(currentTaskIndex, 1);
    let updatedData = [...data];
    updatedData[currentBoardIndex].columns[currentColumnIndex].tasks =
      taskLocation;
    setData(updatedData);
    onClose();
  }

  function cancelDelete() {
    onClose();
  }

  return createPortal(
    <div className={`overlay ${isOpen && "show"}`}>
      <div className="delete board-dele">
        <h1>Delete this task?</h1>
        <p>
          Are you sure you want to delete the <span>{task?.title}</span> task
          and its subtasks? This action cannot be reversed.
        </p>
        <div className="delete-options">
          <button onClick={deleteTask}>Delete</button>
          <button onClick={cancelDelete}>Cancel</button>
        </div>
      </div>
    </div>,
    document.querySelector("#modal-container") || document.body
  );
}
