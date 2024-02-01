import { useSortable } from "@dnd-kit/sortable";
import { useDataContext } from "../../context/DataContext";
import { useIdContext } from "../../context/IdContext";
import Tasks from "./Tasks";
import { CSS } from "@dnd-kit/utilities";

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

  return (
    <Tasks
      task={task}
      columnId={column.id}
      subtasks={task.subtasks}
      id={taskId}
    />
  );
}
