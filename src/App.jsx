import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import Layout from './components/Layout';
import Header from './components/Header';
import FilterTabs from './components/FilterTabs';
import TaskInput from './components/TaskInput';
import TaskItem from './components/TaskItem';
import Auth from './components/Auth';
import { LogOut } from 'lucide-react';

function App() {
  const [session, setSession] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');

  // Initialize dark mode
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('darkMode');
      if (savedMode) {
        return savedMode === 'true';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) {
      fetchTasks();
    }
  }, [session]);

  const fetchTasks = async () => {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching tasks:', error);
    } else {
      setTasks(data);
    }
  };

  // Dark mode effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

  const addTask = async (text, category) => {
    if (!session) return;

    const { data, error } = await supabase
      .from('tasks')
      .insert([{ text, category, user_id: session.user.id }])
      .select();

    if (error) {
      console.error('Error adding task:', error);
    } else {
      setTasks([data[0], ...tasks]);
    }
  };

  const toggleTask = async (id) => {
    const task = tasks.find(t => t.id === id);
    const { error } = await supabase
      .from('tasks')
      .update({ completed: !task.completed })
      .eq('id', id);

    if (error) {
      console.error('Error updating task:', error);
    } else {
      setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    }
  };

  const deleteTask = async (id) => {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting task:', error);
    } else {
      setTasks(tasks.filter(t => t.id !== id));
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'All') return true;
    return task.category === filter;
  });

  const completedCount = tasks.filter(t => t.completed).length;

  if (!session) {
    return (
      <div className={darkMode ? 'dark' : ''}>
        <Auth />
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="fixed bottom-4 right-4 p-3 rounded-full bg-white dark:bg-slate-800 shadow-md border border-gray-100 dark:border-slate-700 text-gray-600 dark:text-gray-300 z-50"
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>
    );
  }

  return (
    <Layout>
      <div className="flex justify-end items-center gap-4 mb-4">
        <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
          {session?.user?.email}
        </span>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>

      <Header
        totalTasks={tasks.length}
        completedTasks={completedCount}
        darkMode={darkMode}
        toggleDarkMode={() => setDarkMode(!darkMode)}
      />

      <FilterTabs filter={filter} setFilter={setFilter} />

      <TaskInput onAdd={addTask} />

      <div className="space-y-4">
        {filteredTasks.length > 0 ? (
          filteredTasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />
          ))
        ) : (
          <div className="text-center py-10 text-gray-500 dark:text-gray-400 font-medium">
            No tasks found in this category.
          </div>
        )}
      </div>
    </Layout>
  );
}

export default App;
