import React, { useState } from 'react';
import { MainLayout } from '../../layouts/MainLayout';

export const StudentAIPracticePage: React.FC = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<{ fluency: number; pronunciation: number; accuracy: number; feedback: string } | null>(null);

  const runPractice = () => {
    if (!input.trim()) return;
    const base = Math.min(100, Math.max(20, input.length % 100 + 50));
    setResult({
      fluency: Math.round(base),
      pronunciation: Math.max(40, Math.round(base - 5)),
      accuracy: Math.max(40, Math.round(base - 8)),
      feedback: 'Good pace. Work on sentence construction and pronunciation for clearer speech.',
    });
  };

  return (
    <MainLayout>
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">AI Practice</h1>
        <p className="text-gray-600">Enter a sentence or paragraph and evaluate your spoken English.</p>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={5}
          className="w-full p-3 border rounded-lg"
          placeholder="Type your practice text here..."
        />
        <button onClick={runPractice} className="px-5 py-2 bg-blue-600 text-white rounded-lg">
          Evaluate
        </button>

        {result && (
          <div className="bg-white p-4 rounded-xl border shadow-sm">
            <h2 className="text-xl font-semibold mb-2">Result</h2>
            <p>Fluency: {result.fluency}%</p>
            <p>Pronunciation: {result.pronunciation}%</p>
            <p>Accuracy: {result.accuracy}%</p>
            <p className="mt-2 text-gray-700">Feedback: {result.feedback}</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};