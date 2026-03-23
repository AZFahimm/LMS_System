import { supabase } from '../supabase-config';
import { Payment } from '../types';

export const paymentService = {
  async getPaymentsByStudent(studentId: string) {
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .eq('student_id', studentId)
      .order('payment_date', { ascending: false });

    if (error) throw error;
    return data as Payment[];
  },

  async getPaymentsByBatch(batchId: string) {
    const { data, error } = await supabase
      .from('payments')
      .select('*, student:students(*, user:users(*))')
      .eq('batch_id', batchId)
      .order('payment_date', { ascending: false });

    if (error) throw error;
    return data;
  },

  async getDuePayments() {
    const { data, error } = await supabase
      .from('payments')
      .select('*, student:students(*, user:users(*))')
      .eq('payment_status', 'pending')
      .order('due_date', { ascending: true });

    if (error) throw error;
    return data;
  },

  async createPayment(payment: Omit<Payment, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('payments')
      .insert([payment])
      .select()
      .single();

    if (error) throw error;

    // Update student's total_paid
    const existingPayments = await this.getPaymentsByStudent(payment.student_id);
    const totalPaid = existingPayments.reduce((sum, p) => sum + (p.amount || 0), 0);
    
    await supabase
      .from('students')
      .update({ total_paid: totalPaid })
      .eq('id', payment.student_id);

    return data as Payment;
  },

  async updatePayment(paymentId: string, updates: Partial<Payment>) {
    const { data, error } = await supabase
      .from('payments')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', paymentId)
      .select()
      .single();

    if (error) throw error;
    return data as Payment;
  },

  async getPaymentStats(batchId?: string) {
    let query = supabase.from('payments').select('*');

    if (batchId) {
      query = query.eq('batch_id', batchId);
    }

    const { data, error } = await query;
    if (error) throw error;

    const total = data?.reduce((sum, p) => sum + (p.amount || 0), 0) || 0;
    const pending = data?.filter(p => p.payment_status === 'pending').length || 0;
    const completed = data?.filter(p => p.payment_status === 'completed').length || 0;

    return { total, pending, completed, count: data?.length || 0 };
  },

  async generateInvoice(paymentId: string) {
    // TODO: Implement PDF generation for invoices
    const { data: payment, error } = await supabase
      .from('payments')
      .select('*, student:students(*, user:users(*))')
      .eq('id', paymentId)
      .single();

    if (error) throw error;
    return payment;
  },
};
