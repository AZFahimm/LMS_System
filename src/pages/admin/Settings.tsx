import React, { useEffect, useState } from 'react';
import { MainLayout } from '../../layouts/MainLayout';
import { useUserStore } from '../../store/userStore';
import { mockDataService } from '../../services/mockDataService';
import { UserRole, User } from '../../types';

const roleOptions: UserRole[] = ['super_admin', 'admin', 'teacher', 'student', 'guardian'];

const settingKey = 'eduboost_settings';

type AppSettings = {
  appName: string;
  primaryColor: string;
  darkMode: boolean;
  allowRegistration: boolean;
};

const defaultSettings: AppSettings = {
  appName: 'EduCoach',
  primaryColor: '#2563eb',
  darkMode: false,
  allowRegistration: true,
};

export const SettingsPage: React.FC = () => {
  const { user } = useUserStore();
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem(settingKey);
    if (raw) {
      try {
        setSettings(JSON.parse(raw));
      } catch {
        setSettings(defaultSettings);
      }
    }

    setUsers(mockDataService.getUsers());
  }, []);

  useEffect(() => {
    if (settings.primaryColor) {
      document.documentElement.style.setProperty('--primary-color', settings.primaryColor);
    }
    document.documentElement.classList.toggle('dark', settings.darkMode);
  }, [settings]);

  const updateSettings = (key: keyof AppSettings, value: string | boolean) => {
    const updated = { ...settings, [key]: value };
    setSettings(updated);
    localStorage.setItem(settingKey, JSON.stringify(updated));
  };

  const changeRole = (id: string, role: UserRole) => {
    const updated = users.map((u) => (u.id === id ? { ...u, role } : u));
    setUsers(updated);
    mockDataService.saveUsers(updated);
    if (user?.id === id) {
      // refresh current user role if changed superadmin settings
      localStorage.setItem('mockUser', JSON.stringify({ ...user, role }));
    }
  };

  if (!user || user.role !== 'super_admin') {
    return (
      <MainLayout>
        <div className="p-8 bg-white rounded-xl border">
          <h1 className="text-2xl font-bold">Access Denied</h1>
          <p className="text-gray-600 mt-2">Only Super Admin can manage settings.</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div>
        <h1 className="text-3xl font-bold mb-6">Super Admin Settings</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="p-5 border rounded-xl bg-white shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Application Configuration</h2>
            <label className="block mb-3">
              <span className="text-sm font-medium">Application Name</span>
              <input
                value={settings.appName}
                onChange={(e) => updateSettings('appName', e.target.value)}
                className="mt-1 p-2 border rounded w-full"
              />
            </label>
            <label className="block mb-3">
              <span className="text-sm font-medium">Primary Color</span>
              <input
                type="color"
                value={settings.primaryColor}
                onChange={(e) => updateSettings('primaryColor', e.target.value)}
                className="mt-1 h-10 w-16 p-0 border-none"
              />
            </label>
            <label className="flex items-center gap-2 mb-3">
              <input
                type="checkbox"
                checked={settings.darkMode}
                onChange={(e) => updateSettings('darkMode', e.target.checked)}
              />
              Dark Mode
            </label>
            <label className="flex items-center gap-2 mb-3">
              <input
                type="checkbox"
                checked={settings.allowRegistration}
                onChange={(e) => updateSettings('allowRegistration', e.target.checked)}
              />
              Allow student registration
            </label>
          </div>

          <div className="p-5 border rounded-xl bg-white shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Role Management</h2>
            {users.length === 0 ? (
              <p className="text-gray-500">No users available.</p>
            ) : (
              <div className="space-y-3">
                {users.map((u) => (
                  <div key={u.id} className="p-3 border rounded">
                    <p className="font-semibold">{u.full_name} ({u.email})</p>
                    <div className="mt-2">
                      <select
                        value={u.role}
                        onChange={(e) => changeRole(u.id, e.target.value as UserRole)}
                        className="border p-1 rounded"
                      >
                        {roleOptions.map((role) => (
                          <option key={role} value={role}>{role}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="bg-white border rounded-xl p-5 shadow-sm">
          <h2 className="text-xl font-semibold mb-3">Danger Zone</h2>
          <p className="text-sm text-gray-600">Super admin can reassign roles, reset settings, and manage the entire system.</p>
          <button
            onClick={() => {
              localStorage.removeItem(settingKey);
              localStorage.removeItem('mockUser');
              window.location.reload();
            }}
            className="mt-3 inline-flex px-4 py-2 bg-red-600 text-white rounded"
          >
            Reset Config + Logout
          </button>
        </div>
      </div>
    </MainLayout>
  );
};