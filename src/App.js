import React from 'react';
import { Toaster } from './components/ui/sonner';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Dashboard />
      <Toaster />
    </div>
  );
}

export default App;
