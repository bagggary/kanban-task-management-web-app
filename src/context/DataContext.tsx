import { createContext, useContext, useEffect, useReducer } from "react";
import Data from "../assets/data.json";
import { Boards } from "../types";

export type DataAction = {
  type: string;
  payload: Boards[];
};
export type IDataContext = {
  data: Boards[];
  setData: (data: Boards[]) => void;
};

const localData = localStorage.getItem("kanbanTasks");
let initialState: { data: Boards[] };
try {
  initialState = {
    data: localData ? JSON.parse(localData) : Data,
  };
} catch (error) {
  console.error("Error parsing localData:", error);
  initialState = {
    data: Data,
  };
}

const DataContext = createContext<IDataContext>({
  data: initialState.data,
  setData: () => {},
});

export const useDataContext = () => {
  return useContext(DataContext);
};

const dataReducer = (
  state = initialState,
  action: DataAction
): { data: Boards[] } => {
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

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  const setData = (data: Boards[]): void => {
    dispatch({ type: "SET_DATA", payload: data });
  };

  useEffect(() => {
    try {
      const storedData = localStorage.getItem("kanbanTasks");
      if (!storedData) {
        localStorage.setItem("kanbanTasks", JSON.stringify(state.data));
      }
    } catch (error) {
      console.error("Error setting initial data in localStorage:", error);
    }
  }, []);

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
