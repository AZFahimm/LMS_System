import React, { useEffect, useState } from 'react';
import { MainLayout } from '../../layouts/MainLayout';
import { mockDataService } from '../../services/mockDataService';
import { useUserStore } from '../../store/userStore';

export const TeacherDashboard: React.FC = () => {
  const { user } = useUserStore();
  const [batches, setBatches] = useState(0);
  const [students, setStudents] = useState(0);

  useEffect(() => {
    const allBatches = mockDataService.getBatches();
    const myBatches = user ? allBatches.filter((b) => b.teacher_id === user.id) : [];
    setBatches(myBatches.length);

    const allStudents = mockDataService.getStudents();
    setStudents(allStudents.filter((s) => myBatches.map((b) => b.id).includes(s.batch_id || '')).length);
  }, [user]);

  return (
    <MainLayout>
      <div>
        <h1 className="text-3xl font-bold mb-6">Teacher Dashboard</h1>
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="p-6 bg-white rounded-xl shadow-sm border">
            <h2 className="text-xl font-semibold">Assigned Batches</h2>
            <p className="text-4xl font-bold text-blue-600 mt-3">{batches}</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-sm border">
            <h2 className="text-xl font-semibold">Students</h2>
            <p className="text-4xl font-bold text-green-600 mt-3">{students}</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};