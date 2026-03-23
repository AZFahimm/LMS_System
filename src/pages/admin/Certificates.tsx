import React, { useEffect, useState } from 'react';
import { MainLayout } from '../../layouts/MainLayout';
import { mockDataService } from '../../services/mockDataService';
import { Certificate } from '../../types';
import { Plus, Trash2 } from 'lucide-react';

export const CertificatesPage: React.FC = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [form, setForm] = useState({
    student_id: '',
    batch_id: '',
    certificate_number: '',
    issue_date: new Date().toISOString().slice(0, 10),
    certificate_url: '',
    status: 'pending' as Certificate['status'],
  });

  useEffect(() => {
    setCertificates(mockDataService.getCertificates());
  }, []);

  const saveCertificate = () => {
    if (!form.student_id.trim() || !form.batch_id.trim() || !form.certificate_number.trim()) return;

    const newCertificate: Certificate = {
      id: `cert-${Date.now()}`,
      student_id: form.student_id,
      batch_id: form.batch_id,
      certificate_number: form.certificate_number,
      issue_date: form.issue_date,
      certificate_url: form.certificate_url || `https://example.com/certs/${form.certificate_number}.pdf`,
      status: form.status,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const updated = [newCertificate, ...certificates];
    setCertificates(updated);
    mockDataService.saveCertificates(updated);

    setForm({ student_id: '', batch_id: '', certificate_number: '', issue_date: new Date().toISOString().slice(0, 10), certificate_url: '', status: 'pending' });
  };

  const removeCertificate = (id: string) => {
    const updated = certificates.filter((c) => c.id !== id);
    setCertificates(updated);
    mockDataService.saveCertificates(updated);
  };

  return (
    <MainLayout>
      <div>
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-3xl font-bold">Certificates</h1>
          <button onClick={saveCertificate} className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg">
            <Plus className="w-4 h-4" /> Issue Certificate
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-6">
          <input
            value={form.student_id}
            onChange={(e) => setForm((s) => ({ ...s, student_id: e.target.value }))}
            placeholder="Student ID"
            className="p-2 border rounded"
          />
          <input
            value={form.batch_id}
            onChange={(e) => setForm((s) => ({ ...s, batch_id: e.target.value }))}
            placeholder="Batch ID"
            className="p-2 border rounded"
          />
          <input
            value={form.certificate_number}
            onChange={(e) => setForm((s) => ({ ...s, certificate_number: e.target.value }))}
            placeholder="Certificate number"
            className="p-2 border rounded"
          />
          <input
            type="date"
            value={form.issue_date}
            onChange={(e) => setForm((s) => ({ ...s, issue_date: e.target.value }))}
            className="p-2 border rounded"
          />
          <input
            value={form.certificate_url}
            onChange={(e) => setForm((s) => ({ ...s, certificate_url: e.target.value }))}
            placeholder="Certificate URL"
            className="p-2 border rounded"
          />
          <select
            value={form.status}
            onChange={(e) => setForm((s) => ({ ...s, status: e.target.value as Certificate['status'] }))}
            className="p-2 border rounded"
          >
            <option value="pending">Pending</option>
            <option value="issued">Issued</option>
            <option value="revoked">Revoked</option>
          </select>
        </div>

        <div className="bg-white border rounded-xl p-4 shadow-sm">
          <h2 className="text-xl font-semibold mb-3">Issued Certificates</h2>
          {certificates.length === 0 ? (
            <p className="text-gray-500">No certificates issued yet.</p>
          ) : (
            <div className="space-y-3">
              {certificates.map((certificate) => (
                <div key={certificate.id} className="border p-3 rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                  <div>
                    <p className="font-semibold">{certificate.certificate_number}</p>
                    <p className="text-sm text-gray-600">Student: {certificate.student_id}</p>
                    <p className="text-sm text-gray-600">Batch: {certificate.batch_id}</p>
                    <p className="text-sm text-gray-600">Status: {certificate.status}</p>
                    <a href={certificate.certificate_url} target="_blank" rel="noreferrer" className="text-blue-600 text-sm">View certificate</a>
                  </div>
                  <button onClick={() => removeCertificate(certificate.id)} className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-red-100 text-red-700">
                    <Trash2 className="w-4 h-4" /> Remove
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