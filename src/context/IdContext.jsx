import { createContext, useContext, useState } from "react";
import { useDataContext } from "./DataContext";

export const IdContext = createContext(null);

export const useIdContext = () => {
  return useContext(IdContext);
};

export const IdProvider = ({ children }) => {
  const { data } = useDataContext();
  const defaultId = data.length > 0 ? data[0].id : null;

  const [id, setId] = useState(defaultId);

  return (
    <IdContext.Provider value={{ id, setId }}>{children}</IdContext.Provider>
  );
};
