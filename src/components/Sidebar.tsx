import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { ListTodo, Star, Calendar, UserCircle, Plus, PieChart } from 'lucide-react';

const Sidebar = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      <div className="p-4">
        <div className="flex items-center space-x-3 mb-8">
          <img
            src={`https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=22c55e&color=fff`}
            alt="Profile"
            className="w-12 h-12 rounded-full"
          />
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Hey,</p>
            <p className="font-semibold text-gray-900 dark:text-white">{user?.name}</p>
          </div>
        </div>

        <nav className="space-y-1">
          <NavItem icon={<ListTodo />} label="All Tasks" active />
          <NavItem icon={<Calendar />} label="Today" count={tasks.filter(t => !t.completed).length} />
          <NavItem icon={<Star />} label="Important" />
          <NavItem icon={<Calendar />} label="Planned" />
          <NavItem icon={<UserCircle />} label="Assigned to me" />
        </nav>

        <button className="mt-6 flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
          <Plus className="w-5 h-5" />
          <span>Add list</span>
        </button>

        <div className="mt-8">
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm font-medium text-gray-900 dark:text-white">Today's Tasks</p>
            <span className="text-sm text-gray-600 dark:text-gray-400">{completedTasks}/{totalTasks}</span>
          </div>
          <div className="w-full h-32">
            <PieChart 
              className="w-full h-full text-green-500 dark:text-green-400"
              style={{
                '--value': progress,
                '--size': '128px',
              } as React.CSSProperties}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const NavItem = ({ icon, label, count, active }: { icon: React.ReactNode; label: string; count?: number; active?: boolean }) => (
  <button
    className={`flex items-center space-x-3 w-full px-3 py-2 text-sm rounded-lg transition-colors duration-200
      ${active 
        ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400' 
        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
      }`}
  >
    {icon}
    <span>{label}</span>
    {count !== undefined && (
      <span className="ml-auto text-xs font-medium text-gray-600 dark:text-gray-400">{count}</span>
    )}
  </button>
);

export default Sidebar;