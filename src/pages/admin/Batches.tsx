import React, { useEffect, useState } from 'react';
import { MainLayout } from '../../layouts/MainLayout';
import { mockDataService } from '../../services/mockDataService';
import { Batch } from '../../types';
import { Plus, Trash2 } from 'lucide-react';

export const BatchesPage: React.FC = () => {
  const [batches, setBatches] = useState<Batch[]>([]);
  const [form, setForm] = useState({
    batch_name: '',
    course_id: '',
    teacher_id: '',
    class_timing: '',
    start_date: '',
    end_date: '',
    max_students: 20,
  });

  useEffect(() => {
    setBatches(mockDataService.getBatches());
  }, []);

  const addBatch = () => {
    if (!form.batch_name.trim() || !form.course_id.trim()) return;

    const newBatch: Batch = {
      id: `batch-${Date.now()}`,
      batch_name: form.batch_name,
      course_id: form.course_id,
      teacher_id: form.teacher_id || 'demo-teacher-1',
      start_date: form.start_date || new Date().toISOString().slice(0, 10),
      end_date: form.end_date || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
      class_timing: form.class_timing || '10:00 AM - 11:30 AM',
      max_students: form.max_students,
      status: 'active',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const updated = [newBatch, ...batches];
    setBatches(updated);
    mockDataService.saveBatches(updated);
    setForm({ batch_name: '', course_id: '', teacher_id: '', class_timing: '', start_date: '', end_date: '', max_students: 20 });
  };

  const deleteBatch = (id: string) => {
    const updated = batches.filter((b) => b.id !== id);
    setBatches(updated);
    mockDataService.saveBatches(updated);
  };

  return (
    <MainLayout>
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Batches</h1>
          <button onClick={addBatch} className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg">
            <Plus className="w-4 h-4" /> Create Batch
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-6">
          <input
            value={form.batch_name}
            onChange={(e) => setForm((f) => ({ ...f, batch_name: e.target.value }))}
            placeholder="Batch Name"
            className="p-2 border rounded"
          />
          <input
            value={form.course_id}
            onChange={(e) => setForm((f) => ({ ...f, course_id: e.target.value }))}
            placeholder="Course ID"
            className="p-2 border rounded"
          />
          <input
            value={form.teacher_id}
            onChange={(e) => setForm((f) => ({ ...f, teacher_id: e.target.value }))}
            placeholder="Teacher ID"
            className="p-2 border rounded"
          />
          <input
            value={form.class_timing}
            onChange={(e) => setForm((f) => ({ ...f, class_timing: e.target.value }))}
            placeholder="Class Timing"
            className="p-2 border rounded"
          />
          <input
            type="date"
            value={form.start_date}
            onChange={(e) => setForm((f) => ({ ...f, start_date: e.target.value }))}
            className="p-2 border rounded"
          />
          <input
            type="date"
            value={form.end_date}
            onChange={(e) => setForm((f) => ({ ...f, end_date: e.target.value }))}
            className="p-2 border rounded"
          />
          <input
            type="number"
            value={form.max_students}
            onChange={(e) => setForm((f) => ({ ...f, max_students: Number(e.target.value) }))}
            placeholder="Max Students"
            className="p-2 border rounded"
          />
        </div>

        <div className="bg-white border rounded-xl shadow-sm p-4">
          <h2 className="text-xl font-semibold mb-4">Batch List</h2>
          {batches.map((batch) => (
            <div key={batch.id} className="border p-3 rounded flex justify-between items-start gap-3 mb-2">
              <div>
                <p className="font-semibold">{batch.batch_name}</p>
                <p className="text-sm text-gray-600">Course: {batch.course_id} • Teacher: {batch.teacher_id}</p>
                <p className="text-sm text-gray-600">{batch.class_timing} • {batch.start_date} - {batch.end_date}</p>
              </div>
              <button
                onClick={() => deleteBatch(batch.id)}
                className="px-3 py-1.5 rounded bg-red-100 text-red-700"
              >
                <Trash2 className="w-4 h-4 inline-block" />
                <span className="ml-1">Delete</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};