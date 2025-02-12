import { createContext } from 'react';


interface ThemeContextType {
    theme: string;
    toggleTheme: () => void;
}

const defaultThemeContext: ThemeContextType = {
    theme: "dark",
    toggleTheme: () => { },

};

export const ThemeContext = createContext<ThemeContextType>(defaultThemeContext);
