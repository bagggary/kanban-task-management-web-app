import React, {
  useState,
  useEffect,
  ChangeEvent,
  MouseEventHandler,
} from "react";
import useToggle from "../../../hooks/useToggle";
import { createPortal } from "react-dom";
import { generateId } from "../../../util";
import { useDataContext } from "../../../context/DataContext";
import { useIdContext } from "../../../context/IdContext";
import { Boards, Errors, ModalProps, Tasks } from "../../../types";

export default function AddTask({ isOpen, onClose }: ModalProps) {
  const [show, toggleShow] = useToggle(false);
  const [formErrors, setFormErrors] = useState<Errors>({});
  const { data, setData } = useDataContext();
  const { id } = useIdContext();
  const [taskObj, setTaskObj] = useState<Tasks>({
    id: generateId(5, 5),
    title: "",
    description: "",
    status: "",
    subtasks: [
      { id: "1323432432", title: "", isCompleted: false },
      { id: "2342342343", title: "", isCompleted: false },
    ],
  });

  const board = id && data.find((dataBoard) => dataBoard.id === id);

  useEffect(() => {
    if (!id || !board) {
      return;
    }

    setTaskObj((prev) => {
      return {
        ...prev,
        status: board.columns[0].name,
      };
    });
  }, [id]);

  const resetForm = () => {
    if (!board) {
      return;
    }
    setTaskObj({
      id: generateId(5, 5),
      title: "",
      description: "",
      status: board?.columns[0].name,
      subtasks: [
        { id: generateId(2, 4), title: "", isCompleted: false },
        { id: generateId(2, 4), title: "", isCompleted: false },
      ],
    });
  };

  useEffect(() => {
    function outsideClick(e: MouseEvent) {
      // ERROR : using the ref.current to close when outside dosen't work issue related to the event listener when assinging "click"
      //   if (taskRef.current && !taskRef.current.contains(e.target)) {
      //   }
      const target = e.target as HTMLTextAreaElement;
      if (target.className === "overlay show") {
        onClose();
        resetForm();
        setFormErrors({});
      }
      //   SOLUTION : this works just fine cause it relay on the classnName which is always outside the form modal
    }

    document.addEventListener("click", outsideClick);
    return () => {
      document.removeEventListener("click", outsideClick);
    };
  }, [onClose]);

  function descHandler(e: ChangeEvent<HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setTaskObj((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  function titleHandle(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setTaskObj((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  //function to handle add the value of each subtasks onChange on each input field
  const handleAddTask = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const subtasks = [...taskObj.subtasks];
    taskObj.subtasks[index].title = e.target.value;
    setTaskObj((prev) => {
      return {
        ...prev,
        subtasks,
      };
    });
  };
  // function to handle adding newSubTask
  function addSubTask() {
    const newSubTasks = { id: generateId(2, 4), title: "", isCompleted: false };
    setTaskObj((prev) => {
      return {
        ...prev,
        subtasks: [...prev.subtasks, newSubTasks],
      };
    });
  }
  // adding validation to each input field to ensure that all input fileds are filled and then added to the main data set
  const validate = () => {
    const errors: Errors = {};
    if (!taskObj.title) {
      errors.title = "Can't be empty";
      errors.titleError = true;
    }
    taskObj.subtasks.forEach((tsk, index) => {
      if (!tsk.title) {
        errors[`sub-${index}`] = "Can't be empty";
        errors[`err-${index}`] = true;
      }
    });
    return errors;
  };

  const handleStatusChange = (event: React.MouseEvent) => {
    const target = event.target as HTMLDivElement;
    const selectedStatus = target.textContent;
    setTaskObj((prev) => {
      return {
        ...prev,
        status: selectedStatus as string,
      };
    });
  };

  // handling submit function to set the main data to data object json
  const handleSumbit = () => {
    if (!board) return;
    const errors = validate();
    if (Object.keys(errors).length === 0) {
      let updatedData = [...data];
      const currentBoardIndex = data.findIndex(
        (currentboard) => currentboard.id === board.id
      );
      const currentColumnIndex = board?.columns.findIndex(
        (currentColumn) => currentColumn.name === taskObj.status
      );

      updatedData[currentBoardIndex].columns[currentColumnIndex].tasks.push(
        taskObj
      );
      setData(updatedData);
      onClose();
      resetForm();
    } else {
      setFormErrors(errors);
    }
  };
  //   TODO : solve the remove problem , removing only the last element
  //   SOLUTION : the issue related to the key of each item , it has to be an ID , Use a unique key for each element in the array. Something like id which react can see has been deleted.
  function removeSub(id: number) {
    if (taskObj.subtasks.length <= 2) {
      return;
    }
    const newSubtaskData = [...taskObj.subtasks];
    newSubtaskData.splice(id, 1);
    setTaskObj((prev) => {
      return {
        ...prev,
        subtasks: newSubtaskData,
      };
    });
  }
  return createPortal(
    <div className={`overlay ${isOpen && "show"}`}>
      <div className="add-new task">
        <h1>Add New Task</h1>
        <form>
          <div className={`f-tit ${formErrors.titleError && `error`}`}>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={taskObj.title}
              placeholder="e.g. Take coffee break"
              onChange={titleHandle}
            />
            <p>{formErrors.title && formErrors.title}</p>
          </div>
          <div className="f-des">
            <label htmlFor="des">Description</label>
            <textarea
              id="des"
              name="description"
              placeholder="e.g. It’s always good to take a break. This 15 minute break will 
                           recharge the batteries a little."
              onChange={(e) => descHandler(e)}
              value={taskObj.description}
            ></textarea>
          </div>
          <div className="f-sub">
            <label htmlFor="sub">Subtask</label>
            <div className="sub-styles task">
              {taskObj.subtasks &&
                taskObj.subtasks.map((subtsk, index) => {
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
                        placeholder={`Subtask ${index + 1}`}
                        onChange={(e) => handleAddTask(e, index)}
                        value={subtsk.title}
                      />
                      <svg
                        onClick={(e) => removeSub(index)}
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
          {/* this has to change to cover the status of each board created to do so .  */}
          <div className="f-stat" onClick={() => toggleShow()}>
            <div className="stat-title">{taskObj.status}</div>
            <span>
              <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
                <path
                  stroke="#635FC7"
                  stroke-width="2"
                  fill="none"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </span>
            <div className={`stat-dropdown ${show ? "show" : ""} transition`}>
              <ul>
                {board &&
                  board.columns.map((tsk, _) => {
                    return (
                      <li
                        key={tsk.id}
                        id={tsk.id}
                        onClick={(e) => handleStatusChange(e)}
                      >
                        {tsk.name}
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
          <button type="button" onClick={handleSumbit}>
            Create Task
          </button>
        </form>
      </div>
    </div>,
    document.querySelector("#modal-container") || document.body
  );
}
