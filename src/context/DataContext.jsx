import { createContext, useContext, useEffect, useReducer } from "react";
import Data from "../assets/data.json";

const DataContext = createContext(null);

export const useDataContext = () => {
  return useContext(DataContext);
};
const localData = localStorage.getItem("kanbanTasks");
let initialState;
try {
  initialState = {
    data: localData ? JSON.parse(localData) : Data,
  };
} catch (error) {
  console.error("Error parsing localData:", error);
  initialState = {
    data: Data, // Provide a default value in case of parsing error
  };
}

// const localData = localStorage.getItem("kanbanTasks");
// const initialState = {
//   data: localData ? JSON.parse(localData) : Data,
// };

const dataReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "SET_DATA":
      return {
        data: payload,
      };
    default:
      return state;
  }
};

export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  const setData = (data) => {
    dispatch({ type: "SET_DATA", payload: data });
  };

  useEffect(() => {
    try {
      const storedData = localStorage.getItem("kanbanTasks");
      if (storedData && JSON.stringify(state.data) !== storedData) {
        localStorage.setItem("kanbanTasks", JSON.stringify(state.data));
      }
    } catch (error) {
      console.error("Error setting data in localStorage:", error);
    }
  }, [state.data]);

  return (
    <DataContext.Provider value={{ ...state, setData }}>
      {children}
    </DataContext.Provider>
  );
};
