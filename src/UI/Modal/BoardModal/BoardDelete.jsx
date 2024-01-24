import React, { useEffect } from "react";

export default function BoardDelete({
  data,
  selectBoard,
  setData,
  setFormAppear,
  setSelectedBoard,
  isOpen,
  onClose,
}) {
  function modifyAppear() {
    setFormAppear((prev) => {
      return {
        ...prev,
        deleteBoard: false,
        overlay: false,
      };
    });
  }
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
    setData((prev) => {
      const modifiedBoard = [...prev];
      modifiedBoard.splice(selectBoard, 1);
      return modifiedBoard;
    });
    if (selectBoard == data.length - 1) {
      setSelectedBoard(data.length - 2);
    }

    onClose();
  }

  return (
    <div className={`overlay ${isOpen && "show"}`}>
      <div className="delete board-dele">
        <h1>Delete this board?</h1>
        <p>
          Are you sure you want to delete the '
          <span>{data[selectBoard].name}</span>' board? This action will remove
          all columns and tasks and cannot be reversed.
        </p>
        <div className="delete-options">
          <button onClick={deleteBoard}>Delete</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
