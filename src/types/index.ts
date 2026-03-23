// User Types
export type UserRole = 'super_admin' | 'admin' | 'teacher' | 'student' | 'guardian';

export interface User {
  id: string;
  email: string;
  phone?: string;
  full_name: string;
  role: UserRole;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Student Types
export type StudentStatus = 'active' | 'inactive' | 'dropout' | 'completed';

export interface Student {
  id: string;
  user_id: string;
  batch_id?: string;
  enrollment_date: string;
  total_paid: number;
  total_due: number;
  attendance_percentage: number;
  status: StudentStatus;
  user?: User;
  created_at: string;
  updated_at: string;
}

// Guardian Types
export interface Guardian {
  id: string;
  user_id: string;
  student_id: string;
  relationship: string;
  user?: User;
  student?: Student;
  created_at: string;
  updated_at: string;
}

// Teacher Types
export interface Teacher {
  id: string;
  user_id: string;
  qualification?: string;
  experience_years?: number;
  specialization?: string;
  status: string;
  user?: User;
  created_at: string;
  updated_at: string;
}

// Course Types
export type CourseLevel = 'beginner' | 'intermediate' | 'advanced';

export interface Course {
  id: string;
  course_name: string;
  description?: string;
  duration_weeks?: number;
  price?: number;
  level?: CourseLevel;
  status: string;
  created_at: string;
  updated_at: string;
}

// Batch Types
export type BatchStatus = 'active' | 'completed' | 'cancelled';

export interface Batch {
  id: string;
  batch_name: string;
  course_id: string;
  teacher_id: string;
  start_date?: string;
  end_date?: string;
  class_timing?: string;
  max_students?: number;
  status: BatchStatus;
  course?: Course;
  teacher?: Teacher;
  created_at: string;
  updated_at: string;
}

// Enrollment Types
export interface Enrollment {
  id: string;
  student_id: string;
  batch_id: string;
  enrollment_date: string;
  status: string;
  student?: Student;
  batch?: Batch;
  created_at: string;
  updated_at: string;
}

// Lead Types
export type CallStatus = 'interested' | 'admitted' | 'not_interested' | 'will_admit_later' | 'did_not_receive' | 'complaint' | 'other';

export interface Lead {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  call_status?: CallStatus;
  comments?: string;
  interested_course?: string;
  source?: string;
  converted_student_id?: string;
  created_at: string;
  updated_at: string;
}

// Payment Types
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';

export interface Payment {
  id: string;
  student_id: string;
  batch_id: string;
  amount: number;
  payment_date: string;
  due_date?: string;
  payment_method?: string;
  payment_status: PaymentStatus;
  transaction_id?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

// Attendance Types
export type AttendanceStatus = 'present' | 'absent' | 'late';

export interface Attendance {
  id: string;
  student_id: string;
  batch_id: string;
  class_date: string;
  status: AttendanceStatus;
  notes?: string;
  recorded_by?: string;
  created_at: string;
  updated_at: string;
}

// Assessment Types
export type AssessmentType = 'quiz' | 'midterm' | 'final' | 'project';

export interface Assessment {
  id: string;
  student_id: string;
  batch_id: string;
  teacher_id: string;
  assessment_type: AssessmentType;
  marks_obtained?: number;
  total_marks?: number;
  feedback?: string;
  assessed_date: string;
  created_at: string;
  updated_at: string;
}

// Certificate Types
export type CertificateStatus = 'pending' | 'issued' | 'revoked';

export interface Certificate {
  id: string;
  student_id: string;
  batch_id: string;
  certificate_number: string;
  issue_date?: string;
  certificate_url?: string;
  status: CertificateStatus;
  created_at: string;
  updated_at: string;
}

// Worksheet Types
export interface Worksheet {
  id: string;
  worksheet_name: string;
  batch_id?: string;
  course_id: string;
  file_url: string;
  file_path?: string;
  extracted_text?: string;
  ai_practice_enabled: boolean;
  created_by: string;
  created_at: string;
  updated_at: string;
}

// AI Session Types
export type SessionType = 'chat_english' | 'chat_bangla' | 'voice' | 'worksheet_practice';

export interface AISession {
  id: string;
  student_id: string;
  worksheet_id?: string;
  session_type: SessionType;
  session_data?: Record<string, any>;
  fluency_score?: number;
  accuracy_score?: number;
  pronunciation_score?: number;
  feedback?: string;
  duration_minutes?: number;
  created_at: string;
  updated_at: string;
}

// Notice Types
export type NoticeType = 'announcement' | 'schedule_change' | 'reminder' | 'alert';
export type TargetType = 'all_students' | 'all_teachers' | 'specific_batch' | 'individual';

export interface Notice {
  id: string;
  title: string;
  content: string;
  notice_type: NoticeType;
  sent_by: string;
  target_type: TargetType;
  batch_id?: string;
  recipient_id?: string;
  email_sent: boolean;
  created_at: string;
  updated_at: string;
}

// Activity Log Types
export interface ActivityLog {
  id: string;
  user_id: string;
  action: string;
  entity_type?: string;
  entity_id?: string;
  old_values?: Record<string, any>;
  new_values?: Record<string, any>;
  ip_address?: string;
  created_at: string;
}

// Auth Types
export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

// Dashboard Stats
export interface DashboardStats {
  total_students: number;
  active_batches: number;
  monthly_revenue: number;
  conversion_rate: number;
  pending_payments: number;
  total_teachers: number;
}
