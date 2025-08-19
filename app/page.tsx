import { Suspense } from 'react';
import TaskList from '@/components/TaskList';
import TaskForm from '@/components/TaskForm';
import TaskStats from '@/components/TaskStats';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">TaskFlow</h1>
          <p className="text-slate-600 text-lg">Manage your tasks with style and efficiency</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Stats Section */}
          <div className="lg:col-span-3">
            <Suspense fallback={<Skeleton className="h-24 w-full" />}>
              <TaskStats />
            </Suspense>
          </div>

          {/* Task Form */}
          <div className="lg:col-span-1">
            <Card className="p-6 h-fit sticky top-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-4">Add New Task</h2>
              <TaskForm />
            </Card>
          </div>

          {/* Task List */}
          <div className="lg:col-span-2">
            <Suspense fallback={
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-32 w-full" />
                ))}
              </div>
            }>
              <TaskList />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}