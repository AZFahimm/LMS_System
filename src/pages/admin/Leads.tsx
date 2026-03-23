import React, { useEffect, useState } from 'react';
import { MainLayout } from '../../layouts/MainLayout';
import { mockDataService } from '../../services/mockDataService';
import { Lead, CallStatus } from '../../types';
import { Plus, Trash2, Edit } from 'lucide-react';

const initialLead: Omit<Lead, 'id' | 'created_at' | 'updated_at'> = {
  name: '',
  email: '',
  phone: '',
  call_status: 'interested',
  comments: '',
  interested_course: '',
  source: '',
  converted_student_id: '',
};

const callStatusOptions: CallStatus[] = [
  'interested',
  'admitted',
  'not_interested',
  'will_admit_later',
  'did_not_receive',
  'complaint',
  'other',
];

export const LeadsPage: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [formState, setFormState] = useState(initialLead);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    setLeads(mockDataService.getLeads());
  }, []);

  const save = () => {
    if (!formState.name.trim() || !formState.phone.trim()) return;

    if (editingId) {
      const updated = leads.map((lead) =>
        lead.id === editingId
          ? {
              ...lead,
              ...formState,
              updated_at: new Date().toISOString(),
            }
          : lead
      );
      setLeads(updated);
      mockDataService.saveLeads(updated);
    } else {
      const newLead: Lead = {
        ...formState,
        id: `lead-${Date.now()}`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      const updated = [newLead, ...leads];
      setLeads(updated);
      mockDataService.saveLeads(updated);
    }

    setFormState(initialLead);
    setEditingId(null);
  };

  const remove = (id: string) => {
    const updated = leads.filter((lead) => lead.id !== id);
    setLeads(updated);
    mockDataService.saveLeads(updated);
  };

  const edit = (lead: Lead) => {
    setEditingId(lead.id);
    setFormState({
      name: lead.name,
      email: lead.email || '',
      phone: lead.phone || '',
      call_status: lead.call_status || 'interested',
      comments: lead.comments || '',
      interested_course: lead.interested_course || '',
      source: lead.source || '',
      converted_student_id: lead.converted_student_id || '',
    });
  };

  return (
    <MainLayout>
      <div>
        <div className="flex flex-wrap justify-between gap-4 mb-6">
          <h1 className="text-3xl font-bold">Manage Leads</h1>
          <button
            onClick={save}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            <Plus className="w-4 h-4" />
            {editingId ? 'Update Lead' : 'Add Lead'}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8 p-4 bg-white rounded-xl shadow-sm border">
          <div>
            <label className="text-sm font-semibold">Name</label>
            <input
              value={formState.name}
              onChange={(e) => setFormState({ ...formState, name: e.target.value })}
              className="w-full mt-1 p-2 border rounded" />
            <label className="text-sm font-semibold mt-2 block">Phone</label>
            <input
              value={formState.phone}
              onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
              className="w-full mt-1 p-2 border rounded" />
            <label className="text-sm font-semibold mt-2 block">Email</label>
            <input
              value={formState.email}
              onChange={(e) => setFormState({ ...formState, email: e.target.value })}
              className="w-full mt-1 p-2 border rounded" />
          </div>
          <div>
            <label className="text-sm font-semibold">Course Interest</label>
            <input
              value={formState.interested_course}
              onChange={(e) => setFormState({ ...formState, interested_course: e.target.value })}
              className="w-full mt-1 p-2 border rounded" />
            <label className="text-sm font-semibold mt-2 block">Source</label>
            <input
              value={formState.source}
              onChange={(e) => setFormState({ ...formState, source: e.target.value })}
              className="w-full mt-1 p-2 border rounded" />
            <label className="text-sm font-semibold mt-2 block">Call Status</label>
            <select
              value={formState.call_status}
              onChange={(e) => setFormState({ ...formState, call_status: e.target.value as CallStatus })}
              className="w-full mt-1 p-2 border rounded"
            >
              {callStatusOptions.map((status) => (
                <option key={status} value={status}>
                  {status.replace('_', ' ')}
                </option>
              ))}
            </select>
            <label className="text-sm font-semibold mt-2 block">Comments</label>
            <textarea
              value={formState.comments}
              onChange={(e) => setFormState({ ...formState, comments: e.target.value })}
              className="w-full mt-1 p-2 border rounded"
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-4">
          <h2 className="text-lg font-semibold mb-3">Leads List</h2>
          {leads.length === 0 ? (
            <p className="text-gray-500">No leads yet.</p>
          ) : (
            <div className="space-y-3">
              {leads.map((lead) => (
                <div key={lead.id} className="p-3 border rounded-lg flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div>
                    <p className="font-semibold">{lead.name} ({lead.phone})</p>
                    <p className="text-sm text-gray-600">{lead.email || 'No email'}</p>
                    <p className="text-sm">Course: {lead.interested_course || 'Any'}</p>
                    <p className="text-sm">Status: {lead.call_status}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => edit(lead)}
                      className="flex items-center gap-1 px-3 py-1.5 text-sm bg-yellow-100 text-yellow-800 rounded"
                    >
                      <Edit className="w-4 h-4" /> Edit
                    </button>
                    <button
                      onClick={() => remove(lead.id)}
                      className="flex items-center gap-1 px-3 py-1.5 text-sm bg-red-100 text-red-800 rounded"
                    >
                      <Trash2 className="w-4 h-4" /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};