import React from 'react';
import { Calendar, Clock, Edit2, Trash2, CheckCircle2, Circle, PlayCircle } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

export default function TaskCard({ task, categories, onUpdateTask, onDeleteTask, onEditTask }) {
  const category = categories.find(cat => cat.id === task.categoryId);
  
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const isOverdue = () => {
    if (!task.dueDate || task.status === 'completed') return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(task.dueDate) < today;
  };

  const getPriorityColor = () => {
    switch (task.priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleStatusChange = (newStatus) => {
    onUpdateTask(task.id, { status: newStatus });
  };

  const getStatusIcon = () => {
    switch (task.status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'in-progress':
        return <PlayCircle className="w-5 h-5 text-blue-600" />;
      default:
        return <Circle className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <Card className="glass-card border-0 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 group">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="hover:bg-accent/50 rounded-full p-1 transition-colors">
                  {getStatusIcon()}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleStatusChange('todo')}>
                  <Circle className="w-4 h-4 mr-2" />
                  To Do
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleStatusChange('in-progress')}>
                  <PlayCircle className="w-4 h-4 mr-2" />
                  In Progress
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleStatusChange('completed')}>
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Completed
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {category && (
              <Badge variant="outline" className={`bg-${category.color}-50 text-${category.color}-700 border-${category.color}-200`}>
                {category.name}
              </Badge>
            )}
          </div>
          
          <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onEditTask(task)}
              className="h-8 w-8 p-0 hover:bg-accent"
            >
              <Edit2 className="w-3 h-3" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onDeleteTask(task.id)}
              className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
        </div>

        <h4 className={`font-semibold mb-2 text-foreground ${task.status === 'completed' ? 'line-through opacity-60' : ''}`}>
          {task.title}
        </h4>
        
        {task.description && (
          <p className={`text-sm text-muted-foreground mb-3 line-clamp-2 ${task.status === 'completed' ? 'line-through opacity-60' : ''}`}>
            {task.description}
          </p>
        )}

        <div className="flex flex-col space-y-2">
          {task.dueDate && (
            <div className={`flex items-center space-x-2 text-xs ${isOverdue() ? 'text-red-600' : 'text-muted-foreground'}`}>
              <Calendar className="w-3 h-3" />
              <span>{formatDate(task.dueDate)}</span>
              {isOverdue() && <span className="text-red-600 font-medium">Overdue</span>}
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <Badge className={`text-xs ${getPriorityColor()}`}>
              {task.priority} priority
            </Badge>
            
            {task.createdAt && (
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                <span>{formatDate(task.createdAt)}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}