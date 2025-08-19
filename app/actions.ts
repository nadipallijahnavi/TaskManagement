'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createTask, updateTask, deleteTask } from '@/lib/tasks';

export async function createTaskAction(formData: FormData) {
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const status = formData.get('status') as 'pending' | 'in-progress' | 'completed';
  const priority = formData.get('priority') as 'low' | 'medium' | 'high';
  const dueDate = formData.get('dueDate') as string;

  if (!title.trim()) {
    return { error: 'Title is required' };
  }

  try {
    await createTask({
      title: title.trim(),
      description: description.trim(),
      status,
      priority,
      dueDate: dueDate || undefined,
    });

    revalidatePath('/');
    return { success: true };
  } catch (error) {
    return { error: 'Failed to create task' };
  }
}

export async function updateTaskAction(id: string, formData: FormData) {
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const status = formData.get('status') as 'pending' | 'in-progress' | 'completed';
  const priority = formData.get('priority') as 'low' | 'medium' | 'high';
  const dueDate = formData.get('dueDate') as string;

  if (!title.trim()) {
    return { error: 'Title is required' };
  }

  try {
    await updateTask(id, {
      title: title.trim(),
      description: description.trim(),
      status,
      priority,
      dueDate: dueDate || undefined,
    });

    revalidatePath('/');
    return { success: true };
  } catch (error) {
    return { error: 'Failed to update task' };
  }
}

export async function deleteTaskAction(id: string) {
  try {
    await deleteTask(id);
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    return { error: 'Failed to delete task' };
  }
}

export async function toggleTaskStatusAction(id: string, currentStatus: string) {
  let newStatus: 'pending' | 'in-progress' | 'completed';
  
  switch (currentStatus) {
    case 'pending':
      newStatus = 'in-progress';
      break;
    case 'in-progress':
      newStatus = 'completed';
      break;
    case 'completed':
      newStatus = 'pending';
      break;
    default:
      newStatus = 'pending';
  }

  try {
    await updateTask(id, { status: newStatus });
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    return { error: 'Failed to update task status' };
  }
}