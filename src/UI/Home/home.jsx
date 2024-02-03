import React, { useMemo, useState } from "react";
import { useSideContext } from "../../context/SideToggle";
import { useDataContext } from "../../context/DataContext";
import { useIdContext } from "../../context/IdContext";
import Sidenav from "../Sidebar/Sidenav";
import BoardStatus from "../Status/BoardStatus";
import EditBoard from "../Modal/BoardModal/EditBoard";
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  closestCorners,
  rectIntersection,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { SortableTasks } from "../Tasks/SortableTasks";
import { createPortal } from "react-dom";

function Home() {
  const { side } = useSideContext();
  const { data, setData } = useDataContext();
  const { id } = useIdContext();
  const [editColumn, setEditColumn] = useState(false);
  const board = data.filter((boardData) => boardData.id === id)[0];
  const [activeId, setActiveId] = useState(null);
  const [activeColumn, setActiveColumn] = useState(null);
  const columnId = useMemo(
    () => board.columns.map((col) => col.id),
    [board.columns]
  );

  const defaultAnnouncements = {
    onDragStart(id) {
      return `Picked up draggable item ${id}.`;
    },
    onDragOver(id, overId) {
      if (overId) {
        return `Draggable item ${id} was moved over droppable area ${overId}.`;
      }

      return `Draggable item ${id} is no longer over a droppable area.`;
    },
    onDragEnd(id, overId) {
      if (overId) {
        return `Draggable item was dropped over droppable area ${overId}`;
      }

      return `Draggable item ${id} was dropped.`;
    },
    onDragCancel(id) {
      return `Dragging was cancelled. Draggable item ${id} was dropped.`;
    },
  };

  const sensors = useSensors(
    // useSensor(PointerSensor),
    // useSensor(KeyboardSensor, {
    //   coordinateGetter: sortableKeyboardCoordinates,
    // })
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  const handleDragStart = (e) => {
    // setActiveId(e.active.id);
    console.log("Drag Start ", e);
    if (e.active.data.current.type === "Column") {
      setActiveColumn(e.active.data.current.column);
    }
  };

  const handleDragOver = (e) => {
    console.log("handleDragOver", e);
  };

  const handleDragEnd = (e) => {
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
          // announcements={defaultAnnouncements}
          sensors={sensors}
          // collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          // onDragOver={handleDragOver}
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

{
  /* <DragOverlay>
            {activeId ? <SortableTasks taskId={activeId} /> : null}
          </DragOverlay> */
}
{
  /* <DragOverlay>
            {activeId ? (
              <div
                style={{
                  pointerEvents: "none",
                  position: "fixed",
                  zIndex: 100,
                  top: 0,
                  left: 0,
                }}
              >
                <SortableTasks taskId={activeId} />
              </div>
            ) : null}
          </DragOverlay> */
}
