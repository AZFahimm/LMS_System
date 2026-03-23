import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { AdminDashboard } from './pages/admin/Dashboard';
import { LeadsPage } from './pages/admin/Leads';
import { StudentsPage } from './pages/admin/Students';
import { CoursesPage } from './pages/admin/Courses';
import { BatchesPage } from './pages/admin/Batches';
import { PaymentsPage } from './pages/admin/Payments';
import { CertificatesPage } from './pages/admin/Certificates';
import { WorksheetsPage } from './pages/admin/Worksheets';
import { NoticesPage } from './pages/admin/Notices';
import { ReportsPage } from './pages/admin/Reports';
import { SettingsPage } from './pages/admin/Settings';
import { Unauthorized } from './pages/Unauthorized';
import { TeacherDashboard } from './pages/teacher/Dashboard';
import { TeacherBatchesPage } from './pages/teacher/Batches';
import { TeacherAttendancePage } from './pages/teacher/Attendance';
import { StudentDashboard } from './pages/student/Dashboard';
import { StudentCoursePage } from './pages/student/Course';
import { StudentSchedulePage } from './pages/student/Schedule';
import { StudentPaymentPage } from './pages/student/Payment';
import { StudentProgressPage } from './pages/student/Progress';
import { StudentAIPracticePage } from './pages/student/AIPractice';
import { StudentNoticesPage } from './pages/student/Notices';
import { useUserStore } from './store/userStore';
import { ErrorBoundary } from './components/ErrorBoundary';
import './global.css';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useUserStore();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAdmin } = useUserStore();
  if (!user) return <Navigate to="/login" replace />;
  if (!isAdmin()) return <Navigate to="/unauthorized" replace />;
  return <>{children}</>;
};

const TeacherRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isTeacher } = useUserStore();
  if (!user) return <Navigate to="/login" replace />;
  if (!isTeacher()) return <Navigate to="/unauthorized" replace />;
  return <>{children}</>;
};

const StudentRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isStudent } = useUserStore();
  if (!user) return <Navigate to="/login" replace />;
  if (!isStudent()) return <Navigate to="/unauthorized" replace />;
  return <>{children}</>;
};

const SuperAdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isSuperAdmin } = useUserStore();
  if (!user) return <Navigate to="/login" replace />;
  if (!isSuperAdmin()) return <Navigate to="/unauthorized" replace />;
  return <>{children}</>;
};

const HomeRedirect: React.FC = () => {
  const { user } = useUserStore();

  if (!user) return <Navigate to="/login" replace />;

  if (user.role === 'admin' || user.role === 'super_admin') {
    return <Navigate to="/admin/dashboard" replace />;
  }

  if (user.role === 'teacher') {
    return <Navigate to="/teacher/dashboard" replace />;
  }

  if (user.role === 'student') {
    return <Navigate to="/student/dashboard" replace />;
  }

  return <Navigate to="/login" replace />;
};

function AdminPlaceholder({ title }: { title: string }) {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
      <p className="text-gray-600 mt-2">This page is under development.</p>
    </div>
  );
}

function TeacherPlaceholder({ title }: { title: string }) {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
      <p className="text-gray-600 mt-2">This page is under development.</p>
    </div>
  );
}

function StudentPlaceholder({ title }: { title: string }) {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
      <p className="text-gray-600 mt-2">This page is under development.</p>
    </div>
  );
}

function App() {
  const { initMockUser } = useUserStore();

  useEffect(() => {
    // Initialize mock user from localStorage on app load
    initMockUser();
  }, [initMockUser]);

  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />

          {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/leads"
          element={
            <AdminRoute>
              <LeadsPage />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/students"
          element={
            <AdminRoute>
              <StudentsPage />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/courses"
          element={
            <AdminRoute>
              <CoursesPage />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/batches"
          element={
            <AdminRoute>
              <BatchesPage />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/payments"
          element={
            <AdminRoute>
              <PaymentsPage />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/certificates"
          element={
            <AdminRoute>
              <CertificatesPage />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/worksheets"
          element={
            <AdminRoute>
              <WorksheetsPage />
            </AdminRoute>
          }
        />
        <Route
          path="/teacher/worksheets"
          element={
            <TeacherRoute>
              <WorksheetsPage />
            </TeacherRoute>
          }
        />
        <Route
          path="/admin/notices"
          element={
            <AdminRoute>
              <NoticesPage canEdit />
            </AdminRoute>
          }
        />
        <Route
          path="/teacher/notices"
          element={
            <TeacherRoute>
              <NoticesPage canEdit={false} />
            </TeacherRoute>
          }
        />
        <Route
          path="/admin/reports"
          element={
            <AdminRoute>
              <ReportsPage />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <SuperAdminRoute>
              <SettingsPage />
            </SuperAdminRoute>
          }
        />
        <Route
          path="/teacher/reports"
          element={
            <TeacherRoute>
              <ReportsPage />
            </TeacherRoute>
          }
        />

        {/* Teacher Routes */}
        <Route
          path="/teacher/dashboard"
          element={
            <TeacherRoute>
              <TeacherDashboard />
            </TeacherRoute>
          }
        />
        <Route
          path="/teacher/batches"
          element={
            <TeacherRoute>
              <TeacherBatchesPage />
            </TeacherRoute>
          }
        />
        <Route
          path="/teacher/attendance"
          element={
            <TeacherRoute>
              <TeacherAttendancePage />
            </TeacherRoute>
          }
        />
        <Route
          path="/teacher/reports"
          element={
            <TeacherRoute>
              <TeacherPlaceholder title="Reports" />
            </TeacherRoute>
          }
        />
        <Route
          path="/teacher/worksheets"
          element={
            <TeacherRoute>
              <TeacherPlaceholder title="Worksheets" />
            </TeacherRoute>
          }
        />
        <Route
          path="/teacher/notices"
          element={
            <TeacherRoute>
              <TeacherPlaceholder title="Notices" />
            </TeacherRoute>
          }
        />

        {/* Student Routes */}
        <Route
          path="/student/dashboard"
          element={
            <StudentRoute>
              <StudentDashboard />
            </StudentRoute>
          }
        />
        <Route
          path="/student/course"
          element={
            <StudentRoute>
              <StudentCoursePage />
            </StudentRoute>
          }
        />
        <Route
          path="/student/schedule"
          element={
            <StudentRoute>
              <StudentSchedulePage />
            </StudentRoute>
          }
        />
        <Route
          path="/student/payment"
          element={
            <StudentRoute>
              <StudentPaymentPage />
            </StudentRoute>
          }
        />
        <Route
          path="/student/progress"
          element={
            <StudentRoute>
              <StudentProgressPage />
            </StudentRoute>
          }
        />
        <Route
          path="/student/ai-practice"
          element={
            <StudentRoute>
              <StudentAIPracticePage />
            </StudentRoute>
          }
        />
        <Route
          path="/student/notices"
          element={
            <StudentRoute>
              <StudentNoticesPage />
            </StudentRoute>
          }
        />


        {/* Additional Routes */}
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/" element={<HomeRedirect />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  </ErrorBoundary>
  );
}

export default App;
