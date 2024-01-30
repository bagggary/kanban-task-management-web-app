import React, { useState } from "react";
import { useSideContext } from "../../context/SideToggle";
import { useDataContext } from "../../context/DataContext";
import { useIdContext } from "../../context/IdContext";
import Sidenav from "../Sidebar/Sidenav";
import BoardStatus from "../Status/BoardStatus";
import EditBoard from "../Modal/BoardModal/EditBoard";

function Home() {
  const { side } = useSideContext();
  const { data } = useDataContext();
  const { id } = useIdContext();
  const [editColumn, setEditColumn] = useState(false);
  const board = data.filter((boardData) => boardData.id === id)[0];
  return (
    <>
      <div className="content">
        <Sidenav handleBoard={(e) => handleActive(e.target.id)} />
        <div
          className={`main-content transition container ${
            side ? "" : "content-screen"
          }`}
        >
          {board.columns.map((col, _) => {
            return <BoardStatus key={col.id} boardId={col.id} column={col} />;
          })}
          {/* TODO : the new column div is set to handle editBoard */}
          <div className="new-column" onClick={() => setEditColumn(true)}>
            <p>+ New Column</p>
          </div>
        </div>
      </div>
      <EditBoard isOpen={editColumn} onClose={() => setEditColumn(false)} />
    </>
  );
}

export default Home;
