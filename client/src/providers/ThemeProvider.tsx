import { FC, ReactNode } from "react";
import { ThemeProvider } from "../context/ThemeContext";

type ProviderProps = {
    children: ReactNode,
};

const Provider: FC<ProviderProps> = ({ children }) => {
  return (
    <ThemeProvider >
        { children }
    </ThemeProvider>
  )
}

export default Provider;
