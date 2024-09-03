"use client"
import { createContext, ReactNode, useState, JSX, useContext, useEffect } from "react";

export interface ThemeContextType {
  theme: "light" | "dark";
  setDarkTheme: () => void;
  setLightTheme: () => void;
}

const defaultThemeContextValue: ThemeContextType = {
  theme: "light",
  setDarkTheme: () => { },
  setLightTheme: () => { },
};
const systemTheme = () => {
  const darkTheme = window.matchMedia("(prefers-color-scheme: dark")
  const theme = darkTheme.matches ? "dark" : "light"
  return theme
}
//NOTE: Create ThemeContext
const ThemeContext = createContext<ThemeContextType>(defaultThemeContextValue);

//NOTE: Create Theme Provider
const ThemeProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [theme, setTheme] = useState<"light" | "dark">(systemTheme());

  const setDarkTheme = () => setTheme("dark");
  const setLightTheme = () => setTheme("light");

  useEffect(() => {
    document.querySelector('html')?.classList.remove("dark", "light")
    document.querySelector('html')?.classList.add(theme)

  }, [theme])

  const value: ThemeContextType = {
    theme,
    setDarkTheme,
    setLightTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
export default ThemeProvider;

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used inside ThemeProvider");
  return context;
};

