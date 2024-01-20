import React, { useState } from "react";
import Navbar from "./UI/Navbar";
import "./main.css";
import Sidenav from "./UI/Sidenav";
import useToggle from "./hooks/useToggle";
import boardData from "./assets/data.json";
import BoardTasks from "./UI/BoardTasks";
import TaksDetails from "./UI/TaksDetails";
import EditTask from "./UI/Forms/EditTask";
import TaskDelete from "./UI/TaskDelete";
import { useSideContext } from "./context/SideToggle";
import { useDataContext } from "./context/DataContext";
import { useIdContext } from "./context/IdContext";

function App() {
  const { side } = useSideContext();
  const { data, setData } = useDataContext();
  const { id, setId } = useIdContext();
  const [selectedBoard, setSelectedBoard] = useState("");
  const [selectedId, setSelectedId] = useState(0);
  const [selectedTask, setSelectedTask] = useState(null);
  const [formAppear, setFormAppear] = useState({
    board: false,
    editBoard: false,
    boardOptions: false,
    task: false,
    deleteBoard: false,
    sub: false,
    subOption: false,
    editTask: false,
    taskDelete: false,
    boardDelete: false,
  });

  const board = id && data.filter((boardData, _) => boardData.id === id)[0];

  function handleActive(id) {
    setSelectedId(id);
  }
  function taskDetailsHandler(task) {
    setFormAppear((prev) => {
      return {
        ...prev,
        sub: true,
      };
    });
    setSelectedTask(task);
  }

  function handleNewColumn() {
    setFormAppear((prev) => {
      return {
        ...prev,
        editBoard: true,
      };
    });
  }

  return (
    <>
      <Navbar
        handleBoard={(e) => handleActive(e.target.id)}
        selectBoard={selectedId}
        formAppear={formAppear}
        setFormAppear={setFormAppear}
        setSelectedBoard={setSelectedId}
      />
      {/* This is the main content where's all task and columns appear */}
      <div className="content">
        <Sidenav
          handleBoard={(e) => handleActive(e.target.id)}
          selectBoard={selectedId}
        />
        <div
          className={`main-content transition container ${
            side ? "" : "content-screen"
          }`}
        >
          {board.columns.map((col, index) => {
            return (
              <BoardTasks
                selectedBoard={selectedBoard}
                board={col}
                key={col.id}
                id={col.id}
                index={index}
                formAppear={formAppear}
                setFormAppear={setFormAppear}
                onTaskClick={taskDetailsHandler}
                boardSubtask={col.tasks}
              />
            );
          })}
          <div className="new-column" onClick={handleNewColumn}>
            <p>+ New Column</p>
          </div>
        </div>
      </div>

      {formAppear.sub && (
        <TaksDetails
          task={selectedTask}
          selectedBoard={selectedId}
          data={data}
          setData={setData}
          formAppear={formAppear}
          setFormAppear={setFormAppear}
        />
      )}
      {formAppear.editTask && (
        <EditTask
          formAppear={formAppear}
          data={data}
          setData={setData}
          setformAppear={setFormAppear}
          selectedBoard={selectedId}
          task={selectedTask}
        />
      )}
      {formAppear.taskDelete && (
        <TaskDelete
          setFormAppear={setFormAppear}
          formAppear={formAppear}
          task={selectedTask}
          data={data}
          setData={setData}
          selectedBoard={selectedId}
        />
      )}
    </>
  );
}

export default App;
