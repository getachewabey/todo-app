import React from 'react';
import { Trash2, Check } from 'lucide-react';

const categoryStyles = {
    Personal: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-600 dark:text-blue-400', dot: 'bg-blue-500' },
    Work: { bg: 'bg-teal-100 dark:bg-teal-900/30', text: 'text-teal-600 dark:text-teal-400', dot: 'bg-teal-500' },
    Shopping: { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-600 dark:text-purple-400', dot: 'bg-purple-500' },
    Health: { bg: 'bg-pink-100 dark:bg-pink-900/30', text: 'text-pink-600 dark:text-pink-400', dot: 'bg-pink-500' },
};

export default function TaskItem({ task, onToggle, onDelete }) {
    const style = categoryStyles[task.category] || categoryStyles.Personal;

    return (
        <div className="group bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 flex items-center gap-4 mb-3 transition-all hover:shadow-md hover:border-gray-200 dark:hover:border-slate-600 animate-slide-in">
            <button
                onClick={() => onToggle(task.id)}
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${task.completed
                        ? 'bg-blue-500 border-blue-500 text-white scale-110'
                        : 'border-gray-300 dark:border-slate-500 text-transparent hover:border-blue-400'
                    }`}
            >
                <Check size={14} strokeWidth={3} />
            </button>

            <span className={`flex-1 text-base font-medium transition-colors duration-300 ${task.completed ? 'text-gray-400 dark:text-slate-500 line-through decoration-gray-300' : 'text-slate-800 dark:text-slate-100'
                }`}>
                {task.text}
            </span>

            <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${style.bg} ${style.text}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`}></span>
                {task.category}
            </span>

            <button
                onClick={() => onDelete(task.id)}
                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
            >
                <Trash2 size={18} />
            </button>
        </div>
    );
}
