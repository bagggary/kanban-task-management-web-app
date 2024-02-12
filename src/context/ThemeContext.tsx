import {
  createContext,
  useContext,
  useState,
  useLayoutEffect,
  ReactNode,
} from "react";

type ThemeToggle = {
  theme: string;
  toggleTheme: () => void;
};

const localData = localStorage.getItem("theme");
const defaultTheme = localData ? JSON.parse(localData) : "light";

const ThemeContext = createContext<ThemeToggle>({
  theme: defaultTheme,
  toggleTheme: () => {},
});

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState(defaultTheme);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", JSON.stringify(newTheme));
  };

  useLayoutEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export { ThemeProvider, useTheme };
