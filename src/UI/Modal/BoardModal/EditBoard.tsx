import React, { useState, useEffect, ChangeEvent, useId } from "react";
import { createPortal } from "react-dom";
import { useDataContext } from "../../../context/DataContext";
import { generateId } from "../../../util";
import { Boards, Errors, ModalProps } from "../../../types";
import { useIdContext } from "../../../context/IdContext";

export default function EditBoard({ isOpen, onClose }: ModalProps) {
  const [formErrors, setFormErrors] = useState<Errors>({});
  const { data, setData } = useDataContext();
  const { id } = useIdContext();
  const [editBoard, setEditBoard] = useState<Boards | null>(null);
  const board = data && data.find((boardData: Boards) => boardData.id === id);

  useEffect(() => {
    if (board) {
      setEditBoard(board);
    } else {
      setEditBoard(null);
    }
  }, [id]);

  useEffect(() => {
    function outsideClick(event: MouseEvent) {
      const target = event.target as HTMLTextAreaElement;
      if (target.className === "overlay show") {
        onClose();
      }
    }
    document.addEventListener("click", outsideClick);
    return () => {
      document.removeEventListener("click", outsideClick);
    };
  }, [onClose]);

  function removeSub(id: number) {
    if (editBoard) {
      if (editBoard?.columns.length <= 2) {
        return;
      }
      const newColumnsData = [...editBoard?.columns];
      newColumnsData.splice(id, 1);
      setEditBoard((prev) => {
        if (prev) {
          const updatedBoard: Boards = {
            ...prev,
            columns: newColumnsData,
          };
          return updatedBoard;
        }
        return null;
      });
    }
  }
  function addCol() {
    const newBoardCol = { id: generateId(5, 5), name: "", tasks: [] };
    setEditBoard((prev) => {
      if (prev) {
        const updatedBoard: Boards = {
          ...prev,
          columns: [...prev.columns, newBoardCol],
        };
        return updatedBoard;
      }
      return null;
      // return {
      //   ...prev,
      //   columns: [...prev.columns, newBoardCol],
      // };
    });
  }
  const handleSumbit = () => {
    const errors = validate();
    if (Object.keys(errors).length === 0) {
      const updatedData: Boards[] = [...data];
      const currentBoardIndex = updatedData.findIndex(
        (currentBoard: Boards) => currentBoard.id === id
      );

      if (currentBoardIndex !== -1 && editBoard !== null) {
        updatedData[currentBoardIndex] = editBoard;
        if (setData) {
          setData(updatedData);
        }
        onClose();
      } else {
        console.error("Board not found or editBoard is null");
      }
    } else {
      setFormErrors(errors);
    }
  };

  const handleAddBoard = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    if (editBoard) {
      let columns = [...editBoard.columns];
      columns[index].name = e.target.value;
      setEditBoard((prev) => {
        if (prev) {
          const updatedBoard = {
            ...prev,
            columns,
          };

          return updatedBoard;
        }
        return null;
      });
    }
  };

  const validate = () => {
    const errors: Errors = {};
    if (!editBoard?.name) {
      errors.name = "can't be empty";
      errors.nameError = true;
    }
    editBoard?.columns.forEach((col, index) => {
      if (!col.name) {
        errors[`col-${index}`] = "Can't be empty";
        errors[`err-${index}`] = true;
      }
    });
    return errors;
  };

  function titleHandle(e: ChangeEvent<HTMLInputElement>) {
    setEditBoard((prev) => {
      if (prev) {
        const updatedEditBoard = {
          ...prev,
          name: e.target.value,
        };
        return updatedEditBoard;
      }
      return null;
      //   return {
      //     ...prev,
      //   name: e.target.value,
      // };
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
              defaultValue={editBoard?.name}
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
    document.querySelector("#modal-container") || document.body
  );
}
