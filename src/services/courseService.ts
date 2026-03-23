import { supabase } from '../supabase-config';
import { Course, Batch, Enrollment } from '../types';

// Course Service
export const courseService = {
  async getAllCourses() {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .eq('status', 'active')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Course[];
  },

  async getCourseById(courseId: string) {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .eq('id', courseId)
      .single();

    if (error) throw error;
    return data as Course;
  },

  async createCourse(course: Omit<Course, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('courses')
      .insert([course])
      .select()
      .single();

    if (error) throw error;
    return data as Course;
  },

  async updateCourse(courseId: string, updates: Partial<Course>) {
    const { data, error } = await supabase
      .from('courses')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', courseId)
      .select()
      .single();

    if (error) throw error;
    return data as Course;
  },

  async deleteCourse(courseId: string) {
    const { error } = await supabase
      .from('courses')
      .delete()
      .eq('id', courseId);

    if (error) throw error;
  },
};

// Batch Service
export const batchService = {
  async getAllBatches() {
    const { data, error } = await supabase
      .from('batches')
      .select('*, course:courses(*), teacher:teachers(*, user:users(*))')
      .eq('status', 'active')
      .order('start_date', { ascending: true });

    if (error) throw error;
    return data as Batch[];
  },

  async getBatchById(batchId: string) {
    const { data, error } = await supabase
      .from('batches')
      .select('*, course:courses(*), teacher:teachers(*, user:users(*))')
      .eq('id', batchId)
      .single();

    if (error) throw error;
    return data as Batch;
  },

  async getBatchesByTeacher(teacherId: string) {
    const { data, error } = await supabase
      .from('batches')
      .select('*, course:courses(*)')
      .eq('teacher_id', teacherId)
      .order('start_date', { ascending: true });

    if (error) throw error;
    return data as Batch[];
  },

  async createBatch(batch: Omit<Batch, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('batches')
      .insert([batch])
      .select('*, course:courses(*), teacher:teachers(*)')
      .single();

    if (error) throw error;
    return data as Batch;
  },

  async updateBatch(batchId: string, updates: Partial<Batch>) {
    const { data, error } = await supabase
      .from('batches')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', batchId)
      .select('*, course:courses(*), teacher:teachers(*)')
      .single();

    if (error) throw error;
    return data as Batch;
  },

  async deleteBatch(batchId: string) {
    const { error } = await supabase
      .from('batches')
      .delete()
      .eq('id', batchId);

    if (error) throw error;
  },

  async enrollStudent(studentId: string, batchId: string) {
    const { data, error } = await supabase
      .from('enrollments')
      .insert([{ student_id: studentId, batch_id: batchId }])
      .select()
      .single();

    if (error) throw error;
    return data as Enrollment;
  },

  async getEnrollments(batchId: string) {
    const { data, error } = await supabase
      .from('enrollments')
      .select('*, student:students(*, user:users(*))')
      .eq('batch_id', batchId);

    if (error) throw error;
    return data;
  },
};
