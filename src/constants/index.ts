// App-wide constants

export const APP_NAME = 'EduCoach';
export const APP_VERSION = '1.0.0';

// API Configuration
export const API_CONFIG = {
  TIMEOUT: 30000, // 30 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
};

// Date Formats
export const DATE_FORMATS = {
  DISPLAY: 'MMM dd, yyyy',
  DISPLAY_WITH_TIME: 'MMM dd, yyyy HH:mm',
  API: 'yyyy-MM-dd',
  TIME: 'HH:mm:ss',
};

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
};

// User Roles
export const USER_ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  TEACHER: 'teacher',
  STUDENT: 'student',
  GUARDIAN: 'guardian',
} as const;

// Course Levels
export const COURSE_LEVELS = {
  BEGINNER: 'beginner',
  INTERMEDIATE: 'intermediate',
  ADVANCED: 'advanced',
} as const;

// Batch Status
export const BATCH_STATUS = {
  ACTIVE: 'active',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const;

// Student Status
export const STUDENT_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  DROPOUT: 'dropout',
  COMPLETED: 'completed',
} as const;

// Payment Status
export const PAYMENT_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
  REFUNDED: 'refunded',
} as const;

// Attendance Status
export const ATTENDANCE_STATUS = {
  PRESENT: 'present',
  ABSENT: 'absent',
  LATE: 'late',
} as const;

// Call Status (for Leads)
export const CALL_STATUS = {
  INTERESTED: 'interested',
  ADMITTED: 'admitted',
  NOT_INTERESTED: 'not_interested',
  WILL_ADMIT_LATER: 'will_admit_later',
  DID_NOT_RECEIVE: 'did_not_receive',
  COMPLAINT: 'complaint',
  OTHER: 'other',
} as const;

// Notice Types
export const NOTICE_TYPES = {
  ANNOUNCEMENT: 'announcement',
  SCHEDULE_CHANGE: 'schedule_change',
  REMINDER: 'reminder',
  ALERT: 'alert',
} as const;

// Target Types for Notices
export const TARGET_TYPES = {
  ALL_STUDENTS: 'all_students',
  ALL_TEACHERS: 'all_teachers',
  SPECIFIC_BATCH: 'specific_batch',
  INDIVIDUAL: 'individual',
} as const;

// AI Session Types
export const AI_SESSION_TYPES = {
  CHAT_ENGLISH: 'chat_english',
  CHAT_BANGLA: 'chat_bangla',
  VOICE: 'voice',
  WORKSHEET_PRACTICE: 'worksheet_practice',
} as const;

// Colors (Tailwind)
export const COLORS = {
  PRIMARY_BLUE: '#3b82f6',
  SECONDARY_RED: '#ef4444',
  SUCCESS_GREEN: '#10b981',
  WARNING_YELLOW: '#f59e0b',
  DANGER_RED: '#dc2626',
};

// Routes
export const ROUTES = {
  LOGIN: '/login',
  
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    LEADS: '/admin/leads',
    STUDENTS: '/admin/students',
    COURSES: '/admin/courses',
    BATCHES: '/admin/batches',
    PAYMENTS: '/admin/payments',
    CERTIFICATES: '/admin/certificates',
    WORKSHEETS: '/admin/worksheets',
    NOTICES: '/admin/notices',
    REPORTS: '/admin/reports',
    SETTINGS: '/admin/settings',
  },
  
  TEACHER: {
    DASHBOARD: '/teacher/dashboard',
    BATCHES: '/teacher/batches',
    ATTENDANCE: '/teacher/attendance',
    REPORTS: '/teacher/reports',
    WORKSHEETS: '/teacher/worksheets',
    NOTICES: '/teacher/notices',
  },
  
  STUDENT: {
    DASHBOARD: '/student/dashboard',
    COURSE: '/student/course',
    SCHEDULE: '/student/schedule',
    PAYMENT: '/student/payment',
    PROGRESS: '/student/progress',
    AI_PRACTICE: '/student/ai-practice',
    NOTICES: '/student/notices',
  },
};

// Mock Data for Development
export const MOCK_DATA = {
  STUDENTS: [
    { id: '1', name: 'Ahmad Hassan', email: 'ahmad@example.com', phone: '+8801700000001' },
    { id: '2', name: 'Fatima Khan', email: 'fatima@example.com', phone: '+8801700000002' },
    { id: '3', name: 'Mohammed Ali', email: 'ali@example.com', phone: '+8801700000003' },
  ],
  
  COURSES: [
    { id: '1', name: 'Beginner English', level: 'beginner', duration: 12 },
    { id: '2', name: 'Intermediate English', level: 'intermediate', duration: 16 },
    { id: '3', name: 'Advanced English', level: 'advanced', duration: 20 },
  ],
};
