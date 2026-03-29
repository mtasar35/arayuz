import React, { useState, useEffect } from 'react';
import { Plus, Search } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import TaskBoard from './TaskBoard';
import TaskForm from './TaskForm';
import Sidebar from './Sidebar';
import StatsCards from './StatsCards';
import { appShell, storageKey } from '@/config';

export default function Dashboard() {
  const [tasks, setTasks] = useState(() => {
    const raw = localStorage.getItem(storageKey('tasks'));
    return raw ? JSON.parse(raw) : [];
  });
  
  const [categories, setCategories] = useState(() => {
    const raw = localStorage.getItem(storageKey('categories'));
    return raw ? JSON.parse(raw) : appShell.demo.seedCategories;
  });
  
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [activeView, setActiveView] = useState('board');

  // Save to localStorage whenever tasks or categories change
  useEffect(() => {
    localStorage.setItem(storageKey('tasks'), JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem(storageKey('categories'), JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    document.title = appShell.branding.name;
  }, []);

  const addTask = (taskData) => {
    const newTask = {
      id: Date.now(),
      ...taskData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const updateTask = (taskId, taskData) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, ...taskData, updatedAt: new Date().toISOString() }
        : task
    ));
  };

  const deleteTask = (taskId) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const addCategory = (categoryData) => {
    const newCategory = {
      id: Date.now(),
      ...categoryData
    };
    setCategories(prev => [...prev, newCategory]);
  };

  // Filter tasks based on search, category, and priority
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || task.categoryId === parseInt(selectedCategory);
    const matchesPriority = selectedPriority === 'all' || task.priority === selectedPriority;
    
    return matchesSearch && matchesCategory && matchesPriority;
  });

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const handleCloseTaskForm = () => {
    setShowTaskForm(false);
    setEditingTask(null);
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <Sidebar 
        categories={categories}
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
        onAddCategory={addCategory}
        tasks={tasks}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="glass border-b border-border/40 p-6 sticky top-0 z-40">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-3xl font-bold text-foreground">{appShell.branding.name}</h1>
              {appShell.branding.logoUrl ? (
                <div 
                  className="w-16 h-16 rounded-xl bg-cover bg-center glass-card" 
                  style={{ backgroundImage: `url('${appShell.branding.logoUrl}')` }}
                />
              ) : null}
            </div>
            <Button 
              onClick={() => setShowTaskForm(true)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Task
            </Button>
          </div>

          {/* Search and Filters */}
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder={appShell.branding.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 glass-card border-0"
              />
            </div>
            
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="px-4 py-2 rounded-lg glass-card border-0 text-foreground bg-background/50"
            >
              <option value="all">All Priorities</option>
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>

            <Tabs value={activeView} onValueChange={setActiveView}>
              <TabsList className="glass-card">
                <TabsTrigger value="board">Board</TabsTrigger>
                <TabsTrigger value="list">List</TabsTrigger>
                <TabsTrigger value="calendar">Calendar</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </header>

        {/* Stats Cards */}
        <div className="p-6">
          <StatsCards tasks={filteredTasks} />
        </div>

        {/* Task Board */}
        <div className="flex-1 p-6 pt-0">
          <TaskBoard
            tasks={filteredTasks}
            categories={categories}
            onUpdateTask={updateTask}
            onDeleteTask={deleteTask}
            onEditTask={handleEditTask}
            view={activeView}
          />
        </div>
      </div>

      {/* Task Form Modal */}
      {showTaskForm && (
        <TaskForm
          task={editingTask}
          categories={categories}
          onSave={editingTask ? 
            (taskData) => {
              updateTask(editingTask.id, taskData);
              handleCloseTaskForm();
            } :
            (taskData) => {
              addTask(taskData);
              handleCloseTaskForm();
            }
          }
          onClose={handleCloseTaskForm}
        />
      )}
    </div>
  );
}