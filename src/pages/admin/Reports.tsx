import React, { useMemo } from 'react';
import { MainLayout } from '../../layouts/MainLayout';
import { mockDataService } from '../../services/mockDataService';

export const ReportsPage: React.FC = () => {
  const leads = mockDataService.getLeads();
  const courses = mockDataService.getCourses();
  const batches = mockDataService.getBatches();
  const students = mockDataService.getStudents();
  const payments = mockDataService.getPayments();
  const notices = mockDataService.getNotices();

  const totals = useMemo(() => {
    const totalRevenue = payments.reduce((s, p) => s + p.amount, 0);
    const activeStudents = students.filter((s) => s.status === 'active').length;
    const upcomingBatches = batches.filter((b) => new Date(b.start_date) >= new Date()).length;
    const leadCount = leads.length;

    return {
      totalRevenue,
      activeStudents,
      upcomingBatches,
      leadCount,
      noticeCount: notices.length,
      courseCount: courses.length,
    };
  }, [leads, courses, batches, students, payments, notices]);

  return (
    <MainLayout>
      <div>
        <h1 className="text-3xl font-bold mb-6">Reports</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="rounded-xl border p-5 bg-white shadow-sm">
            <p className="text-sm font-medium text-gray-500">Total Revenue</p>
            <p className="text-3xl font-bold text-green-600">৳{totals.totalRevenue.toLocaleString()}</p>
          </div>
          <div className="rounded-xl border p-5 bg-white shadow-sm">
            <p className="text-sm font-medium text-gray-500">Active Students</p>
            <p className="text-3xl font-bold text-blue-600">{totals.activeStudents}</p>
          </div>
          <div className="rounded-xl border p-5 bg-white shadow-sm">
            <p className="text-sm font-medium text-gray-500">Upcoming Batches</p>
            <p className="text-3xl font-bold text-orange-600">{totals.upcomingBatches}</p>
          </div>
          <div className="rounded-xl border p-5 bg-white shadow-sm">
            <p className="text-sm font-medium text-gray-500">Leads</p>
            <p className="text-3xl font-bold text-indigo-600">{totals.leadCount}</p>
          </div>
          <div className="rounded-xl border p-5 bg-white shadow-sm">
            <p className="text-sm font-medium text-gray-500">Courses</p>
            <p className="text-3xl font-bold text-teal-600">{totals.courseCount}</p>
          </div>
          <div className="rounded-xl border p-5 bg-white shadow-sm">
            <p className="text-sm font-medium text-gray-500">Notices</p>
            <p className="text-3xl font-bold text-gray-700">{totals.noticeCount}</p>
          </div>
        </div>

        <div className="bg-white border rounded-xl p-5 shadow-sm">
          <h2 className="text-2xl font-semibold mb-3">Latest Activities</h2>
          <ul className="space-y-2">
            <li className="text-sm text-gray-600">Total payments recorded: {payments.length}</li>
            <li className="text-sm text-gray-600">Total enrollments: {students.length}</li>
            <li className="text-sm text-gray-600">Total worksheets: {mockDataService.getWorksheets().length}</li>
            <li className="text-sm text-gray-600">Notice updates: {notices.length}</li>
          </ul>
        </div>
      </div>
    </MainLayout>
  );
};