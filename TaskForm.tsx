import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Task } from '../types/Task';

interface TaskFormProps {
  onAddTask: (title: string, description?: string, priority?: Task['priority']) => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Task['priority']>('medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTask(title, description || undefined, priority);
      setTitle('');
      setDescription('');
      setPriority('medium');
      setIsExpanded(false);
    }
  };

  const handleCancel = () => {
    setTitle('');
    setDescription('');
    setPriority('medium');
    setIsExpanded(false);
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm border border-gray-200/60 rounded-xl p-4 shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center">
            <Plus className="w-3 h-3 text-gray-400" />
          </div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            placeholder="Add a new task..."
            className="flex-1 bg-transparent border-none outline-none text-gray-900 placeholder-gray-500 text-base"
          />
        </div>

        {isExpanded && (
          <div className="space-y-4 pl-8 animate-in slide-in-from-top-2 duration-200">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add a description (optional)..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={2}
            />
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">Priority:</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as Task['priority'])}
                  className="px-2 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="group px-6 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
              >
                <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-200" />
                Add Task
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2.5 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl font-medium transition-all duration-200 border border-gray-200 hover:border-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};