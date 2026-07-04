'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { toast } from 'sonner';

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(1, 'Password required'),
  rememberMe: z.boolean().optional(),
});
type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  const { login, token } = useAuthStore();
  const router = useRouter();
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => { if (token) router.replace('/'); }, [token, router]);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '', rememberMe: false },
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      await login(data.email, data.password, data.rememberMe);
      toast.success('Welcome back!');
      router.replace('/');
    } catch (err: any) {
      toast.error(err?.response?.data?.message ?? 'Login failed');
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--bg)' }}>
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-3xl opacity-20"
          style={{ background: 'var(--accent)' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm relative z-10"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex w-14 h-14 rounded-2xl items-center justify-center mb-4"
            style={{ background: 'var(--accent-bg)', border: '1px solid var(--accent-border)' }}>
            <span className="font-bold text-2xl" style={{ color: 'var(--accent-2)' }}>A</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--text-1)' }}>ArjunOS Admin</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-3)' }}>Sign in to your dashboard</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="glass p-6 space-y-4">
          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--text-3)' }}>Email</label>
            <div className="relative">
              <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-3)' }} />
              <input
                id="login-email"
                type="email"
                {...register('email')}
                placeholder="admin@arjun.dev"
                className="w-full pl-9 pr-4 py-2.5 text-sm rounded-lg outline-none transition-all"
                style={{ background: 'var(--bg-2)', border: `1px solid ${errors.email ? 'var(--red)' : 'var(--border)'}`, color: 'var(--text-1)' }}
              />
            </div>
            {errors.email && <p className="text-xs" style={{ color: 'var(--red)' }}>{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--text-3)' }}>Password</label>
            <div className="relative">
              <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-3)' }} />
              <input
                id="login-password"
                type={showPw ? 'text' : 'password'}
                {...register('password')}
                placeholder="••••••••"
                className="w-full pl-9 pr-10 py-2.5 text-sm rounded-lg outline-none transition-all"
                style={{ background: 'var(--bg-2)', border: `1px solid ${errors.password ? 'var(--red)' : 'var(--border)'}`, color: 'var(--text-1)' }}
              />
              <button type="button" onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                style={{ color: 'var(--text-3)' }}>
                {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
            {errors.password && <p className="text-xs" style={{ color: 'var(--red)' }}>{errors.password.message}</p>}
          </div>

          {/* Remember me */}
          <label className="flex items-center gap-2.5 cursor-pointer">
            <input id="remember-me" type="checkbox" {...register('rememberMe')}
              className="w-4 h-4 rounded" style={{ accentColor: 'var(--accent)' }} />
            <span className="text-sm" style={{ color: 'var(--text-2)' }}>Remember me for 7 days</span>
          </label>

          <button id="login-submit" type="submit" disabled={loading}
            className="w-full py-2.5 rounded-lg text-sm font-semibold text-white transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            style={{ background: loading ? 'var(--accent)' : 'var(--accent)' }}
            onMouseEnter={e => !loading && ((e.currentTarget as HTMLElement).style.opacity = '0.9')}
            onMouseLeave={e => !loading && ((e.currentTarget as HTMLElement).style.opacity = '1')}
          >
            {loading ? <><Loader2 size={15} className="animate-spin" />Signing in…</> : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-xs mt-6" style={{ color: 'var(--text-3)' }}>
          ArjunOS Portfolio · {new Date().getFullYear()}
        </p>
      </motion.div>
    </div>
  );
}
