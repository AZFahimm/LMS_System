import React, { useEffect, useMemo, useState } from 'react';
import { MainLayout } from '../../layouts/MainLayout';
import { mockDataService } from '../../services/mockDataService';
import { useUserStore } from '../../store/userStore';
import { Attendance, Batch, Student } from '../../types';

const statusOptions = ['present', 'absent', 'late'] as const;

export const TeacherAttendancePage: React.FC = () => {
  const { user } = useUserStore();
  const [selectedBatch, setSelectedBatch] = useState<string>('');
  const [attendance, setAttendance] = useState<Attendance[]>([]);

  const teacherBatches = useMemo(() => {
    return mockDataService
      .getBatches()
      .filter((b) => b.teacher_id === user?.id);
  }, [user]);

  const students = useMemo(() => {
    const allStudents = mockDataService.getStudents();
    return allStudents.filter((s) => s.batch_id === selectedBatch);
  }, [selectedBatch]);

  useEffect(() => {
    setAttendance(mockDataService.getAttendance());
  }, []);

  const setStatus = (studentId: string, status: 'present' | 'absent' | 'late') => {
    const today = new Date().toISOString().slice(0, 10);
    const existing = attendance.find((row) => row.student_id === studentId && row.class_date === today);

    let updated: Attendance[];
    if (existing) {
      updated = attendance.map((row) =>
        row.id === existing.id ? { ...row, status, updated_at: new Date().toISOString() } : row
      );
    } else {
      const record: Attendance = {
        id: `att-${Date.now()}-${studentId}`,
        student_id: studentId,
        batch_id: selectedBatch,
        class_date: today,
        status,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      updated = [record, ...attendance];
    }

    setAttendance(updated);
    mockDataService.saveAttendance(updated);
  };

  const todayAttendance = (studentId: string) => {
    const today = new Date().toISOString().slice(0, 10);
    return attendance.find((row) => row.student_id === studentId && row.class_date === today)?.status;
  };

  return (
    <MainLayout>
      <div>
        <h1 className="text-3xl font-bold mb-4">Attendance</h1>

        <div className="mb-4">
          <label className="font-semibold">Select batch</label>
          <select
            className="ml-3 p-2 border rounded"
            value={selectedBatch}
            onChange={(e) => setSelectedBatch(e.target.value)}
          >
            <option value="">-- Choose --</option>
            {teacherBatches.map((batch: Batch) => (
              <option key={batch.id} value={batch.id}>{batch.batch_name}</option>
            ))}
          </select>
        </div>

        {!selectedBatch ? (
          <p className="text-gray-500">Select a batch to take attendance.</p>
        ) : students.length === 0 ? (
          <p className="text-gray-500">No students in this batch yet.</p>
        ) : (
          <div className="space-y-2">
            {students.map((student) => (
              <div key={student.id} className="flex items-center justify-between p-3 border rounded-lg bg-white">
                <div>
                  <p className="font-medium">{student.user_id}</p>
                  <p className="text-sm text-gray-600">Status: {student.status}</p>
                </div>
                <div className="flex items-center gap-2">
                  {statusOptions.map((status) => (
                    <button
                      key={status}
                      onClick={() => setStatus(student.id, status)}
                      className={`px-3 py-1 rounded ${todayAttendance(student.id) === status ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};