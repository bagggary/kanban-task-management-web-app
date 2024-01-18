import { createContext, useContext, useState } from "react";

export const IdContext = createContext(null);

export const useIdContext = () => {
  return useContext(IdContext);
};

export const IdProvider = ({ children }) => {
  const [id, setId] = useState("WEERW21411");

  return (
    <IdContext.Provider value={{ id, setId }}>{children}</IdContext.Provider>
  );
};
