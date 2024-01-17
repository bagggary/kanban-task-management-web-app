import { createContext, useContext } from "react";
import useToggle from "../hooks/useToggle";

export const SideContext = createContext(null);

export const useSideContext = () => {
  return useContext(SideContext);
};

export const SideProvider = ({ children }) => {
  const [side, toggle] = useToggle(false);

  return (
    <SideContext.Provider value={{ side, toggle }}>
      {children}
    </SideContext.Provider>
  );
};
