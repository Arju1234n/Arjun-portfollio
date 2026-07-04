'use client';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { User, Lock, Save } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import api from '@/lib/api';
import { Button, Input, PageHeader } from '@/components/ui';

const pwSchema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(8, 'At least 8 characters'),
  confirmPassword: z.string(),
}).refine(d => d.newPassword === d.confirmPassword, { message: "Passwords don't match", path: ['confirmPassword'] });

type PwForm = z.infer<typeof pwSchema>;

export default function ProfilePage() {
  const { user, fetchMe } = useAuthStore();
  const [name, setName] = useState(user?.name ?? '');
  const [savingProfile, setSavingProfile] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<PwForm>({ resolver: zodResolver(pwSchema) });

  const changePwMut = useMutation({
    mutationFn: (d: PwForm) => api.patch('/auth/password', { currentPassword: d.currentPassword, newPassword: d.newPassword }),
    onSuccess: () => { toast.success('Password changed. All sessions invalidated.'); reset(); },
    onError: (e: any) => toast.error(e?.response?.data?.message ?? 'Failed'),
  });

  const saveProfile = async () => {
    setSavingProfile(true);
    try {
      await api.patch('/auth/profile', { name });
      await fetchMe();
      toast.success('Profile updated');
    } catch (e: any) {
      toast.error(e?.response?.data?.message ?? 'Failed');
    } finally { setSavingProfile(false); }
  };

  return (
    <div className="space-y-6 max-w-xl">
      <PageHeader title="My Profile" description="Manage your admin account" />

      {/* Profile */}
      <div className="glass p-6 space-y-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold"
            style={{ background: 'var(--accent-bg)', color: 'var(--accent-2)', border: '1px solid var(--accent-border)' }}>
            {user?.name?.[0]?.toUpperCase() ?? 'A'}
          </div>
          <div>
            <p className="text-sm font-semibold" style={{ color: 'var(--text-1)' }}>{user?.name}</p>
            <p className="text-xs capitalize" style={{ color: 'var(--text-3)' }}>{user?.role?.replace('_', ' ')}</p>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--text-3)' }}>Display Name</label>
          <div className="relative">
            <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-3)' }} />
            <input value={name} onChange={e => setName(e.target.value)} className="w-full pl-9 pr-4 py-2.5 text-sm rounded-lg outline-none"
              style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', color: 'var(--text-1)' }} />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--text-3)' }}>Email (read-only)</label>
          <input value={user?.email ?? ''} disabled className="w-full px-3 py-2.5 text-sm rounded-lg opacity-50"
            style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', color: 'var(--text-1)' }} />
        </div>

        <Button onClick={saveProfile} loading={savingProfile} icon={<Save size={13} />} id="save-profile-btn">Save Profile</Button>
      </div>

      {/* Change password */}
      <form onSubmit={handleSubmit(d => changePwMut.mutate(d))} className="glass p-6 space-y-4">
        <h2 className="text-sm font-semibold" style={{ color: 'var(--text-1)' }}>Change Password</h2>
        <Input label="Current Password" id="curr-pw" type="password" error={errors.currentPassword?.message} {...register('currentPassword')} icon={<Lock size={13} />} />
        <Input label="New Password" id="new-pw" type="password" error={errors.newPassword?.message} {...register('newPassword')} icon={<Lock size={13} />} />
        <Input label="Confirm New Password" id="confirm-pw" type="password" error={errors.confirmPassword?.message} {...register('confirmPassword')} icon={<Lock size={13} />} />
        <p className="text-xs" style={{ color: 'var(--text-3)' }}>⚠️ Changing your password will log out all other sessions.</p>
        <Button type="submit" loading={changePwMut.isPending} icon={<Lock size={13} />} id="change-pw-btn">Change Password</Button>
      </form>
    </div>
  );
}
