import React, { useMemo, useState } from 'react';
import { MainLayout } from '../../layouts/MainLayout';
import { useUserStore } from '../../store/userStore';
import { mockDataService } from '../../services/mockDataService';

export const StudentPaymentPage: React.FC = () => {
  const { user } = useUserStore();
  const student = useMemo(() => mockDataService.getStudents().find((s) => s.user_id === user?.id), [user]);
  const payments = useMemo(() => mockDataService.getPayments().filter((p) => p.student_id === student?.id), [student]);
  const [amount, setAmount] = useState(0);

  const makePayment = () => {
    if (!student || amount <= 0) return;
    const newPayment = {
      id: `payment-${Date.now()}`,
      student_id: student.id,
      batch_id: student.batch_id || '',
      amount,
      payment_date: new Date().toISOString().slice(0, 10),
      due_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
      payment_method: 'bKash',
      payment_status: 'completed',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    const updated = [newPayment, ...mockDataService.getPayments()];
    mockDataService.savePayments(updated);
    setAmount(0);
  };

  return (
    <MainLayout>
      <div>
        <h1 className="text-3xl font-bold mb-4">Payment</h1>
        {!student ? (
          <p className="text-gray-500">No student account found.</p>
        ) : (
          <>
            <p className="mb-3">Outstanding due: ৳{student.total_due - student.total_paid}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
              <input
                type="number"
                className="p-2 border rounded"
                value={amount}
                min={0}
                onChange={(e) => setAmount(Number(e.target.value))}
                placeholder="Amount"
              />
              <button
                onClick={makePayment}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Pay
              </button>
            </div>

            <div className="bg-white border rounded-xl p-4 shadow-sm">
              <h2 className="text-xl font-semibold mb-3">Payment History</h2>
              {payments.length === 0 ? (
                <p className="text-gray-500">No payment history yet.</p>
              ) : (
                <ul className="space-y-2">
                  {payments.map((p) => (
                    <li key={p.id} className="border rounded p-3">
                      <p>Amount: ৳{p.amount} ({p.payment_date})</p>
                      <p className="text-sm text-gray-600">Status: {p.payment_status}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
};