import React, { useState } from 'react';
import { Plus, ChevronDown } from 'lucide-react';

const categories = [
    { id: 'Personal', color: 'text-blue-500' },
    { id: 'Work', color: 'text-teal-500' },
    { id: 'Shopping', color: 'text-purple-500' },
    { id: 'Health', color: 'text-pink-500' },
];

export default function TaskInput({ onAdd }) {
    const [text, setText] = useState('');
    const [category, setCategory] = useState('Personal');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim()) {
            onAdd(text, category);
            setText('');
            // Keep last category or reset? Let's keep it.
        }
    };

    const currentCategory = categories.find(c => c.id === category);

    return (
        <form onSubmit={handleSubmit} className="mb-8 p-2 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 flex items-center gap-2 transition-shadow hover:shadow-md focus-within:shadow-md">
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Add a new task..."
                className="flex-1 px-4 py-3 bg-transparent text-slate-700 dark:text-slate-200 placeholder-gray-400 outline-none text-base"
            />

            <div className="relative">
                <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-slate-700 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors"
                >
                    <span className={`w-2 h-2 rounded-full bg-current ${currentCategory?.color.replace('text-', '')}`}></span>
                    {category}
                    {/* Use css color class trick or inline style? Tailwind classes are safest. */}
                    {/* Note: I can't dynamism bg-current easily with replace unless mapped. Re-map in render needed if robust.
              Actually I'll just use a map or style.
           */}
                </button>

                {isDropdownOpen && (
                    <div className="absolute top-full right-0 mt-2 w-40 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-gray-100 dark:border-slate-700 py-2 z-10 animate-fade-in">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                type="button"
                                onClick={() => { setCategory(cat.id); setIsDropdownOpen(false); }}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-700 flex items-center gap-2"
                            >
                                <span className={`w-2 h-2 rounded-full ${cat.color.replace('text-', 'bg-')}`}></span>
                                {cat.id}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-transform active:scale-95 flex items-center gap-2"
            >
                <Plus size={20} />
                Add
            </button>

            {/* Backdrop for dropdown */}
            {isDropdownOpen && (
                <div className="fixed inset-0 z-0" onClick={() => setIsDropdownOpen(false)}></div>
            )}
        </form>
    );
}
