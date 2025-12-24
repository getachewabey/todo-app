import React from 'react';

const categories = [
    { id: 'All', label: 'All', color: 'bg-blue-600' },
    { id: 'Personal', label: 'Personal', color: 'bg-blue-500' },
    { id: 'Work', label: 'Work', color: 'bg-teal-500' },
    { id: 'Shopping', label: 'Shopping', color: 'bg-purple-500' },
    { id: 'Health', label: 'Health', color: 'bg-pink-500' },
];

export default function FilterTabs({ filter, setFilter }) {
    return (
        <div className="flex flex-wrap gap-3 mb-8">
            {categories.map((cat) => {
                const isActive = filter === cat.id;
                const activeClass = isActive
                    ? `${cat.color} text-white shadow-md transform scale-105`
                    : 'bg-white dark:bg-slate-800 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-700 border border-gray-100 dark:border-slate-700';

                return (
                    <button
                        key={cat.id}
                        onClick={() => setFilter(cat.id)}
                        className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ease-out ${activeClass}`}
                    >
                        {cat.id === 'All' ? 'All' : (
                            <span className="flex items-center gap-2">
                                <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-white' : cat.color.replace('bg-', 'text-current bg-')}`}></span>
                                {cat.label}
                            </span>
                        )}
                    </button>
                );
            })}
        </div>
    );
}
