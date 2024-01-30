import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useDataContext } from "../../../context/DataContext";
import { useIdContext } from "../../../context/IdContext";
import { generateId } from "../../../util";

export default function EditBoard({ isOpen, onClose }) {
  const [formErrors, setFormErrors] = useState({});
  const { data, setData } = useDataContext();
  const { id } = useIdContext();
  const [editBoard, setEditBoard] = useState(null);
  const board = data && data.filter((boardData) => boardData.id === id)[0];

  useEffect(() => {
    setEditBoard(board);
  }, [id]);

  useEffect(() => {
    function outsideClick(event) {
      if (event.target.className === "overlay show") {
        onClose();
      }
    }
    document.addEventListener("click", outsideClick);
    return () => {
      document.removeEventListener("click", outsideClick);
    };
  }, [onClose]);

  function removeSub(id) {
    if (editBoard.columns.length <= 2) {
      return;
    }
    const newColumnsData = [...editBoard.columns];
    newColumnsData.splice(id, 1);
    setEditBoard((prev) => {
      return {
        ...prev,
        columns: newColumnsData,
      };
    });
  }
  function addCol() {
    const newBoardCol = { id: generateId(5, 5), name: "", tasks: [] };
    setEditBoard((prev) => {
      return {
        ...prev,
        columns: [...prev.columns, newBoardCol],
      };
    });
  }
  const handleSumbit = (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length === 0) {
      let updatedData = [...data];
      const currentBoardIndex =
        data && data.findIndex((currentBoard) => currentBoard.id === id);
      updatedData[currentBoardIndex] = editBoard;
      setData(updatedData);
      onClose();
    } else {
      setFormErrors(errors);
    }
  };

  const handleAddBoard = (e, index) => {
    const columns = [...editBoard.columns];
    columns[index].name = e.target.value;
    setEditBoard((prev) => {
      return {
        ...prev,
        columns,
      };
    });
  };

  const validate = () => {
    const errors = {};
    if (!editBoard.name) {
      errors.name = "can't be empty";
      errors.nameError = true;
    }
    editBoard.columns.forEach((col, index) => {
      if (!col.name) {
        errors[`col-${index}`] = "Can't be empty";
        errors[`err-${index}`] = true;
      }
    });
    return errors;
  };
  function titleHandle(e) {
    setEditBoard((prev) => {
      return {
        ...prev,
        name: e.target.value,
      };
    });
  }

  return createPortal(
    <div className={`overlay ${isOpen && "show"}`}>
      <div className="add-new edit transition">
        <h1>Edit Board</h1>
        <form>
          <div className={`f-tit ${formErrors.name && `error`}`}>
            <label htmlFor="title">BoardName</label>
            <input
              type="text"
              name="name"
              id="title"
              placeholder="e.g. Take coffee break"
              value={editBoard && editBoard.name}
              onChange={titleHandle}
            />
            <p>{formErrors.name && formErrors.name}</p>
          </div>
          <div className="f-sub">
            <label>BoardColumns</label>
            <div className="sub-styles">
              {editBoard &&
                editBoard.columns.map((col, index) => {
                  return (
                    <div
                      key={col.id}
                      className={`sub-${index} ${
                        formErrors[`err-${index}`] && `error`
                      }`}
                      id={col.id}
                    >
                      <input
                        type="text"
                        placeholder={`e.g. Col-${index + 1} `}
                        value={col.name}
                        onChange={(e) => handleAddBoard(e, index)}
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
                        {formErrors[`col-${index}`] &&
                          formErrors[`col-${index}`]}
                      </p>
                    </div>
                  );
                })}
            </div>
            <button type="button" onClick={addCol}>
              {" "}
              + Add New Column
            </button>
          </div>
          <button type="button" onClick={handleSumbit}>
            Save Changes
          </button>
        </form>
      </div>
    </div>,
    document.querySelector("#modal-container")
  );
}
