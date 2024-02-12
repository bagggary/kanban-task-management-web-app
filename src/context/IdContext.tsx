import { createContext, useContext, useState, ReactNode } from "react";
import { useDataContext } from "./DataContext";

interface IdContext {
  id: string | null;
  setId: React.Dispatch<React.SetStateAction<string | null>>;
}

export const IdContext = createContext<IdContext>({
  id: null,
  setId: () => {},
});

export const useIdContext = () => {
  return useContext(IdContext);
};

export const IdProvider = ({ children }: { children: ReactNode }) => {
  const { data } = useDataContext();
  const defaultId = data.length > 0 ? data[0].id : null;

  const [id, setId] = useState<string | null>(defaultId);

  return (
    <IdContext.Provider value={{ id, setId }}>{children}</IdContext.Provider>
  );
};
