import { getTasks } from '@/lib/tasks';
import TaskCard from './TaskCard';
import TaskFilters from './TaskFilters';
import { Suspense } from 'react';

interface TaskListProps {
  filter?: string;
}

export default async function TaskList({ filter }: TaskListProps) {
  const tasks = await getTasks();
  
  const filteredTasks = filter 
    ? tasks.filter(task => task.status === filter)
    : tasks;

  if (filteredTasks.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-slate-400 text-lg mb-2">No tasks found</div>
        <p className="text-slate-500">
          {filter ? `No ${filter} tasks at the moment` : 'Create your first task to get started'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Suspense fallback={null}>
        <TaskFilters />
      </Suspense>
      
      <div className="space-y-4">
        {filteredTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}