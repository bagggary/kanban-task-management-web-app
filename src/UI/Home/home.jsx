import React from "react";
import { useSideContext } from "../../context/SideToggle";
import { useDataContext } from "../../context/DataContext";
import { useIdContext } from "../../context/IdContext";
import Sidenav from "../Sidebar/Sidenav";
import BoardStatus from "../Status/BoardStatus";

function Home() {
  const { side, toggle } = useSideContext();
  const { data, setData } = useDataContext();
  const { id, setId } = useIdContext();
  const board = data.filter((boardData) => boardData.id === id)[0];
  return (
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
        <div className="new-column">
          <p>+ New Column</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
