import { Lead, Course, Batch, Payment, Attendance, Notice, Student, Worksheet } from '../types';

const storageKey = (name: string) => `eduboost_${name}`;

const baseList = <T>(key: string, initial: T[]): T[] => {
  const raw = localStorage.getItem(storageKey(key));
  if (raw) {
    try {
      return JSON.parse(raw) as T[];
    } catch {
      return initial;
    }
  }
  localStorage.setItem(storageKey(key), JSON.stringify(initial));
  return initial;
};

const saveList = <T>(key: string, items: T[]) => {
  localStorage.setItem(storageKey(key), JSON.stringify(items));
};

const initialUsers = [
  {
    id: 'demo-super-admin-1',
    email: 'super_admin@example.com',
    full_name: 'Demo Super Admin',
    role: 'super_admin',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'demo-admin-1',
    email: 'admin@example.com',
    full_name: 'Demo Admin',
    role: 'admin',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'demo-teacher-1',
    email: 'teacher@example.com',
    full_name: 'Demo Teacher',
    role: 'teacher',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'demo-student-1',
    email: 'student@example.com',
    full_name: 'Demo Student',
    role: 'student',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

const initialLeads: Lead[] = [
  {
    id: 'lead-1',
    name: 'Rafi Ahmed',
    email: 'rafi@example.com',
    phone: '017XXXXXXX',
    call_status: 'interested',
    comments: 'Wants spoken english course',
    interested_course: 'Basic English',
    source: 'Facebook',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

const initialCourses: Course[] = [
  {
    id: 'course-1',
    course_name: 'Spoken English Beginner',
    description: '8-week intensive spoken english course for beginners',
    duration_weeks: 8,
    price: 15000,
    level: 'beginner',
    status: 'active',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

const initialBatches: Batch[] = [
  {
    id: 'batch-1',
    batch_name: 'Morning Batch',
    course_id: 'course-1',
    teacher_id: 'demo-teacher-1',
    start_date: new Date().toISOString().slice(0, 10),
    end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    class_timing: '10:00 AM - 11:30 AM',
    max_students: 25,
    status: 'active',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

const initialStudents: Student[] = [
  {
    id: 'student-1',
    user_id: 'demo-student-1',
    batch_id: 'batch-1',
    enrollment_date: new Date().toISOString().slice(0, 10),
    total_paid: 5000,
    total_due: 10000,
    attendance_percentage: 85,
    status: 'active',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

const initialPayments: Payment[] = [
  {
    id: 'payment-1',
    student_id: 'student-1',
    batch_id: 'batch-1',
    amount: 5000,
    payment_date: new Date().toISOString().slice(0, 10),
    due_date: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    payment_method: 'bKash',
    payment_status: 'completed',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

const initialAttendance: Attendance[] = [
  {
    id: 'attendance-1',
    student_id: 'student-1',
    batch_id: 'batch-1',
    class_date: new Date().toISOString().slice(0, 10),
    status: 'present',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

const initialNotices: Notice[] = [
  {
    id: 'notice-1',
    title: 'New Course Launch',
    content: 'A new advanced spoken English course opens next month.',
    notice_type: 'announcement',
    sent_by: 'Admin',
    target_type: 'all_students',
    email_sent: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

const initialCertificates = [
  {
    id: 'cert-1',
    student_id: 'student-1',
    batch_id: 'batch-1',
    certificate_number: 'C-2026-001',
    issue_date: new Date().toISOString().slice(0, 10),
    certificate_url: 'https://example.com/certificates/c-2026-001.pdf',
    status: 'issued',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

const initialWorksheets: Worksheet[] = [
  {
    id: 'worksheet-1',
    worksheet_name: 'English Speaking Basics',
    batch_id: 'batch-1',
    course_id: 'course-1',
    file_url: 'https://example.com/worksheets/worksheet-1.pdf',
    extracted_text: 'Read and repeat the sentences.',
    ai_practice_enabled: true,
    created_by: 'demo-admin-1',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export const mockDataService = {
  getLeads: () => baseList<Lead>('leads', initialLeads),
  saveLeads: (leads: Lead[]) => saveList('leads', leads),
  getCourses: () => baseList<Course>('courses', initialCourses),
  saveCourses: (courses: Course[]) => saveList('courses', courses),
  getBatches: () => baseList<Batch>('batches', initialBatches),
  saveBatches: (batches: Batch[]) => saveList('batches', batches),
  getStudents: () => baseList<Student>('students', initialStudents),
  saveStudents: (students: Student[]) => saveList('students', students),
  getPayments: () => baseList<Payment>('payments', initialPayments),
  savePayments: (payments: Payment[]) => saveList('payments', payments),
  getAttendance: () => baseList<Attendance>('attendances', initialAttendance),
  saveAttendance: (attendance: Attendance[]) => saveList('attendances', attendance),
  getNotices: () => baseList<Notice>('notices', initialNotices),
  saveNotices: (notices: Notice[]) => saveList('notices', notices),
  getCertificates: () => baseList('certificates', initialCertificates),
  saveCertificates: (certificates: any[]) => saveList('certificates', certificates),
  getWorksheets: () => baseList<Worksheet>('worksheets', initialWorksheets),
  saveWorksheets: (worksheets: Worksheet[]) => saveList('worksheets', worksheets),
  getUsers: () => baseList<User>('users', initialUsers),
  saveUsers: (users: User[]) => saveList('users', users),
};
