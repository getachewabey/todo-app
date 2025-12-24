import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { Mail, Lock, Loader2 } from 'lucide-react';

export default function Auth() {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    const handleAuth = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);
        setError(null);

        try {
            if (isLogin) {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) throw error;
            } else {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                });
                if (error) throw error;
                setMessage('Check your email for the login link!');
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex items-center justify-center p-4 transition-colors duration-300">
            <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-700 p-8 animate-fade-in">
                <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2 text-center">
                    {isLogin ? 'Welcome Back' : 'Create Account'}
                </h1>
                <p className="text-gray-500 dark:text-gray-400 text-center mb-8">
                    {isLogin ? 'Sign in to access your tasks' : 'Sign up to get started'}
                </p>

                <form onSubmit={handleAuth} className="space-y-4">
                    <div className="relative">
                        <Mail className="absolute left-4 top-3.5 text-gray-400" size={20} />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-slate-700 rounded-xl border border-transparent focus:bg-white dark:focus:bg-slate-600 focus:border-blue-500 outline-none transition-all text-slate-800 dark:text-white"
                            required
                        />
                    </div>
                    <div className="relative">
                        <Lock className="absolute left-4 top-3.5 text-gray-400" size={20} />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-slate-700 rounded-xl border border-transparent focus:bg-white dark:focus:bg-slate-600 focus:border-blue-500 outline-none transition-all text-slate-800 dark:text-white"
                            required
                        />
                    </div>

                    {error && (
                        <div className="p-3 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm font-medium text-center">
                            {error}
                        </div>
                    )}

                    {message && (
                        <div className="p-3 rounded-xl bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-sm font-medium text-center">
                            {message}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/30 transition-all transform active:scale-95 flex items-center justify-center gap-2"
                    >
                        {loading ? <Loader2 className="animate-spin" size={20} /> : (isLogin ? 'Sign In' : 'Sign Up')}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                    >
                        {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                    </button>
                </div>
            </div>
        </div>
    );
}
