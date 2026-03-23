import { supabase } from '../supabase-config';
import { Student } from '../types';

export const studentService = {
  async getAllStudents(limit?: number) {
    let query = supabase
      .from('students')
      .select('*, user:users(*), enrollments(batch_id)');

    if (limit) {
      query = query.limit(limit);
    }

    const { data, error } = await query.order('created_at', { ascending: false });
    if (error) throw error;
    return data as Student[];
  },

  async getStudentById(studentId: string) {
    const { data, error } = await supabase
      .from('students')
      .select('*, user:users(*), enrollments(batch_id)')
      .eq('id', studentId)
      .single();

    if (error) throw error;
    return data as Student;
  },

  async getStudentsByBatch(batchId: string) {
    const { data, error } = await supabase
      .from('enrollments')
      .select('*, student:students(*, user:users(*))')
      .eq('batch_id', batchId);

    if (error) throw error;
    return data;
  },

  async createStudent(userId: string, batchId?: string) {
    const { data, error } = await supabase
      .from('students')
      .insert([{ user_id: userId, batch_id: batchId }])
      .select('*, user:users(*)')
      .single();

    if (error) throw error;
    return data as Student;
  },

  async updateStudent(studentId: string, updates: Partial<Student>) {
    const { data, error } = await supabase
      .from('students')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', studentId)
      .select('*, user:users(*)')
      .single();

    if (error) throw error;
    return data as Student;
  },

  async deleteStudent(studentId: string) {
    const { error } = await supabase
      .from('students')
      .delete()
      .eq('id', studentId);

    if (error) throw error;
  },

  async getStudentStats(studentId: string) {
    const { data, error } = await supabase
      .rpc('get_student_stats', { p_student_id: studentId });

    if (error) throw error;
    return data;
  },
};
