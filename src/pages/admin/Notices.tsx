import React, { useEffect, useState } from 'react';
import { MainLayout } from '../../layouts/MainLayout';
import { mockDataService } from '../../services/mockDataService';
import { Notice, NoticeType, TargetType } from '../../types';
import { Trash2 } from 'lucide-react';

const noticeTypes: NoticeType[] = ['announcement', 'schedule_change', 'reminder', 'alert'];
const targetTypes: TargetType[] = ['all_students', 'all_teachers', 'specific_batch', 'individual'];

export const NoticesPage: React.FC<{ canEdit?: boolean }> = ({ canEdit = true }) => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [form, setForm] = useState({
    title: '',
    content: '',
    notice_type: 'announcement' as NoticeType,
    target_type: 'all_students' as TargetType,
    batch_id: '',
    recipient_id: '',
  });

  useEffect(() => {
    setNotices(mockDataService.getNotices());
  }, []);

  const saveNotice = () => {
    if (!form.title.trim() || !form.content.trim()) return;

    const newNotice: Notice = {
      id: `notice-${Date.now()}`,
      title: form.title,
      content: form.content,
      notice_type: form.notice_type,
      sent_by: 'System',
      target_type: form.target_type,
      batch_id: form.target_type === 'specific_batch' ? form.batch_id : undefined,
      recipient_id: form.target_type === 'individual' ? form.recipient_id : undefined,
      email_sent: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const updated = [newNotice, ...notices];
    setNotices(updated);
    mockDataService.saveNotices(updated);

    setForm({ title: '', content: '', notice_type: 'announcement', target_type: 'all_students', batch_id: '', recipient_id: '' });
  };

  const deleteNotice = (id: string) => {
    const updated = notices.filter((notice) => notice.id !== id);
    setNotices(updated);
    mockDataService.saveNotices(updated);
  };

  return (
    <MainLayout>
      <div>
        <div className="flex flex-wrap justify-between gap-4 mb-6">
          <h1 className="text-3xl font-bold">Notices</h1>
          {canEdit && (
            <p className="text-sm text-gray-500">Create notices for students/teachers/batches.</p>
          )}
        </div>

        {canEdit && (
          <div className="bg-white border rounded-xl shadow-sm p-4 mb-6">
            <h2 className="font-semibold mb-3">Create Notice</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              <input
                className="border p-2 rounded"
                placeholder="Title"
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              />
              <textarea
                className="border p-2 rounded col-span-1 lg:col-span-2"
                rows={4}
                placeholder="Content"
                value={form.content}
                onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
              />
              <select
                className="border p-2 rounded"
                value={form.notice_type}
                onChange={(e) => setForm((f) => ({ ...f, notice_type: e.target.value as NoticeType }))}
              >
                {noticeTypes.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              <select
                className="border p-2 rounded"
                value={form.target_type}
                onChange={(e) => setForm((f) => ({ ...f, target_type: e.target.value as TargetType }))}
              >
                {targetTypes.map((t) => (
                  <option key={t} value={t}>{t.replace('_', ' ')}</option>
                ))}
              </select>
              {form.target_type === 'specific_batch' && (
                <input
                  className="border p-2 rounded"
                  placeholder="Batch ID"
                  value={form.batch_id}
                  onChange={(e) => setForm((f) => ({ ...f, batch_id: e.target.value }))}
                />
              )}
              {form.target_type === 'individual' && (
                <input
                  className="border p-2 rounded"
                  placeholder="Recipient User ID"
                  value={form.recipient_id}
                  onChange={(e) => setForm((f) => ({ ...f, recipient_id: e.target.value }))}
                />
              )}
            </div>
            <button onClick={saveNotice} className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg">
              Publish Notice
            </button>
          </div>
        )}

        <div className="bg-white border rounded-xl shadow-sm p-4">
          <h2 className="text-xl font-semibold mb-3">Existing Notices</h2>
          {notices.length === 0 ? (
            <p className="text-gray-500">No notices posted yet.</p>
          ) : (
            <div className="space-y-3">
              {notices.map((notice) => (
                <div key={notice.id} className="p-3 border rounded-lg">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <p className="font-semibold">{notice.title}</p>
                      <p className="text-sm text-gray-600">{notice.notice_type} • {notice.target_type}</p>
                      <p className="text-sm text-gray-600">{new Date(notice.created_at).toLocaleString()}</p>
                    </div>
                    {canEdit && (
                      <button onClick={() => deleteNotice(notice.id)} className="inline-flex items-center gap-1 px-3 py-1.5 text-sm text-red-700 bg-red-100 rounded">
                        <Trash2 className="w-4 h-4" /> Delete
                      </button>
                    )}
                  </div>
                  <p className="mt-2 text-gray-700">{notice.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};