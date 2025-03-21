
import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check if theme is saved in localStorage
    const savedTheme = localStorage.getItem('theme');
    // Check if user prefers dark mode
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    return savedTheme === 'dark' || (!savedTheme && prefersDark);
  });

  useEffect(() => {
    // Apply theme when component mounts or theme changes
    applyTheme(isDarkMode);
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    applyTheme(!isDarkMode);
  };

  const applyTheme = (dark: boolean) => {
    if (dark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <div className="flex items-center gap-2 group">
      <Sun className="h-4 w-4 text-muted-foreground group-hover:text-amber-400 transition-colors duration-200" />
      <Switch
        checked={isDarkMode}
        onCheckedChange={toggleTheme}
        aria-label="Toggle dark mode"
        className="transition-transform duration-200 hover:scale-105"
      />
      <Moon className="h-4 w-4 text-muted-foreground group-hover:text-blue-400 transition-colors duration-200" />
    </div>
  );
};

export default ThemeToggle;
