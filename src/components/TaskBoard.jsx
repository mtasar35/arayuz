import React from 'react';
import TaskCard from './TaskCard';
import TaskList from './TaskList';
import TaskCalendar from './TaskCalendar';

export default function TaskBoard({ tasks, categories, onUpdateTask, onDeleteTask, onEditTask, view }) {
  if (view === 'list') {
    return (
      <TaskList
        tasks={tasks}
        categories={categories}
        onUpdateTask={onUpdateTask}
        onDeleteTask={onDeleteTask}
        onEditTask={onEditTask}
      />
    );
  }

  if (view === 'calendar') {
    return (
      <TaskCalendar
        tasks={tasks}
        categories={categories}
        onUpdateTask={onUpdateTask}
        onDeleteTask={onDeleteTask}
        onEditTask={onEditTask}
      />
    );
  }

  // Board view (Kanban)
  const todoTasks = tasks.filter(task => task.status === 'todo');
  const progressTasks = tasks.filter(task => task.status === 'in-progress');
  const completedTasks = tasks.filter(task => task.status === 'completed');

  const columns = [
    { id: 'todo', title: 'To Do', tasks: todoTasks, color: 'gray' },
    { id: 'in-progress', title: 'In Progress', tasks: progressTasks, color: 'blue' },
    { id: 'completed', title: 'Completed', tasks: completedTasks, color: 'green' }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
      {columns.map(column => (
        <div key={column.id} className="flex flex-col">
          <div className={`flex items-center justify-between mb-4 p-3 rounded-lg glass-card`}>
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full bg-${column.color}-500`} />
              <h3 className="font-semibold text-foreground">{column.title}</h3>
              <span className="text-sm text-muted-foreground">({column.tasks.length})</span>
            </div>
          </div>
          
          <div className="flex-1 space-y-3 min-h-[400px]">
            {column.tasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                categories={categories}
                onUpdateTask={onUpdateTask}
                onDeleteTask={onDeleteTask}
                onEditTask={onEditTask}
              />
            ))}
            
            {column.tasks.length === 0 && (
              <div className="glass-card p-8 text-center text-muted-foreground border-dashed border-2">
                <p className="text-sm">No tasks in {column.title.toLowerCase()}</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}