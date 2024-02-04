import { CSS } from "@dnd-kit/utilities";
import { useDataContext } from "../../context/DataContext";
import { useIdContext } from "../../context/IdContext";
import Tasks from "./Tasks";
import { useSortable } from "@dnd-kit/sortable";

export function SortableTasks({ taskId }) {
  const { data } = useDataContext();
  const { id } = useIdContext();
  const board =
    data && data.filter((currentBoard) => currentBoard.id === id)[0];

  const column = board.columns.find((currentColumn) =>
    currentColumn.tasks.some((task) => task.id === taskId)
  );
  const task = column.tasks.filter(
    (currentTask) => currentTask.id === taskId
  )[0];

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: taskId,
    data: {
      type: "Task",
      task,
    },
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  if (isDragging) {
    return <div className="dragging-task" ref={setNodeRef} style={style}></div>;
  }

  return (
    <>
      <div style={style} ref={setNodeRef} {...listeners} {...attributes}>
        <Tasks
          task={task}
          columnId={column.id}
          subtasks={task.subtasks}
          key={taskId}
        />
      </div>
    </>
  );
}
