import React, { useEffect, useState } from 'react';
import { Users, BookOpen, DollarSign, TrendingUp } from 'lucide-react';
import { MainLayout } from '../../layouts/MainLayout';

interface DashboardStats {
  total_students: number;
  active_batches: number;
  monthly_revenue: number;
  conversion_rate: number;
}

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    total_students: 0,
    active_batches: 0,
    monthly_revenue: 0,
    conversion_rate: 0,
  });

  // TODO: Fetch stats from API
  useEffect(() => {
    // Placeholder data
    setStats({
      total_students: 245,
      active_batches: 12,
      monthly_revenue: 125000,
      conversion_rate: 68,
    });
  }, []);

  const statCards = [
    {
      label: 'Total Students',
      value: stats.total_students,
      icon: Users,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      label: 'Active Batches',
      value: stats.active_batches,
      icon: BookOpen,
      color: 'bg-green-100 text-green-600',
    },
    {
      label: 'Monthly Revenue',
      value: `৳${stats.monthly_revenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'bg-yellow-100 text-yellow-600',
    },
    {
      label: 'Conversion Rate',
      value: `${stats.conversion_rate}%`,
      icon: TrendingUp,
      color: 'bg-purple-100 text-purple-600',
    },
  ];

  return (
    <MainLayout>
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div key={index} className="card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">{card.label}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{card.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${card.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Students */}
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Enrollments</h2>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between pb-3 border-b">
                  <div>
                    <p className="font-medium text-gray-900">Student {i}</p>
                    <p className="text-sm text-gray-600">Beginner Course</p>
                  </div>
                  <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
                    Active
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Payments */}
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Pending Payments</h2>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between pb-3 border-b">
                  <div>
                    <p className="font-medium text-gray-900">Student {i}</p>
                    <p className="text-sm text-gray-600">৳5,000 due</p>
                  </div>
                  <span className="text-xs bg-red-100 text-red-700 px-3 py-1 rounded-full">
                    Overdue
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
