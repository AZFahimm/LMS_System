import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import { authService } from '../supabase-config';
import { useUserStore } from '../store/userStore';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, setUser, initMockUser } = useUserStore();

  useEffect(() => {
    initMockUser();
  }, [initMockUser]);

  useEffect(() => {
    if (!user) return;

    if (user.role === 'admin' || user.role === 'super_admin') {
      navigate('/admin/dashboard');
    } else if (user.role === 'teacher') {
      navigate('/teacher/dashboard');
    } else if (user.role === 'student') {
      navigate('/student/dashboard');
    }
  }, [user, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Dev mode: Allow demo credentials
      if (email === 'admin@example.com' && password === 'demo123') {
        // Mock admin user
        const mockAdmin = {
          id: 'demo-admin-1',
          email: 'admin@example.com',
          full_name: 'Demo Admin',
          role: 'admin',
          is_active: true,
        };
        localStorage.setItem('mockUser', JSON.stringify(mockAdmin));
        setUser(mockAdmin);
        navigate('/admin/dashboard');
        return;
      }

      if (email === 'teacher@example.com' && password === 'demo123') {
        // Mock teacher user
        const mockTeacher = {
          id: 'demo-teacher-1',
          email: 'teacher@example.com',
          full_name: 'Demo Teacher',
          role: 'teacher',
          is_active: true,
        };
        localStorage.setItem('mockUser', JSON.stringify(mockTeacher));
        setUser(mockTeacher);
        navigate('/teacher/dashboard');
        return;
      }

      if (email === 'student@example.com' && password === 'demo123') {
        // Mock student user
        const mockStudent = {
          id: 'demo-student-1',
          email: 'student@example.com',
          full_name: 'Demo Student',
          role: 'student',
          is_active: true,
        };
        localStorage.setItem('mockUser', JSON.stringify(mockStudent));
        setUser(mockStudent);
        navigate('/student/dashboard');
        return;
      }

      if (email === 'super_admin@example.com' && password === 'demo123') {
        // Mock super admin user
        const mockSuperAdmin = {
          id: 'demo-super-admin-1',
          email: 'super_admin@example.com',
          full_name: 'Demo Super Admin',
          role: 'super_admin',
          is_active: true,
        };
        localStorage.setItem('mockUser', JSON.stringify(mockSuperAdmin));
        setUser(mockSuperAdmin);
        navigate('/admin/dashboard');
        return;
      }

      // Real Supabase authentication
      const { error: authError } = await authService.signIn(email, password);
      if (authError) throw authError;

      // Fetch user details from users table
      // TODO: Implement after API service is ready
      
      navigate('/admin/dashboard');
    } catch (err: any) {
      setError(err.message || 'Login failed. Use demo@example.com for testing');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600 mb-2">EduCoach</h1>
          <p className="text-gray-600">Spoken English Coaching Center</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-center font-semibold text-gray-700 mb-3">Demo Credentials (Dev Mode):</p>
          <div className="space-y-2 text-sm">
            <div className="bg-yellow-50 p-2 rounded">
              <p><span className="font-medium">Super Admin:</span> super_admin@example.com / demo123</p>
            </div>
            <div className="bg-blue-50 p-2 rounded">
              <p><span className="font-medium">Admin:</span> admin@example.com / demo123</p>
            </div>
            <div className="bg-green-50 p-2 rounded">
              <p><span className="font-medium">Teacher:</span> teacher@example.com / demo123</p>
            </div>
            <div className="bg-purple-50 p-2 rounded">
              <p><span className="font-medium">Student:</span> student@example.com / demo123</p>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-4">For real authentication, set up Supabase: docs/SUPABASE_SETUP.md</p>
        </div>
      </div>
    </div>
  );
};
