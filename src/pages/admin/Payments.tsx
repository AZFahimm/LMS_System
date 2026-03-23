import React, { useEffect, useState } from 'react';
import { MainLayout } from '../../layouts/MainLayout';
import { mockDataService } from '../../services/mockDataService';
import { Payment } from '../../types';
import { Plus, Trash2 } from 'lucide-react';

export const PaymentsPage: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [form, setForm] = useState({ student_id: '', batch_id: '', amount: 0, payment_method: 'bKash', due_date: '' });

  useEffect(() => {
    setPayments(mockDataService.getPayments());
  }, []);

  const save = () => {
    if (!form.student_id || !form.amount) return;
    const newPayment: Payment = {
      id: `payment-${Date.now()}`,
      student_id: form.student_id,
      batch_id: form.batch_id,
      amount: form.amount,
      payment_date: new Date().toISOString().slice(0, 10),
      due_date: form.due_date || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
      payment_method: form.payment_method,
      payment_status: 'completed',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    const updated = [newPayment, ...payments];
    setPayments(updated);
    mockDataService.savePayments(updated);
    setForm({ student_id: '', batch_id: '', amount: 0, payment_method: 'bKash', due_date: '' });
  };

  const remove = (id: string) => {
    const filtered = payments.filter((p) => p.id !== id);
    setPayments(filtered);
    mockDataService.savePayments(filtered);
  };

  return (
    <MainLayout>
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Payments</h1>
          <button onClick={save} className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg">
            <Plus className="w-4 h-4" /> Record Payment
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 mb-6">
          <input
            value={form.student_id}
            onChange={(e) => setForm((f) => ({ ...f, student_id: e.target.value }))}
            placeholder="Student ID"
            className="p-2 border rounded"
          />
          <input
            value={form.batch_id}
            onChange={(e) => setForm((f) => ({ ...f, batch_id: e.target.value }))}
            placeholder="Batch ID"
            className="p-2 border rounded"
          />
          <input
            type="number"
            value={form.amount}
            onChange={(e) => setForm((f) => ({ ...f, amount: Number(e.target.value) }))}
            placeholder="Amount"
            className="p-2 border rounded"
          />
          <input
            value={form.due_date}
            onChange={(e) => setForm((f) => ({ ...f, due_date: e.target.value }))}
            type="date"
            className="p-2 border rounded"
          />
        </div>

        <div className="bg-white border rounded-xl shadow-sm p-4">
          <h2 className="text-xl font-semibold mb-4">Payment Records</h2>
          {payments.length === 0 ? (
            <p className="text-gray-500">No records available.</p>
          ) : (
            <div className="space-y-2">
              {payments.map((payment) => (
                <div key={payment.id} className="flex justify-between items-center border rounded p-3">
                  <div>
                    <p className="font-medium">{payment.student_id} - ৳{payment.amount}</p>
                    <p className="text-sm text-gray-600">{payment.payment_method} • {payment.payment_date} • Due {payment.due_date}</p>
                    <p className="text-sm text-gray-600">Status: {payment.payment_status}</p>
                  </div>
                  <button onClick={() => remove(payment.id)} className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-red-100 text-red-700">
                    <Trash2 className="w-4 h-4" /> Delete
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