import React, { useMemo } from 'react';
import { MainLayout } from '../../layouts/MainLayout';
import { mockDataService } from '../../services/mockDataService';
import { useUserStore } from '../../store/userStore';

export const StudentNoticesPage: React.FC = () => {
  const { user } = useUserStore();
  const notices = useMemo(() => {
    const all = mockDataService.getNotices();
    return all.filter((notice) => notice.target_type === 'all_students' || notice.target_type === 'individual');
  }, []);

  return (
    <MainLayout>
      <div>
        <h1 className="text-3xl font-bold mb-4">Notices</h1>
        {notices.length === 0 ? (
          <p className="text-gray-500">No notices at this time.</p>
        ) : (
          <div className="space-y-3">
            {notices.map((notice) => (
              <div key={notice.id} className="p-4 border rounded-lg bg-white">
                <h2 className="font-semibold">{notice.title}</h2>
                <p className="text-sm text-gray-600">Type: {notice.notice_type}</p>
                <p className="mt-2">{notice.content}</p>
                <p className="text-xs text-gray-500 mt-2">Posted by {notice.sent_by}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};