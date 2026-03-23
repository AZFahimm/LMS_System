import React, { useEffect, useState } from 'react';
import { MainLayout } from '../../layouts/MainLayout';
import { mockDataService } from '../../services/mockDataService';
import { Worksheet } from '../../types';
import { Plus, Trash2 } from 'lucide-react';

export const WorksheetsPage: React.FC = () => {
  const [worksheets, setWorksheets] = useState<Worksheet[]>([]);
  const [form, setForm] = useState({
    worksheet_name: '',
    batch_id: '',
    course_id: '',
    file_url: '',
    extracted_text: '',
    ai_practice_enabled: true,
  });

  useEffect(() => {
    setWorksheets(mockDataService.getWorksheets());
  }, []);

  const saveWorksheet = () => {
    if (!form.worksheet_name.trim()) return;

    const item: Worksheet = {
      id: `worksheet-${Date.now()}`,
      worksheet_name: form.worksheet_name,
      batch_id: form.batch_id,
      course_id: form.course_id,
      file_url: form.file_url || 'https://example.com/worksheets/default.pdf',
      extracted_text: form.extracted_text,
      ai_practice_enabled: form.ai_practice_enabled,
      created_by: 'demo-admin-1',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const updated = [item, ...worksheets];
    setWorksheets(updated);
    mockDataService.saveWorksheets(updated);

    setForm({ worksheet_name: '', batch_id: '', course_id: '', file_url: '', extracted_text: '', ai_practice_enabled: true });
  };

  const removeWorksheet = (id: string) => {
    const updated = worksheets.filter((w) => w.id !== id);
    setWorksheets(updated);
    mockDataService.saveWorksheets(updated);
  };

  return (
    <MainLayout>
      <div>
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-3xl font-bold">Worksheets</h1>
          <button onClick={saveWorksheet} className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg">
            <Plus className="w-4 h-4" /> Save Worksheet
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-6">
          <input
            value={form.worksheet_name}
            onChange={(e) => setForm((s) => ({ ...s, worksheet_name: e.target.value }))}
            placeholder="Worksheet Name"
            className="p-2 border rounded"
          />
          <input
            value={form.batch_id}
            onChange={(e) => setForm((s) => ({ ...s, batch_id: e.target.value }))}
            placeholder="Batch ID"
            className="p-2 border rounded"
          />
          <input
            value={form.course_id}
            onChange={(e) => setForm((s) => ({ ...s, course_id: e.target.value }))}
            placeholder="Course ID"
            className="p-2 border rounded"
          />
          <input
            value={form.file_url}
            onChange={(e) => setForm((s) => ({ ...s, file_url: e.target.value }))}
            placeholder="Worksheet URL"
            className="p-2 border rounded"
          />
          <textarea
            value={form.extracted_text}
            onChange={(e) => setForm((s) => ({ ...s, extracted_text: e.target.value }))}
            placeholder="Extracted text / instructions"
            className="p-2 border rounded col-span-2"
          />
          <label className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.ai_practice_enabled}
              onChange={(e) => setForm((s) => ({ ...s, ai_practice_enabled: e.target.checked }))}
            />
            AI Practice Enabled
          </label>
        </div>

        <div className="bg-white border rounded-xl p-4 shadow-sm">
          <h2 className="text-xl font-semibold mb-3">Worksheet Library</h2>
          {worksheets.length === 0 ? (
            <p className="text-gray-500">No worksheets yet.</p>
          ) : (
            <div className="space-y-3">
              {worksheets.map((w) => (
                <div key={w.id} className="border p-3 rounded-lg flex justify-between items-start gap-3">
                  <div>
                    <p className="font-semibold">{w.worksheet_name}</p>
                    <p className="text-sm text-gray-600">Batch: {w.batch_id} | Course: {w.course_id} | AI: {w.ai_practice_enabled ? 'Yes' : 'No'}</p>
                    <a href={w.file_url} target="_blank" rel="noreferrer" className="text-blue-600 text-sm">View file</a>
                  </div>
                  <button onClick={() => removeWorksheet(w.id)} className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-red-100 text-red-700">
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