import React, { useState, useEffect, ChangeEvent } from "react";
import { createPortal } from "react-dom";
import { useDataContext } from "../../../context/DataContext";
import { generateId } from "../../../util";
import { Errors, ModalProps } from "../../../types";

export default function ({ isOpen, onClose }: ModalProps) {
  const { data, setData } = useDataContext();
  const [boardObj, setBoardObj] = useState({
    id: generateId(5, 5),
    name: "",
    columns: [
      { id: generateId(5, 5), name: "", tasks: [] },
      { id: generateId(5, 5), name: "", tasks: [] },
    ],
  });

  const [formErrors, setFormErrors] = useState<Errors>({});
  useEffect(() => {
    function outsideClick(e: MouseEvent) {
      const target = e.target as HTMLTextAreaElement;
      if (target.className === "overlay show") {
        onClose();
        resetForm();
        setFormErrors({});
      }
    }
    document.addEventListener("click", outsideClick);
    return () => {
      document.removeEventListener("click", outsideClick);
    };
  }, [onClose]);

  const resetForm = () => {
    setBoardObj({
      id: generateId(5, 5),
      name: "",
      columns: [
        { id: generateId(5, 5), name: "", tasks: [] },
        { id: generateId(5, 5), name: "", tasks: [] },
      ],
    });
  };

  function titleHandle(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setBoardObj((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  const handleAddBoard = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const columns = [...boardObj.columns];
    columns[index].name = e.target.value;
    setBoardObj((prev) => {
      return {
        ...prev,
        columns,
      };
    });
  };

  const handleSumbit = () => {
    const errors = validate();
    if (Object.keys(errors).length === 0) {
      setData([...data, boardObj]);
      onClose();
    } else {
      setFormErrors(errors);
    }
  };

  const validate = () => {
    const errors: Errors = {};
    if (!boardObj.name) {
      errors.name = "Can't be empty";
      errors.nameError = true;
    }
    boardObj.columns.forEach((col, index) => {
      if (!col.name) {
        errors[`col-${index}`] = "Can't be empty";
        errors[`err-${index}`] = true;
      }
    });
    return errors;
  };

  function removeCol(id: string) {
    if (boardObj.columns.length <= 2) {
      return;
    } else {
      const updatedFields = [...boardObj.columns];
      const columnIndex = updatedFields.findIndex(
        (currentColumn) => currentColumn.id === id
      );
      updatedFields.splice(columnIndex, 1);
      setBoardObj((prev) => {
        return {
          ...prev,
          columns: updatedFields,
        };
      });
    }
  }
  function addCol() {
    const newBoardCol = { id: generateId(5, 5), name: "", tasks: [] };
    setBoardObj((prev) => {
      return {
        ...prev,
        columns: [...prev.columns, newBoardCol],
      };
    });
  }
  return createPortal(
    <div className={`overlay ${isOpen && "show"}`}>
      <div className="add-new board transition">
        <h1>Add New Board</h1>
        <form>
          <div className={`f-tit ${formErrors.nameError && `error`}`}>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="name"
              id="title"
              placeholder="e.g. Take coffee break"
              onChange={titleHandle}
            />
            <p>{formErrors.name && formErrors.name}</p>
          </div>
          <div className="f-sub">
            <label>Columns</label>
            <div className="sub-styles">
              {boardObj.columns &&
                boardObj.columns.map((column, index) => {
                  return (
                    <div
                      key={column.id}
                      className={`sub-${index} ${
                        formErrors[`err-${index}`] && `error`
                      }`}
                      id={column.id}
                    >
                      <input
                        type="text"
                        id={column.id}
                        placeholder={`e.g. Col-${index + 1} `}
                        onChange={(e) => handleAddBoard(e, index)}
                      />
                      <svg
                        onClick={() => removeCol(column.id)}
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
            Create New Board
          </button>
        </form>
      </div>
    </div>,
    document.querySelector("#modal-container") || document.body
  );
}
