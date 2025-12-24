import React from 'react';
import { Moon, Sun } from 'lucide-react'; // We might need to install lucide-react

export default function Header({ totalTasks, completedTasks, darkMode, toggleDarkMode }) {
    const progress = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;

    return (
        <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
                <div>
                    <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight transition-colors">My Tasks</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm font-medium transition-colors">
                        {completedTasks} of {totalTasks} tasks completed
                    </p>
                </div>
                <button
                    onClick={toggleDarkMode}
                    className="p-2 rounded-full bg-white dark:bg-slate-800 shadow-sm border border-gray-100 dark:border-slate-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                >
                    {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
            </div>

            <div className="w-full h-3 bg-gray-100 dark:bg-slate-800 rounded-full mt-6 overflow-hidden">
                <div
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
}
