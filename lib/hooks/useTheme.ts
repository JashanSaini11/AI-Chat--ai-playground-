
import { useState, useEffect } from 'react';
import { Theme, UseThemeReturn } from '@/types';

/**
 * Custom hook for managing theme (light/dark mode)
 */
export function useTheme(): UseThemeReturn {
  const [theme, setThemeState] = useState<Theme>('dark');

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;
    
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    // In production, add localStorage:
    // localStorage.setItem('theme', newTheme);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return {
    theme,
    setTheme,
    toggleTheme,
  };
}