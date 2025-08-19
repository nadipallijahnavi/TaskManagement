'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Calendar
} from 'lucide-react';
import { Task } from '@/lib/tasks';
import { deleteTaskAction, toggleTaskStatusAction } from '@/app/actions';
import { toast } from 'sonner';
import TaskEditDialog from './TaskEditDialog';

interface TaskCardProps {
  task: Task;
}

const statusConfig = {
  pending: { 
    label: 'Pending', 
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    icon: Clock
  },
  'in-progress': { 
    label: 'In Progress', 
    color: 'bg-blue-100 text-blue-800 border-blue-200',
    icon: AlertCircle
  },
  completed: { 
    label: 'Completed', 
    color: 'bg-green-100 text-green-800 border-green-200',
    icon: CheckCircle
  },
};

const priorityConfig = {
  low: { label: 'Low', color: 'bg-gray-100 text-gray-800' },
  medium: { label: 'Medium', color: 'bg-orange-100 text-orange-800' },
  high: { label: 'High', color: 'bg-red-100 text-red-800' },
};

export default function TaskCard({ task }: TaskCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isToggling, setIsToggling] = useState(false);

  const statusInfo = statusConfig[task.status];
  const priorityInfo = priorityConfig[task.priority];
  const StatusIcon = statusInfo.icon;

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this task?')) return;
    
    setIsDeleting(true);
    const result = await deleteTaskAction(task.id);
    
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success('Task deleted successfully');
    }
    setIsDeleting(false);
  };

  const handleToggleStatus = async () => {
    setIsToggling(true);
    const result = await toggleTaskStatusAction(task.id, task.status);
    
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success('Task status updated');
    }
    setIsToggling(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <>
      <Card className="transition-all duration-200 hover:shadow-lg border-l-4 border-l-blue-500">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-slate-800 text-lg mb-2">{task.title}</h3>
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="secondary" className={statusInfo.color}>
                  <StatusIcon className="w-3 h-3 mr-1" />
                  {statusInfo.label}
                </Badge>
                <Badge variant="outline" className={priorityInfo.color}>
                  {priorityInfo.label}
                </Badge>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleToggleStatus} disabled={isToggling}>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Toggle Status
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setIsEditing(true)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={handleDelete} 
                  className="text-red-600"
                  disabled={isDeleting}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        
        {task.description && (
          <CardContent className="pt-0">
            <p className="text-slate-600 mb-3">{task.description}</p>
            
            <div className="flex items-center justify-between text-sm text-slate-500">
              <div className="flex items-center gap-4">
                {task.dueDate && (
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>Due: {formatDate(task.dueDate)}</span>
                  </div>
                )}
              </div>
              <span>Updated: {formatDate(task.updatedAt)}</span>
            </div>
          </CardContent>
        )}
      </Card>

      <TaskEditDialog 
        task={task}
        isOpen={isEditing}
        onOpenChange={setIsEditing}
      />
    </>
  );
}