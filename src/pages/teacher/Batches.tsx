import React, { useEffect, useState } from 'react';
import { MainLayout } from '../../layouts/MainLayout';
import { useUserStore } from '../../store/userStore';
import { mockDataService } from '../../services/mockDataService';
import { Batch } from '../../types';

export const TeacherBatchesPage: React.FC = () => {
  const { user } = useUserStore();
  const [batches, setBatches] = useState<Batch[]>([]);

  useEffect(() => {
    const allBatches = mockDataService.getBatches();
    if (user) {
      setBatches(allBatches.filter((b) => b.teacher_id === user.id));
    }
  }, [user]);

  return (
    <MainLayout>
      <div>
        <h1 className="text-3xl font-bold mb-4">My Batches</h1>
        {batches.length === 0 ? (
          <span className="text-gray-500">No batches assigned yet.</span>
        ) : (
          <div className="space-y-3">
            {batches.map((batch) => (
              <div key={batch.id} className="border p-4 rounded-lg bg-white">
                <p className="font-semibold text-lg">{batch.batch_name}</p>
                <p className="text-sm text-gray-600">Course: {batch.course_id}</p>
                <p className="text-sm text-gray-600">Timing: {batch.class_timing}</p>
                <p className="text-sm text-gray-600">{batch.start_date} to {batch.end_date}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};