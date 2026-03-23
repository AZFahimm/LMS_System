import React, { useMemo } from 'react';
import { MainLayout } from '../../layouts/MainLayout';
import { useUserStore } from '../../store/userStore';
import { mockDataService } from '../../services/mockDataService';

export const StudentSchedulePage: React.FC = () => {
  const { user } = useUserStore();
  const student = useMemo(() => mockDataService.getStudents().find((s) => s.user_id === user?.id), [user]);

  const batch = useMemo(() => {
    if (!student?.batch_id) return null;
    return mockDataService.getBatches().find((b) => b.id === student.batch_id);
  }, [student]);

  return (
    <MainLayout>
      <div>
        <h1 className="text-3xl font-bold mb-4">Class Schedule</h1>
        {batch ? (
          <div className="bg-white rounded-xl border shadow-sm p-5">
            <p className="text-lg font-semibold">{batch.batch_name}</p>
            <p className="text-gray-600 mt-2">Time: {batch.class_timing}</p>
            <p className="text-gray-600">Duration: {batch.start_date} - {batch.end_date}</p>
            <p className="text-gray-600">Teacher: {batch.teacher_id}</p>
          </div>
        ) : (
          <p className="text-gray-500">You are not assigned to a batch yet.</p>
        )}
      </div>
    </MainLayout>
  );
};