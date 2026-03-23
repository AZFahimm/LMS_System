import React, { useMemo } from 'react';
import { MainLayout } from '../../layouts/MainLayout';
import { useUserStore } from '../../store/userStore';
import { mockDataService } from '../../services/mockDataService';

export const StudentCoursePage: React.FC = () => {
  const { user } = useUserStore();

  const student = useMemo(
    () => mockDataService.getStudents().find((s) => s.user_id === user?.id),
    [user]
  );

  const course = useMemo(() => {
    if (!student?.batch_id) return null;
    const batch = mockDataService.getBatches().find((b) => b.id === student.batch_id);
    if (!batch) return null;
    return mockDataService.getCourses().find((c) => c.id === batch.course_id);
  }, [student]);

  return (
    <MainLayout>
      <div>
        <h1 className="text-3xl font-bold mb-5">Course Details</h1>
        {course ? (
          <div className="bg-white p-5 border shadow-sm rounded-xl">
            <h2 className="text-2xl font-semibold">{course.course_name}</h2>
            <p className="text-gray-600 mt-1">Level: {course.level}</p>
            <p className="text-gray-600">Duration: {course.duration_weeks} weeks</p>
            <p className="text-gray-600">Price: ৳{course.price}</p>
            <p className="mt-3">{course.description}</p>
          </div>
        ) : (
          <p className="text-gray-500">No enrolled course found.</p>
        )}
      </div>
    </MainLayout>
  );
};