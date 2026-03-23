import React from 'react';
import { Menu, LogOut, Bell } from 'lucide-react';
import { useState } from 'react';
import { useUserStore } from '../../store/userStore';
import { useNavigate } from 'react-router-dom';

export const Header: React.FC = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const { user, logout } = useUserStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-gray-100 rounded-lg">
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-bold text-blue-600">EduCoach</h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <button
            className="p-2 hover:bg-gray-100 rounded-lg relative"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell className="w-6 h-6 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full"></span>
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
            {user?.full_name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">{user?.full_name}</p>
            <p className="text-xs text-gray-600 capitalize">{user?.role}</p>
          </div>
        </div>

        <button
          className="p-2 hover:bg-gray-100 rounded-lg"
          onClick={handleLogout}
          title="Logout"
        >
          <LogOut className="w-6 h-6 text-gray-600" />
        </button>
      </div>
    </header>
  );
};
