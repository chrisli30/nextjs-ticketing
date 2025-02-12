import { useEffect, useState } from 'react';
const getInitialTheme = () => {
    if (typeof window !== 'undefined') {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme === 'light' || storedTheme === 'dark') {
            return storedTheme;
        }
    }
    return 'light';
};
export const useTheme = () => {
    const [theme, setTheme] = useState<string>(getInitialTheme);
    useEffect(() => {
        localStorage.setItem('theme', theme);
    }, [theme]);
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };


    return { theme, toggleTheme }
}
