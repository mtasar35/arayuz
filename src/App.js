import React from 'react';
import { Toaster } from './components/ui/sonner';
import Dashboard from './components/Dashboard';
import { appShell } from '@/config';
import './App.css';

function App() {
  return (
    <div className={appShell.layout.pageClassName}>
      <Dashboard />
      <Toaster />
    </div>
  );
}

export default App;
