import React, { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  ClipboardList,
  DollarSign,
  BarChart3,
  FileText,
  Settings,
  Menu,
  X,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useUserStore } from '../../store/userStore';

const adminMenuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard' },
  { icon: Users, label: 'Leads', href: '/admin/leads' },
  { icon: Users, label: 'Students', href: '/admin/students' },
  { icon: BookOpen, label: 'Courses', href: '/admin/courses' },
  { icon: Users, label: 'Batches', href: '/admin/batches' },
  { icon: DollarSign, label: 'Payments', href: '/admin/payments' },
  { icon: FileText, label: 'Certificates', href: '/admin/certificates' },
  { icon: ClipboardList, label: 'Worksheets', href: '/admin/worksheets' },
  { icon: FileText, label: 'Notices', href: '/admin/notices' },
  { icon: BarChart3, label: 'Reports', href: '/admin/reports' },
  { icon: Settings, label: 'Settings', href: '/admin/settings' },
];

const teacherMenuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/teacher/dashboard' },
  { icon: Users, label: 'My Batches', href: '/teacher/batches' },
  { icon: ClipboardList, label: 'Attendance', href: '/teacher/attendance' },
  { icon: BarChart3, label: 'Reports', href: '/teacher/reports' },
  { icon: FileText, label: 'Worksheets', href: '/teacher/worksheets' },
  { icon: FileText, label: 'Notices', href: '/teacher/notices' },
];

const studentMenuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/student/dashboard' },
  { icon: BookOpen, label: 'My Course', href: '/student/course' },
  { icon: ClipboardList, label: 'Schedule', href: '/student/schedule' },
  { icon: DollarSign, label: 'Payment', href: '/student/payment' },
  { icon: BarChart3, label: 'Progress', href: '/student/progress' },
  { icon: LayoutDashboard, label: 'AI Practice', href: '/student/ai-practice' },
  { icon: FileText, label: 'Notices', href: '/student/notices' },
];

export const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { user } = useUserStore();
  const location = useLocation();

  let menuItems = adminMenuItems;
  if (user?.role === 'teacher') {
    menuItems = teacherMenuItems;
  } else if (user?.role === 'student') {
    menuItems = studentMenuItems;
  }

  const isActive = (href: string) => location.pathname === href;

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-40 p-2 bg-blue-600 text-white rounded-lg"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen bg-white border-r border-gray-200 transition-transform duration-300 z-40 ${
          isOpen ? 'w-64' : '-translate-x-full md:translate-x-0 md:w-64'
        } md:relative md:translate-x-0`}
      >
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-blue-600">EduCoach</h2>
          <p className="text-xs text-gray-600 capitalize">{user?.role}</p>
        </div>

        <nav className="p-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                  isActive(item.href)
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
};
