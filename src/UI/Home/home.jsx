import React, { useEffect, useMemo, useState } from "react";
import { useSideContext } from "../../context/SideToggle";
import { useDataContext } from "../../context/DataContext";
import { useIdContext } from "../../context/IdContext";
import Sidenav from "../Sidebar/Sidenav";
import BoardStatus from "../Status/BoardStatus";
import EditBoard from "../Modal/BoardModal/EditBoard";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { SortableTasks } from "../Tasks/SortableTasks";
import { createPortal } from "react-dom";

function Home() {
  const { side } = useSideContext();
  const { data, setData } = useDataContext();
  const { id } = useIdContext();
  const [editColumn, setEditColumn] = useState(false);
  const board = data.filter((boardData) => boardData.id === id)[0];
  const [activeTask, setActiveTask] = useState(null);
  const [activeColumn, setActiveColumn] = useState(null);
  const [updateData, setUpdateData] = useState(data);

  const columnId = useMemo(
    () => board.columns.map((col) => col.id),
    [board.columns]
  );

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  const handleDragStart = (e) => {
    if (e.active.data.current.type === "Column") {
      setActiveColumn(e.active.data.current.column);
    }

    if (e.active.data.current.type === "Task") {
      setActiveTask(e.active.data.current.task);
    }
  };

  const handleDragOver = (e) => {
    const { active, over } = e;

    setUpdateData((prev) => {
      return moveTaskAndUpdateData(prev, active, over);
    });
  };

  useEffect(() => {
    if (updateData !== null) {
      setData(updateData);
    }
  }, [updateData]);

  const moveTaskAndUpdateData = (prevData, active, over) => {
    if (!over) return prevData;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return prevData;

    const isActiveATask = active.data.current.type === "Task";
    const isOverATask = over.data.current.type === "Task";

    if (!isActiveATask) return prevData;

    let updatedData = [...prevData];

    if (isActiveATask && isOverATask) {
      // if the active task is not in the same column
      if (active.data.current.task.status !== over.data.current.task.status) {
        const sourceColumn = board.columns.find((col) =>
          col.tasks.some((task) => task.id === activeId)
        );

        const destinationColumn = board.columns.find((col) =>
          col.tasks.some((task) => task.id === overId)
        );

        if (sourceColumn && destinationColumn) {
          const sourceColumnIndex = board.columns.indexOf(sourceColumn);
          const destinationColumnIndex =
            board.columns.indexOf(destinationColumn);

          const sourceTaskIndex = sourceColumn.tasks.findIndex(
            (task) => task.id === activeId
          );

          let updatedColumns = [...board.columns];
          let removedTask = updatedColumns[sourceColumnIndex].tasks.splice(
            sourceTaskIndex,
            1
          )[0];

          const overTaskIndex = destinationColumn.tasks.findIndex(
            (task) => task.id === overId
          );

          removedTask.status =
            destinationColumn.tasks.length > 0
              ? destinationColumn.tasks[overTaskIndex].status
              : destinationColumn.name;

          destinationColumn.tasks.splice(overTaskIndex, 0, removedTask);

          const updatedBoard = { ...board, columns: updatedColumns };

          const boardIndex = updatedData.findIndex(
            (currentBoard) => currentBoard.id === id
          );

          updatedData[boardIndex] = updatedBoard;
        }
      } else {
        // if task is in the same column
        const currentColumn = board.columns.find((col) =>
          col.tasks.some((task) => task.id === activeId)
        );

        const currentColumnIndex = board.columns.findIndex(
          (col) => col.id === currentColumn.id
        );

        const currentBoardIndex = updatedData.findIndex(
          (currentBoard) => currentBoard.id === id
        );

        const columns = [...board.columns];
        const tasks = columns[currentColumnIndex].tasks;

        const activeTaskIndex = tasks.findIndex(
          (activeTask) => activeTask.id === activeId
        );

        const overTaskIndex = tasks.findIndex(
          (overTask) => overTask.id === overId
        );

        // Remove the task from its original position
        const removedTask = tasks.splice(activeTaskIndex, 1)[0];

        // Add the task to the new position
        tasks.splice(overTaskIndex, 0, removedTask);

        updatedData[currentBoardIndex].columns[currentColumnIndex].tasks =
          tasks;
      }
    }

    const isOverAColumn = over.data.current.type === "Column";

    // if task is dragged to an empty column
    if (isActiveATask && isOverAColumn) {
      const sourceColumn = board.columns.find((col) =>
        col.tasks.some((task) => task.id === activeId)
      );

      const destinationColumn = board.columns.find((col) => col.id === overId);

      if (sourceColumn && destinationColumn) {
        const sourceColumnIndex = board.columns.indexOf(sourceColumn);
        const destinationColumnIndex = board.columns.indexOf(destinationColumn);

        const sourceTaskIndex = sourceColumn.tasks.findIndex(
          (task) => task.id === activeId
        );

        let updatedColumns = [...board.columns];

        let removedTask = updatedColumns[sourceColumnIndex].tasks.splice(
          sourceTaskIndex,
          1
        )[0];

        removedTask.status = board.columns[destinationColumnIndex].name;

        destinationColumn.tasks.push(removedTask);

        const updatedBoard = { ...board, columns: updatedColumns };

        const boardIndex = updatedData.findIndex(
          (currentBoard) => currentBoard.id === id
        );

        updatedData[boardIndex] = updatedBoard;
      }
    }

    return updatedData;
  };

  const handleDragEnd = (e) => {
    setActiveColumn(null);
    setActiveTask(null);
    const { active, over } = e;
    if (!over) return;
    const activeColumnId = active.id;
    const overColumnId = over.id;
    if (activeColumnId === overColumnId) return;

    const column = [...board.columns];
    const activeColumnIndex = column.findIndex(
      (col) => col.id === activeColumnId
    );
    const overColumnIndex = column.findIndex((col) => col.id === overColumnId);

    const currentBoardIndex = data.findIndex(
      (currentBoard) => currentBoard.id === id
    );

    let updatedData = [...data];
    updatedData[currentBoardIndex] = {
      ...updatedData[currentBoardIndex],
      columns: arrayMove(column, activeColumnIndex, overColumnIndex),
    };
    setData(updatedData);
  };

  return (
    <>
      <div className="content">
        <Sidenav handleBoard={(e) => handleActive(e.target.id)} />
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <div
            className={`main-content transition container ${
              side ? "" : "content-screen"
            }`}
          >
            <SortableContext items={columnId}>
              {board.columns.map((col, _) => (
                <BoardStatus key={col.id} boardId={col.id} column={col} />
              ))}
            </SortableContext>
            <div className="new-column" onClick={() => setEditColumn(true)}>
              <p>+ New Column</p>
            </div>
          </div>
          {createPortal(
            <DragOverlay>
              {activeColumn && (
                <BoardStatus column={activeColumn} boardId={activeColumn.id} />
              )}
              {activeTask && <SortableTasks taskId={activeTask.id} />}
            </DragOverlay>,
            document.body
          )}
        </DndContext>
      </div>
      <EditBoard isOpen={editColumn} onClose={() => setEditColumn(false)} />
    </>
  );
}

export default Home;
