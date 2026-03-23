# Implementation Guide

## Architecture Overview

```
┌─────────────────────────────────────────────┐
│           React Frontend (Vite)             │
│  (Components, Pages, Layouts, Hooks)        │
└────────────────┬────────────────────────────┘
                 │
          Zustand Store
          (State Management)
                 │
      ┌──────────┴──────────┐
      │                     │
   Services Layer     React Router
   (API Calls)        (Navigation)
      │                     │
      └──────────┬──────────┘
                 │
      Supabase JavaScript SDK
      ├─ Auth (Email/Password)
      ├─ Database (PostgreSQL)
      ├─ Storage (Files)
      └─ Realtime Updates
                 │
      ┌──────────┴──────────┐
      │                     │
   PostgreSQL Database   Storage Buckets
   (Tables, Functions)   (PDFs, Certs)
```

## Development Workflow

### 1. Add New Page

```typescript
// src/pages/admin/Students.tsx
import React, { useEffect, useState } from 'react';
import { MainLayout } from '../../layouts/MainLayout';
import { Student } from '../../types';
import { studentService } from '../../services/studentService';

export const StudentsPage: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const data = await studentService.getAllStudents();
      setStudents(data);
    } catch (error) {
      console.error('Failed to fetch students:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div>
        <h1 className="text-3xl font-bold mb-6">Students</h1>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {students.map((student) => (
              <div key={student.id} className="card">
                <p>{student.user?.full_name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};
```

### 2. Add New Service

```typescript
// src/services/studentService.ts
import { supabase } from '../lib/supabase';
import { Student } from '../types';

export const studentService = {
  async getAllStudents() {
    const { data, error } = await supabase
      .from('students')
      .select('*, user:users(*)')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Student[];
  },

  async getStudentById(id: string) {
    const { data, error } = await supabase
      .from('students')
      .select('*, user:users(*)')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as Student;
  },

  async createStudent(student: Omit<Student, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('students')
      .insert([student])
      .select()
      .single();

    if (error) throw error;
    return data as Student;
  },
};
```

### 3. Add Custom Hook

```typescript
// src/hooks/useStudents.ts
import { useState, useEffect } from 'react';
import { Student } from '../types';
import { studentService } from '../services/studentService';

export const useStudents = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const data = await studentService.getAllStudents();
      setStudents(data);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return { students, loading, error, refetch: fetchStudents };
};
```

### 4. Add Component

```typescript
// src/components/admin/StudentCard.tsx
import React from 'react';
import { Student } from '../../types';
import { Edit, Trash2 } from 'lucide-react';

interface Props {
  student: Student;
  onEdit: (student: Student) => void;
  onDelete: (id: string) => void;
}

export const StudentCard: React.FC<Props> = ({ student, onEdit, onDelete }) => {
  return (
    <div className="card flex justify-between items-center">
      <div>
        <h3 className="font-semibold text-gray-900">{student.user?.full_name}</h3>
        <p className="text-sm text-gray-600">{student.user?.email}</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onEdit(student)}
          className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
        >
          <Edit className="w-5 h-5 text-blue-600" />
        </button>
        <button
          onClick={() => onDelete(student.id)}
          className="p-2 hover:bg-red-100 rounded-lg transition-colors"
        >
          <Trash2 className="w-5 h-5 text-red-600" />
        </button>
      </div>
    </div>
  );
};
```

## Common Tasks

### Fetch Data from Database

```typescript
const { data, error } = await supabase
  .from('students')
  .select('*')
  .eq('batch_id', batchId);

if (error) throw error;
```

### Insert Data

```typescript
const { data, error } = await supabase
  .from('students')
  .insert([{ user_id, batch_id, ... }])
  .select();

if (error) throw error;
```

### Update Data

```typescript
const { data, error } = await supabase
  .from('students')
  .update({ status: 'inactive' })
  .eq('id', studentId)
  .select();

if (error) throw error;
```

### Delete Data

```typescript
const { error } = await supabase
  .from('students')
  .delete()
  .eq('id', studentId);

if (error) throw error;
```

### Real-time Subscriptions

```typescript
supabase
  .from('students')
  .on('*', payload => {
    console.log('Change received!', payload);
  })
  .subscribe();
```

### Upload Files

```typescript
const { data, error } = await supabase
  .storage
  .from('worksheets')
  .upload(`path/to/file.pdf`, file);

if (error) throw error;
```

### Handle Pagination

```typescript
const pageSize = 10;
const page = 0;

const { data, error } = await supabase
  .from('students')
  .select('*')
  .range(page * pageSize, (page + 1) * pageSize - 1);
```

## Testing Changes

### Run Dev Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Type Checking

```bash
npm run type-check
```

## Debugging Tips

### Enable React DevTools
Install React DevTools browser extension

### Check Network Requests
- Open DevTools Network tab
- Look for Supabase API calls
- Check response status and data

### Console Logging
```typescript
console.log('Data:', data);
console.error('Error:', error);
```

### Zustand DevTools
Install `zustand-devtools` for state debugging

## Performance Optimization

1. **Use React.memo()** for frequently re-rendered components
2. **Implement pagination** for large datasets
3. **Cache API responses** using custom hooks
4. **Lazy load images** using `loading="lazy"`
5. **Code split pages** using React.lazy()

## Code Review Checklist

- [ ] No console.log() left in code
- [ ] Proper error handling
- [ ] TypeScript types defined
- [ ] Mobile responsive
- [ ] Accessibility considered (alt text, labels)
- [ ] Performance optimized
- [ ] Follows project structure
- [ ] Variables named meaningfully

## Deployment Checklist

- [ ] Environment variables configured
- [ ] Database migrations run
- [ ] Tests passing
- [ ] No TypeScript errors
- [ ] Production build successful
- [ ] Environment variables set in hosting
- [ ] HTTPS enabled
- [ ] CORS configured
