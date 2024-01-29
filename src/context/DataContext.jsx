import { createContext, useContext, useReducer } from "react";
import Data from "../assets/data.json";

const DataContext = createContext(null);

export const useDataContext = () => {
  return useContext(DataContext);
};

const initialState = {
  data: Data,
};

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

  return (
    <DataContext.Provider value={{ ...state, setData }}>
      {children}
    </DataContext.Provider>
  );
};
