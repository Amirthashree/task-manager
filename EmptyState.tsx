import React from 'react';
import { CheckCircle, Search } from 'lucide-react';

interface EmptyStateProps {
  type: 'no-tasks' | 'no-results' | 'all-complete';
  searchQuery?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ type, searchQuery }) => {
  const getEmptyStateContent = () => {
    switch (type) {
      case 'no-tasks':
        return {
          icon: <CheckCircle className="w-16 h-16 text-gray-300" />,
          title: 'No tasks yet',
          description: 'Create your first task to get started on your productivity journey.',
        };
      case 'no-results':
        return {
          icon: <Search className="w-16 h-16 text-gray-300" />,
          title: 'No results found',
          description: searchQuery 
            ? `No tasks match "${searchQuery}". Try a different search term.`
            : 'No tasks match your current filter.',
        };
      case 'all-complete':
        return {
          icon: <CheckCircle className="w-16 h-16 text-green-400" />,
          title: 'All tasks complete! 🎉',
          description: 'Great job! You\'ve completed all your tasks. Time to add some new ones.',
        };
    }
  };

  const content = getEmptyStateContent();

  return (
    <div className="text-center py-16">
      <div className="flex justify-center mb-4">
        {content.icon}
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        {content.title}
      </h3>
      <p className="text-gray-600 max-w-md mx-auto">
        {content.description}
      </p>
    </div>
  );
};