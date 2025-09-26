import React from 'react';
import { CheckSquare } from 'lucide-react';
import { useTasks } from './hooks/useTasks';
import { TaskForm } from './components/TaskForm';
import { TaskCard } from './components/TaskCard';
import { FilterBar } from './components/FilterBar';
import { EmptyState } from './components/EmptyState';

function App() {
  const {
    tasks,
    filter,
    sort,
    searchQuery,
    stats,
    setFilter,
    setSort,
    setSearchQuery,
    addTask,
    updateTask,
    toggleTask,
    deleteTask,
  } = useTasks();

  const getEmptyStateType = () => {
    if (stats.total === 0) return 'no-tasks';
    if (tasks.length === 0 && (searchQuery || filter !== 'all')) return 'no-results';
    if (filter === 'active' && stats.active === 0 && stats.total > 0) return 'all-complete';
    return 'no-results';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl text-white shadow-xl shadow-blue-500/25 transform hover:scale-105 transition-all duration-300">
              <CheckSquare className="w-8 h-8" />
            </div>
            <h1 className="text-5xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent tracking-tight">
              TASKIFY
            </h1>
          </div>
          <p className="text-gray-600 text-xl font-medium max-w-md mx-auto leading-relaxed">
            Transform your productivity with beautiful task management
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-75"></div>
            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse delay-150"></div>
          </div>
        </div>

        {/* Progress Bar */}
        {stats.total > 0 && (
          <div className="mb-8 bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200/60">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Progress
              </span>
              <span className="text-sm text-gray-600">
                {stats.completed} of {stats.total} completed
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-500"
                style={{
                  width: `${stats.total > 0 ? (stats.completed / stats.total) * 100 : 0}%`,
                }}
              />
            </div>
          </div>
        )}

        {/* Task Form */}
        <div className="mb-6">
          <TaskForm onAddTask={addTask} />
        </div>

        {/* Filter Bar */}
        {stats.total > 0 && (
          <div className="mb-6">
            <FilterBar
              filter={filter}
              sort={sort}
              searchQuery={searchQuery}
              onFilterChange={setFilter}
              onSortChange={setSort}
              onSearchChange={setSearchQuery}
              stats={stats}
            />
          </div>
        )}

        {/* Task List */}
        <div className="space-y-3">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggle={toggleTask}
                onUpdate={updateTask}
                onDelete={deleteTask}
              />
            ))
          ) : (
            <EmptyState
              type={getEmptyStateType()}
              searchQuery={searchQuery}
            />
          )}
        </div>

        {/* Footer */}
        <div className="mt-16 text-center text-gray-500 text-sm">
          <p>Built with React, TypeScript, and Tailwind CSS</p>
        </div>
      </div>
    </div>
  );
}

export default App;