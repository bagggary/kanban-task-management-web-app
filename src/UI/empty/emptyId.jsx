import React, { useState } from "react";
import Sidenav from "../Sidebar/Sidenav";
import { useSideContext } from "../../context/SideToggle";
import AddBoard from "../Modal/BoardModal/AddBoard";

export default function EmptyId() {
  const [createBoard, setCreateBoard] = useState(false);
  const { side } = useSideContext();
  return (
    <div className="board-content">
      <Sidenav />
      <div
        className={`board-selection transition container ${
          side ? "" : "content-screen"
        }`}
      >
        <p>No current board selected , Select board or create new one </p>
        <div className="create-new-board" onClick={() => setCreateBoard(true)}>
          <span>
            <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
              <path
                fill="#FFF"
                d="M7.368 12V7.344H12V4.632H7.368V0H4.656v4.632H0v2.712h4.656V12z"
              />
            </svg>
          </span>{" "}
          Create New Board
        </div>
      </div>
      <AddBoard isOpen={createBoard} onClose={() => setCreateBoard(false)} />
    </div>
  );
}
