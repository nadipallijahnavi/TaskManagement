'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

export default function TaskFilters() {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filters = [
    { id: 'all', label: 'All Tasks', count: 0 },
    { id: 'pending', label: 'Pending', count: 0 },
    { id: 'in-progress', label: 'In Progress', count: 0 },
    { id: 'completed', label: 'Completed', count: 0 },
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {filters.map((filter) => (
        <Button
          key={filter.id}
          variant={activeFilter === filter.id ? 'default' : 'outline'}
          size="sm"
          onClick={() => setActiveFilter(filter.id)}
          className="transition-all duration-200"
        >
          {filter.label}
        </Button>
      ))}
    </div>
  );
}