export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

// Mock data for Step 1 - will be replaced with Payload CMS in Step 2
let tasks: Task[] = [
  {
    id: '1',
    title: 'Complete project documentation',
    description: 'Write comprehensive documentation for the new feature including API specs and user guides',
    status: 'in-progress',
    priority: 'high',
    dueDate: '2024-12-20',
    createdAt: '2024-12-15T10:00:00Z',
    updatedAt: '2024-12-15T10:00:00Z',
  },
  {
    id: '2',
    title: 'Review pull requests',
    description: 'Review and provide feedback on pending pull requests from the team',
    status: 'pending',
    priority: 'medium',
    dueDate: '2024-12-18',
    createdAt: '2024-12-15T11:00:00Z',
    updatedAt: '2024-12-15T11:00:00Z',
  },
  {
    id: '3',
    title: 'Update dependencies',
    description: 'Update all npm packages to their latest stable versions and test for compatibility',
    status: 'completed',
    priority: 'low',
    createdAt: '2024-12-14T09:00:00Z',
    updatedAt: '2024-12-15T14:00:00Z',
  },
];

export async function getTasks(): Promise<Task[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));
  return tasks;
}

export async function getTask(id: string): Promise<Task | null> {
  await new Promise(resolve => setTimeout(resolve, 50));
  return tasks.find(task => task.id === id) || null;
}

export async function createTask(taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task> {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const newTask: Task = {
    ...taskData,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  tasks.unshift(newTask);
  return newTask;
}

export async function updateTask(id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>): Promise<Task | null> {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const taskIndex = tasks.findIndex(task => task.id === id);
  if (taskIndex === -1) return null;
  
  tasks[taskIndex] = {
    ...tasks[taskIndex],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  
  return tasks[taskIndex];
}

export async function deleteTask(id: string): Promise<boolean> {
  await new Promise(resolve => setTimeout(resolve, 100));
  
  const initialLength = tasks.length;
  tasks = tasks.filter(task => task.id !== id);
  return tasks.length < initialLength;
}

export async function getTaskStats() {
  const allTasks = await getTasks();
  return {
    total: allTasks.length,
    pending: allTasks.filter(task => task.status === 'pending').length,
    inProgress: allTasks.filter(task => task.status === 'in-progress').length,
    completed: allTasks.filter(task => task.status === 'completed').length,
  };
}