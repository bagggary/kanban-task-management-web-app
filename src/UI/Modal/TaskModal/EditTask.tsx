import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import { createPortal } from "react-dom";
import { useDataContext } from "../../../context/DataContext";
import { useIdContext } from "../../../context/IdContext";
import { generateId } from "../../../util";
import { TaskOptionsProps } from "./TaskDelete";
import { Errors } from "../../../types";
export default function EditTask({
  task,
  onClose,
  isOpen,
  columnId,
}: TaskOptionsProps) {
  const [editTask, setEditTask] = useState(task);
  const [formErrors, setFormErrors] = useState<Errors>({});
  const { data, setData } = useDataContext();
  const { id } = useIdContext();

  useEffect(() => {
    const clickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLTextAreaElement;
      if (target.className === "overlay show") {
        onClose();
      }
    };
    document.addEventListener("click", clickOutside);
    return () => {
      document.removeEventListener("click", clickOutside);
    };
  }, [onClose]);

  const handleChanges = () => {
    const errors = validate();
    const currentBoardIndex =
      data && data.findIndex((boardIndex) => boardIndex.id === id);
    const currentColumnIndex =
      data &&
      data[currentBoardIndex].columns.findIndex(
        (boardColumn) => boardColumn.id === columnId
      );
    const currentTaskIndex =
      data &&
      data[currentBoardIndex].columns[currentColumnIndex].tasks.findIndex(
        (currentTask) => currentTask.id === task?.id
      );

    if (Object.keys(errors).length === 0) {
      let updatedData = [...data];
      const currentColumns = [...data[currentBoardIndex].columns];
      const currentTasks = [...currentColumns[currentColumnIndex].tasks];
      currentTasks[currentTaskIndex] = editTask;
      currentColumns[currentColumnIndex] = {
        ...currentColumns[currentColumnIndex],
        tasks: currentTasks,
      };
      updatedData[currentBoardIndex] = {
        ...data[currentBoardIndex],
        columns: currentColumns,
      };
      setData(updatedData);
      onClose();
    } else {
      setFormErrors(errors);
    }
  };

  function titleHandle(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setEditTask((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  const handleAddTask = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const subtasks = [...editTask.subtasks];
    const target = e.target as HTMLInputElement;
    subtasks[index].title = target.value;
    setEditTask((prev) => {
      return {
        ...prev,
        subtasks,
      };
    });
  };

  function addSubTask() {
    const newSubTasks = { id: generateId(2, 4), title: "", isCompleted: false };
    setEditTask((prev) => {
      return {
        ...prev,
        subtasks: [...prev.subtasks, newSubTasks],
      };
    });
  }

  function removeSub(id: string) {
    if (editTask.subtasks.length <= 2) {
      return;
    }
    setEditTask((prev) => {
      const subtasksData = prev.subtasks.filter((subtask) => subtask.id !== id);
      return {
        ...prev,
        subtasks: subtasksData,
      };
    });
  }
  const validate = () => {
    const errors: Errors = {};
    if (!editTask.title) {
      errors.title = "Can't be empty";
      errors.titleError = true;
    }
    editTask.subtasks.forEach((tsk, index) => {
      if (!tsk.title) {
        errors[`sub-${index}`] = "Can't be empty";
        errors[`err-${index}`] = true;
      }
    });
    return errors;
  };

  return createPortal(
    <div className={`overlay ${isOpen && "show"}`}>
      <div className="add-new task">
        <h1>Edit Task</h1>
        <form>
          <div className={`f-tit ${formErrors.titleError && `error`}`}>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={task.title}
              onChange={(e) => titleHandle(e)}
            />
            <p>{formErrors.title && formErrors.title}</p>
          </div>
          <div className="f-des">
            <label htmlFor="des">Description</label>
            <textarea
              id="des"
              defaultValue={task.description}
              name="description"
              placeholder="e.g. It’s always good to take a break. This 15 minute break will 
recharge the batteries a little."
              onChange={(e) => titleHandle(e)}
            ></textarea>
          </div>
          <div className="f-sub">
            <label htmlFor="sub">Subtask</label>
            <div className="sub-styles task">
              {editTask &&
                editTask.subtasks.map((subtsk, index) => {
                  return (
                    <div
                      key={subtsk.id}
                      id={subtsk.id}
                      className={`sub-${index} ${
                        formErrors[`err-${index}`] && `error`
                      }`}
                    >
                      <input
                        type="text"
                        id="sub"
                        placeholder={`subtask - ${index + 1}`}
                        onChange={(e) => handleAddTask(e, index)}
                        value={subtsk.title}
                      />
                      <svg
                        onClick={() => removeSub(subtsk.id)}
                        width="15"
                        height="15"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g fill-rule="evenodd">
                          <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
                          <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
                        </g>
                      </svg>
                      <p>
                        {" "}
                        {formErrors[`sub-${index}`] &&
                          formErrors[`sub-${index}`]}
                      </p>
                    </div>
                  );
                })}
            </div>
            <button type="button" onClick={addSubTask}>
              {" "}
              + Add New Subtask
            </button>
          </div>
          <div className="status">
            <h1>Current Status</h1>
            <div className="f-stat">
              <div className="stat-title">{editTask.status}</div>
            </div>
          </div>
          <button type="button" onClick={handleChanges}>
            Save changes
          </button>
        </form>
      </div>
    </div>,
    document.querySelector("#modal-container") || document.body
  );
}
