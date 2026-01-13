import React, { useState } from 'react';
import { Plus, Hash, Folder, Calendar, CheckSquare, Clock, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';

export default function Sidebar({ categories, selectedCategory, onCategorySelect, onAddCategory, tasks }) {
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  
  const categoryColors = ['blue', 'green', 'purple', 'pink', 'yellow', 'indigo', 'red', 'orange'];

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (newCategoryName.trim()) {
      onAddCategory({
        name: newCategoryName,
        color: categoryColors[categories.length % categoryColors.length]
      });
      setNewCategoryName('');
      setShowAddCategory(false);
    }
  };

  const getTaskCount = (categoryId) => {
    if (categoryId === 'all') return tasks.length;
    return tasks.filter(task => task.categoryId === categoryId).length;
  };

  const todayTasks = tasks.filter(task => {
    const today = new Date().toDateString();
    return task.dueDate && new Date(task.dueDate).toDateString() === today;
  }).length;

  const overdueTasks = tasks.filter(task => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return task.dueDate && new Date(task.dueDate) < today && task.status !== 'completed';
  }).length;

  return (
    <div className="w-80 glass border-r border-border/40 p-6 space-y-6">
      {/* Quick Stats */}
      <Card className="glass-card border-0">
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium">Today</span>
            </div>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              {todayTasks}
            </Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-red-500" />
              <span className="text-sm font-medium">Overdue</span>
            </div>
            <Badge variant="destructive" className={overdueTasks > 0 ? '' : 'bg-gray-100 text-gray-600'}>
              {overdueTasks}
            </Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CheckSquare className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium">Completed</span>
            </div>
            <Badge className="bg-green-100 text-green-800">
              {tasks.filter(task => task.status === 'completed').length}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide px-2">
          Views
        </h3>
        
        <button
          onClick={() => onCategorySelect('all')}
          className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left transition-all hover:bg-accent/50 ${
            selectedCategory === 'all' ? 'bg-primary/10 text-primary font-medium' : 'text-foreground'
          }`}
        >
          <Hash className="w-4 h-4" />
          <span className="flex-1">All Tasks</span>
          <Badge variant="secondary" className="bg-muted">
            {getTaskCount('all')}
          </Badge>
        </button>
      </div>

      {/* Categories */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Categories
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAddCategory(true)}
            className="h-6 w-6 p-0 hover:bg-accent"
          >
            <Plus className="w-3 h-3" />
          </Button>
        </div>

        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => onCategorySelect(category.id.toString())}
            className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left transition-all hover:bg-accent/50 ${
              selectedCategory === category.id.toString() ? 'bg-primary/10 text-primary font-medium' : 'text-foreground'
            }`}
          >
            <div className={`w-3 h-3 rounded-full bg-${category.color}-500`} />
            <span className="flex-1">{category.name}</span>
            <Badge variant="secondary" className="bg-muted">
              {getTaskCount(category.id)}
            </Badge>
          </button>
        ))}

        {showAddCategory && (
          <form onSubmit={handleAddCategory} className="px-3 py-2">
            <Input
              placeholder="Category name..."
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              onBlur={() => setShowAddCategory(false)}
              autoFocus
              className="text-sm glass-card border-0"
            />
          </form>
        )}
      </div>

      {/* Footer */}
      <div className="pt-4 border-t border-border/40">
        <div className="text-xs text-muted-foreground text-center">
          <p>Built with ❤️ for productivity</p>
        </div>
      </div>
    </div>
  );
}