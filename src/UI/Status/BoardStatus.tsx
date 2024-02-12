import React, { useEffect, useMemo, useRef, useState } from "react";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { SortableTasks } from "../Tasks/SortableTasks";
import { CSS } from "@dnd-kit/utilities";
import { Columns } from "../../types";

export default function BoardStatus({
  column,
  boardId,
}: {
  column: Columns;
  boardId: string;
}) {
  const continerRef = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState<number | null>(null);

  const tasksId = useMemo(() => {
    return column.tasks.map((task) => task.id);
  }, [column.tasks]);

  useEffect(() => {
    const handleResize = () => {
      if (
        continerRef.current &&
        continerRef.current.offsetHeight !== undefined
      ) {
        setHeight(continerRef.current?.offsetHeight);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [continerRef]);

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
      height: height ? height?.toString() : "auto",
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
            style={{ backgroundColor: "green" }}
          ></div>
          <h3> {`${column.name.toUpperCase()} (${column.tasks.length})`} </h3>
        </div>
        <SortableContext items={tasksId}>
          <div className="tasks-description" ref={continerRef}>
            {column.tasks.map((task) => {
              return <SortableTasks taskId={task.id} />;
            })}
          </div>
        </SortableContext>
      </div>
    </div>
  );
}
