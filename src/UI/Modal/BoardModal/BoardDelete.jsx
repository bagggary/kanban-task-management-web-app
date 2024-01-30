import React, { useEffect } from "react";
import { useDataContext } from "../../../context/DataContext";
import { useIdContext } from "../../../context/IdContext";

export default function BoardDelete({ isOpen, onClose }) {
  const { data, setData } = useDataContext();
  const { id } = useIdContext();

  const currentBoardIndex =
    data && data.findIndex((currentBoard) => currentBoard.id === id);
  useEffect(() => {
    const clickOutside = (e) => {
      if (e.target.className === "overlay show") {
        onClose();
      }
      document.addEventListener("click", clickOutside);
    };
    return () => {
      document.removeEventListener("click", clickOutside);
    };
  }, []);

  function deleteBoard() {
    if (data.length - 1 <= 0) {
      return;
    }
    let updatedData = [...data];
    updatedData.splice(currentBoardIndex, 1);

    // TODO : Fixing the existing board selection disappear when deleteing the selected board
    // TODO : Figure out how to prevent errors when there's not selecting id ;

    setData(updatedData);
    if (currentBoardIndex == data.length - 1) {
      return;
    }
    onClose();
  }

  return (
    <div className={`overlay ${isOpen && "show"}`}>
      <div className="delete board-dele">
        <h1>Delete this board?</h1>
        <p>
          Are you sure you want to delete the '
          <span>{data[currentBoardIndex].name}</span>' board? This action will
          remove all columns and tasks and cannot be reversed.
        </p>
        <div className="delete-options">
          <button onClick={deleteBoard}>Delete</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
