import React from 'react';

export default function Layout({ children }) {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-10 px-4 font-sans text-slate-800 dark:text-slate-100 flex justify-center transition-colors duration-300">
            <div className="w-full max-w-3xl">
                {children}
            </div>
        </div>
    );
}
