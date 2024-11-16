import React from 'react';
import { Sun, Moon, Rocket } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-purple-100 dark:border-purple-900">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Rocket className="h-8 w-8 text-purple-600" />
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
            SetItGo
          </span>
        </div>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-purple-100 dark:hover:bg-purple-900 transition-colors"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5 text-purple-600" />
            ) : (
              <Moon className="h-5 w-5 text-purple-600" />
            )}
          </button>
          
          <a
            href="https://setitgo.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-full hover:shadow-lg hover:scale-105 transition-all"
          >
            Visit Website
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;