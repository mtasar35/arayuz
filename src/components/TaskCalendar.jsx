import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import TaskCard from './TaskCard';

export default function TaskCalendar({ tasks, categories, onUpdateTask, onDeleteTask, onEditTask }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getTasksForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return tasks.filter(task => {
      if (!task.dueDate) return false;
      const taskDate = new Date(task.dueDate).toISOString().split('T')[0];
      return taskDate === dateStr;
    });
  };

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  
  // Create array of days to display
  const days = [];
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  
  // Add all days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day);
  }

  return (
    <Card className="glass-card border-0">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold flex items-center space-x-2">
            <CalendarIcon className="w-5 h-5" />
            <span>Task Calendar</span>
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateMonth(-1)}
              className="glass-card border-border/40"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="text-lg font-semibold min-w-[140px] text-center">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateMonth(1)}
              className="glass-card border-border/40"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1 mb-4">
          {/* Day headers */}
          {dayNames.map(day => (
            <div key={day} className="p-3 text-center text-sm font-semibold text-muted-foreground bg-muted/30 rounded-lg">
              {day}
            </div>
          ))}
          
          {/* Calendar days */}
          {days.map((day, index) => {
            if (!day) {
              return <div key={index} className="p-2 min-h-[120px]" />;
            }
            
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
            const dayTasks = getTasksForDate(date);
            const isCurrentDay = isToday(date);
            
            return (
              <div 
                key={day} 
                className={`p-2 min-h-[120px] border border-border/40 rounded-lg transition-colors hover:bg-accent/30 ${
                  isCurrentDay ? 'bg-primary/10 border-primary/30' : 'bg-card/50'
                }`}
              >
                <div className={`text-sm font-medium mb-2 ${
                  isCurrentDay ? 'text-primary font-bold' : 'text-foreground'
                }`}>
                  {day}
                </div>
                
                <div className="space-y-1">
                  {dayTasks.slice(0, 2).map(task => {
                    const category = categories.find(cat => cat.id === task.categoryId);
                    
                    return (
                      <div 
                        key={task.id}
                        onClick={() => onEditTask(task)}
                        className="text-xs p-1 rounded cursor-pointer hover:bg-accent/50 transition-colors"
                      >
                        <div className={`font-medium truncate ${task.status === 'completed' ? 'line-through opacity-60' : ''}`}>
                          {task.title}
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          {category && (
                            <div className={`w-2 h-2 rounded-full bg-${category.color}-500`} />
                          )}
                          <Badge className={`text-[10px] px-1 py-0 ${
                            task.priority === 'high' ? 'bg-red-100 text-red-700' :
                            task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {task.priority}
                          </Badge>
                        </div>
                      </div>
                    );
                  })}
                  
                  {dayTasks.length > 2 && (
                    <div className="text-xs text-muted-foreground px-1">
                      +{dayTasks.length - 2} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Today's Tasks Detail */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
            <span>Today&apos;s tasks</span>
            <Badge variant="secondary">{getTasksForDate(new Date()).length}</Badge>
          </h3>
          
          {getTasksForDate(new Date()).length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <CalendarIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No tasks due today</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {getTasksForDate(new Date()).map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  categories={categories}
                  onUpdateTask={onUpdateTask}
                  onDeleteTask={onDeleteTask}
                  onEditTask={onEditTask}
                />
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}