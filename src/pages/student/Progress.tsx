import React, { useEffect, useMemo, useState } from 'react';
import { MainLayout } from '../../layouts/MainLayout';
import { useUserStore } from '../../store/userStore';
import { mockDataService } from '../../services/mockDataService';

export const StudentProgressPage: React.FC = () => {
  const { user } = useUserStore();
  const student = useMemo(() => mockDataService.getStudents().find((s) => s.user_id === user?.id), [user]);
  const [score, setScore] = useState({ speaking: 80, grammar: 75, vocabulary: 78 });

  useEffect(() => {
    if (student) {
      const base = Math.min(100, Math.max(20, 80 + (student.attendance_percentage - 80) * 0.2));
      setScore({ speaking: base, grammar: base - 3, vocabulary: base - 2 });
    }
  }, [student]);

  return (
    <MainLayout>
      <div>
        <h1 className="text-3xl font-bold mb-4">Progress</h1>
        {student ? (
          <div className="grid gap-4 lg:grid-cols-3">
            {Object.entries(score).map(([key, value]) => (
              <div key={key} className="bg-white border rounded-xl p-5 shadow-sm">
                <h2 className="font-semibold capitalize">{key}</h2>
                <p className="text-4xl font-bold text-blue-600 mt-2">{value}%</p>
                <div className="h-2 bg-gray-200 rounded mt-3">
                  <div className="h-2 bg-blue-500 rounded" style={{ width: `${value}%` }} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Student profile missing.</p>
        )}
      </div>
    </MainLayout>
  );
};