import React, { useEffect, useMemo, useState } from 'react';
import { MainLayout } from '../../layouts/MainLayout';
import { useUserStore } from '../../store/userStore';
import { mockDataService } from '../../services/mockDataService';

export const StudentDashboard: React.FC = () => {
  const { user } = useUserStore();
  const [stats, setStats] = useState({ completed: 0, due: 0, attendance: 0 });

  const student = useMemo(() => {
    if (!user) return null;
    return mockDataService.getStudents().find((s) => s.user_id === user.id);
  }, [user]);

  useEffect(() => {
    const payments = mockDataService.getPayments().filter((p) => p.student_id === student?.id);
    const paid = payments.reduce((sum, item) => sum + item.amount, 0);
    const due = student?.total_due ?? 0;
    const attendance = student?.attendance_percentage ?? 0;
    setStats({ completed: paid, due, attendance });
  }, [student]);

  return (
    <MainLayout>
      <div>
        <h1 className="text-3xl font-bold mb-6">Student Dashboard</h1>
        <div className="grid gap-4 lg:grid-cols-3 mb-6">
          <div className="bg-white rounded-xl shadow-sm p-5 border">
            <h2 className="text-sm text-gray-500">Paid</h2>
            <p className="text-3xl font-bold text-green-600">৳{stats.completed}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-5 border">
            <h2 className="text-sm text-gray-500">Due</h2>
            <p className="text-3xl font-bold text-red-600">৳{stats.due}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-5 border">
            <h2 className="text-sm text-gray-500">Attendance</h2>
            <p className="text-3xl font-bold text-blue-600">{stats.attendance}%</p>
          </div>
        </div>

        <div className="bg-white p-5 border rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-3">Current Batch</h2>
          {student?.batch_id ? (
            <p className="text-gray-700">Batch ID: {student.batch_id}</p>
          ) : (
            <p className="text-gray-500">No batch assigned yet.</p>
          )}
        </div>
      </div>
    </MainLayout>
  );
};