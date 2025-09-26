import React from 'react';
import { Search, Import as SortAsc, CheckCircle, Circle, Clock } from 'lucide-react';
import { TaskFilter, TaskSort } from '../types/Task';

interface FilterBarProps {
  filter: TaskFilter;
  sort: TaskSort;
  searchQuery: string;
  onFilterChange: (filter: TaskFilter) => void;
  onSortChange: (sort: TaskSort) => void;
  onSearchChange: (query: string) => void;
  stats: {
    total: number;
    completed: number;
    active: number;
    highPriority: number;
  };
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filter,
  sort,
  searchQuery,
  onFilterChange,
  onSortChange,
  onSearchChange,
  stats,
}) => {
  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search tasks..."
          className="w-full pl-10 pr-4 py-2 bg-white/80 backdrop-blur-sm border border-gray-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-1 bg-white/80 backdrop-blur-sm border border-gray-200/60 rounded-lg p-1">
          <button
            onClick={() => onFilterChange('all')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 transform hover:scale-105 ${
              filter === 'all'
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/80'
            }`}
          >
            <Circle className="w-3.5 h-3.5" />
            All ({stats.total})
          </button>
          <button
            onClick={() => onFilterChange('active')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 transform hover:scale-105 ${
              filter === 'active'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/25'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/80'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            Active ({stats.active})
          </button>
          <button
            onClick={() => onFilterChange('completed')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 transform hover:scale-105 ${
              filter === 'completed'
                ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg shadow-green-500/25'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/80'
            }`}
          >
            <CheckCircle className="w-3.5 h-3.5" />
            Done ({stats.completed})
          </button>
        </div>

        <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-gray-200/60 rounded-lg px-4 py-2.5 shadow-sm">
          <SortAsc className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-600">Sort by:</span>
          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value as TaskSort)}
            className="text-sm bg-transparent border-none outline-none text-gray-900"
          >
            <option value="created">Created Date</option>
            <option value="priority">Priority</option>
            <option value="alphabetical">Name</option>
          </select>
        </div>
      </div>

      {/* Stats Summary */}
      {stats.highPriority > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-sm text-red-800">
            🚨 You have {stats.highPriority} high-priority task{stats.highPriority > 1 ? 's' : ''} pending
          </p>
        </div>
      )}
    </div>
  );
};