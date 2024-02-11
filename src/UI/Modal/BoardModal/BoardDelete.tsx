import React, { useEffect } from "react";
import { useDataContext } from "../../../context/DataContext";
import { useIdContext } from "../../../context/IdContext";
import { ModalProps } from "../../../types";

export default function BoardDelete({ isOpen, onClose }: ModalProps) {
  const { data, setData } = useDataContext();
  const { id, setId } = useIdContext();

  const currentBoardIndex = id
    ? data && data.findIndex((currentBoard) => currentBoard.id === id)
    : 0;
  useEffect(() => {
    const clickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLTextAreaElement;
      if (target.className === "overlay show") {
        onClose();
      }
      document.addEventListener("click", clickOutside);
    };
    return () => {
      document.removeEventListener("click", clickOutside);
    };
  }, [onClose]);

  function deleteBoard() {
    let updatedData = [...data];
    updatedData.splice(currentBoardIndex, 1);

    // TODO : Fixing the existing board selection disappear when deleteing the selected board
    // TODO : Figure out how to prevent errors when there's not selecting id ; // DONE

    setData(updatedData);
    setId(null);

    console.log(data);
    onClose();
  }

  return (
    <div className={`overlay ${isOpen && "show"}`}>
      <div className="delete board-dele">
        <h1>Delete this board?</h1>
        <p>
          Are you sure you want to delete the '
          <span>{data && data[currentBoardIndex]?.name}</span>' board? This
          action will remove all columns and tasks and cannot be reversed.
        </p>
        <div className="delete-options">
          <button onClick={deleteBoard}>Delete</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
