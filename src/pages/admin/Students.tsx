import React, { useEffect, useState } from 'react';
import { MainLayout } from '../../layouts/MainLayout';
import { mockDataService } from '../../services/mockDataService';
import { Student } from '../../types';
import { Trash2 } from 'lucide-react';

export const StudentsPage: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    setStudents(mockDataService.getStudents());
  }, []);

  const deleteStudent = (id: string) => {
    const filtered = students.filter((s) => s.id !== id);
    setStudents(filtered);
    mockDataService.saveStudents(filtered);
  };

  return (
    <MainLayout>
      <div>
        <h1 className="text-3xl font-bold mb-5">Students</h1>
        <p className="text-gray-600 mb-4">Quick management of enrolled students and payments.</p>

        <div className="bg-white border rounded-xl shadow-sm p-4">
          {students.length === 0 ? (
            <p className="text-gray-500">No students enrolled yet.</p>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-blue-50">
                  <th className="p-3 border">Student ID</th>
                  <th className="p-3 border">User ID</th>
                  <th className="p-3 border">Batch</th>
                  <th className="p-3 border">Status</th>
                  <th className="p-3 border">Paid/Due (৳)</th>
                  <th className="p-3 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="p-3 border">{student.id}</td>
                    <td className="p-3 border">{student.user_id}</td>
                    <td className="p-3 border">{student.batch_id || '-'}</td>
                    <td className="p-3 border capitalize">{student.status}</td>
                    <td className="p-3 border">{student.total_paid}/{student.total_due}</td>
                    <td className="p-3 border">
                      <button
                        onClick={() => deleteStudent(student.id)}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-red-100 text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </MainLayout>
  );
};