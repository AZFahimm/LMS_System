import React, { useEffect, useState } from 'react';
import { MainLayout } from '../../layouts/MainLayout';
import { mockDataService } from '../../services/mockDataService';
import { Course, CourseLevel } from '../../types';
import { Plus, Trash2 } from 'lucide-react';

const courseLevels: CourseLevel[] = ['beginner', 'intermediate', 'advanced'];

export const CoursesPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [form, setForm] = useState({
    course_name: '',
    description: '',
    duration_weeks: 6,
    price: 10000,
    level: 'beginner' as CourseLevel,
  });

  useEffect(() => {
    setCourses(mockDataService.getCourses());
  }, []);

  const addCourse = () => {
    if (!form.course_name.trim()) return;
    const newCourse: Course = {
      id: `course-${Date.now()}`,
      course_name: form.course_name,
      description: form.description,
      duration_weeks: form.duration_weeks,
      price: form.price,
      level: form.level,
      status: 'active',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const updated = [newCourse, ...courses];
    setCourses(updated);
    mockDataService.saveCourses(updated);
    setForm({ course_name: '', description: '', duration_weeks: 6, price: 10000, level: 'beginner' });
  };

  const deleteCourse = (id: string) => {
    const updated = courses.filter((course) => course.id !== id);
    setCourses(updated);
    mockDataService.saveCourses(updated);
  };

  return (
    <MainLayout>
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Courses</h1>
          <button onClick={addCourse} className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg">
            <Plus className="w-4 h-4" /> Add Course
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          <input
            value={form.course_name}
            onChange={(e) => setForm((f) => ({ ...f, course_name: e.target.value }))}
            placeholder="Course Name"
            className="p-2 border rounded"
          />
          <input
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            placeholder="Description"
            className="p-2 border rounded"
          />
          <input
            type="number"
            value={form.duration_weeks}
            onChange={(e) => setForm((f) => ({ ...f, duration_weeks: Number(e.target.value) }))}
            placeholder="Duration Weeks"
            className="p-2 border rounded"
          />
          <input
            type="number"
            value={form.price}
            onChange={(e) => setForm((f) => ({ ...f, price: Number(e.target.value) }))}
            placeholder="Price"
            className="p-2 border rounded"
          />
          <select
            value={form.level}
            onChange={(e) => setForm((f) => ({ ...f, level: e.target.value as CourseLevel }))}
            className="p-2 border rounded"
          >
            {courseLevels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-white border rounded-xl shadow-sm p-4">
          <h2 className="text-xl font-semibold mb-4">List</h2>
          {courses.length === 0 ? (
            <p className="text-gray-500">No courses yet.</p>
          ) : (
            <div className="space-y-3">
              {courses.map((course) => (
                <div key={course.id} className="border rounded p-3 flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{course.course_name}</p>
                    <p className="text-sm text-gray-600">{course.description}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      {course.duration_weeks} weeks • ৳{course.price} • {course.level}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteCourse(course.id)}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded text-red-700 bg-red-100"
                  >
                    <Trash2 className="w-4 h-4" /> Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};