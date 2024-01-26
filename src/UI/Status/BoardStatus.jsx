import React, { useState } from "react";
import Tasks from "../Tasks/Tasks";
import { useDataContext } from "../../context/DataContext";
import { useIdContext } from "../../context/IdContext";

export default function BoardStatus({
  column,
  // formAppear,
  // setFormAppear,
  // onTaskClick,
  // boardSubtask,
  boardId,
}) {
  const [bulletColor, _] = useState(getRandomColor(boardId));
  const { id } = useIdContext();
  const { data } = useDataContext();

  // const board = data && data.filter((dataBoard) => dataBoard.id === id)[0];

  // const boardSub = data && data.filter((dataBoard) => dataBoard.id === id);

  function getRandomColor(index) {
    const colors = [
      "rgb(73, 196, 229)",
      "rgb(132, 113, 242)",
      "rgb(103, 226, 174)",
    ];
    if (index < colors.length) {
      return colors[index];
    } else {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }
  }

  return (
    <>
      <div className="board-column">
        <div className="board-column-name">
          <div
            className="board-column-name-bullet"
            style={{ backgroundColor: bulletColor }}
          ></div>
          <h3> {`${column.name.toUpperCase()} (${column.tasks.length})`} </h3>
        </div>
        <div className="tasks-description">
          {column.tasks.map((tsk, _) => {
            return (
              <Tasks
                task={tsk}
                columnId={column.id}
                subtasks={tsk.subtasks}
                id={tsk.id}
                key={tsk.id}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}