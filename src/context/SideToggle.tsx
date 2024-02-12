import { ReactNode, createContext, useContext } from "react";
import useToggle from "../hooks/useToggle";

type SideType = {
  side: boolean;
  toggle: () => void;
};

export const SideContext = createContext<SideType>({
  side: true,
  toggle: () => {},
});

export const useSideContext = () => {
  return useContext(SideContext);
};

export const SideProvider = ({ children }: { children: ReactNode }) => {
  const [side, toggle] = useToggle(true);

  return (
    <SideContext.Provider value={{ side, toggle }}>
      {children}
    </SideContext.Provider>
  );
};
