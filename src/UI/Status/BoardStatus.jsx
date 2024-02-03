import React, { useEffect, useRef, useState } from "react";
import Tasks from "../Tasks/Tasks";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { getRandomColor } from "../../util";
import { SortableTasks } from "../Tasks/SortableTasks";
import { CSS } from "@dnd-kit/utilities";

export default function BoardStatus({ column, boardId }) {
  const [bulletColor, _] = useState(getRandomColor(boardId));
  // const { id } = column;
  // const { setNodeRef } = useDroppable({ id });
  const continerRef = useRef(null);
  const [height, setHeight] = useState(null);

  // useEffect(() => {
  //   setHeight(continerRef.current.offsetHeight);
  // });

  useEffect(() => {
    const handleResize = () => {
      setHeight(continerRef.current.offsetHeight);
    };

    handleResize(); // Initial height calculation

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  if (isDragging) {
    const draggingStyles = {
      height: height,
    };
    const combinedStyles = { ...style, ...draggingStyles };
    return (
      <div
        className="dragging-element"
        style={combinedStyles}
        ref={setNodeRef}
      ></div>
    );
  }

  return (
    <div>
      <div className="board-column" ref={setNodeRef} style={style}>
        <div className="board-column-name" {...attributes} {...listeners}>
          <div
            className="board-column-name-bullet"
            style={{ backgroundColor: bulletColor }}
          ></div>
          <h3> {`${column.name.toUpperCase()} (${column.tasks.length})`} </h3>
        </div>
        <SortableContext
          id={column.id}
          items={column.tasks}
          strategy={verticalListSortingStrategy}
        >
          <div className="tasks-description" ref={continerRef}>
            {column.tasks.map(({ id }) => {
              return <SortableTasks key={id} taskId={id} />;
            })}
          </div>
        </SortableContext>
      </div>
    </div>
  );
}
