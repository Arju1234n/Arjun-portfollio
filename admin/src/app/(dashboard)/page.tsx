'use client';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { FolderKanban, Plus, Star, FileText, Eye } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

function StatCard({ label, value, icon: Icon, color, href }: any) {
  return (
    <motion.div whileHover={{ y: -2 }} transition={{ type: 'spring', stiffness: 400, damping: 30 }}>
      <Link href={href ?? '#'} className="glass p-6 flex flex-col gap-4 hover:border-[var(--accent)] transition-all block">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--text-3)' }}>{label}</span>
          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: color + '20', border: `1px solid ${color}40` }}>
            <Icon size={18} style={{ color }} />
          </div>
        </div>
        <div>
          <span className="text-4xl font-bold" style={{ color: 'var(--text-1)' }}>{value?.toLocaleString() ?? '—'}</span>
        </div>
      </Link>
    </motion.div>
  );
}

function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`skeleton ${className}`} />;
}

function RecentProject({ project }: any) {
  return (
    <Link href="/projects" className="flex items-center gap-3 p-3 rounded-lg hover:bg-[var(--bg-3)] transition-all">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate" style={{ color: 'var(--text-1)' }}>{project.title}</p>
        <p className="text-xs mt-0.5 truncate" style={{ color: 'var(--text-3)' }}>{project.shortDescription}</p>
        <div className="flex gap-1.5 mt-1.5">
          {project.techStack?.slice(0, 3).map((tech: string) => (
            <span key={tech} className="text-[10px] px-1.5 py-0.5 rounded" 
              style={{ background: 'var(--bg-2)', color: 'var(--text-3)', border: '1px solid var(--border)' }}>
              {tech}
            </span>
          ))}
        </div>
      </div>
      {project.featured && (
        <Star size={14} style={{ color: 'var(--accent-2)' }} fill="var(--accent-2)" />
      )}
    </Link>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  
  const { data: projects, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: () => api.get('/projects', { params: { limit: 50 } }).then(r => r.data.data),
  });

  const allProjects = projects ?? [];
  const publishedProjects = allProjects.filter((p: any) => p.status === 'published');
  const draftProjects = allProjects.filter((p: any) => p.status === 'draft');
  const featuredProjects = allProjects.filter((p: any) => p.featured);
  const recentProjects = [...allProjects].sort((a: any, b: any) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ).slice(0, 5);

  const statCards = [
    { label: 'Total Projects', value: allProjects.length, icon: FolderKanban, color: '#8b5cf6', href: '/projects' },
    { label: 'Published', value: publishedProjects.length, icon: Eye, color: '#22c55e', href: '/projects' },
    { label: 'Drafts', value: draftProjects.length, icon: FileText, color: '#f59e0b', href: '/projects' },
    { label: 'Featured', value: featuredProjects.length, icon: Star, color: '#ef4444', href: '/projects' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text-1)' }}>Dashboard</h1>
          <p className="text-sm mt-0.5" style={{ color: 'var(--text-3)' }}>Manage your portfolio projects</p>
        </div>
        <button
          onClick={() => router.push('/projects')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all"
          style={{ background: 'var(--accent)', color: 'white' }}
          onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.02)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <Plus size={16} /> New Project
        </button>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-32 rounded-xl" />)
          : statCards.map((c) => <StatCard key={c.label} {...c} />)
        }
      </div>

      {/* Recent Projects */}
      <div className="glass p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold" style={{ color: 'var(--text-1)' }}>Recent Projects</h2>
          <Link href="/projects" className="text-xs hover:underline" style={{ color: 'var(--accent-2)' }}>
            View all →
          </Link>
        </div>
        {isLoading ? (
          <div className="space-y-3">{Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-16" />)}</div>
        ) : recentProjects.length === 0 ? (
          <div className="text-center py-12">
            <FolderKanban size={40} className="mx-auto mb-3" style={{ color: 'var(--text-3)' }} />
            <p className="text-sm font-medium mb-1" style={{ color: 'var(--text-2)' }}>No projects yet</p>
            <p className="text-xs mb-4" style={{ color: 'var(--text-3)' }}>Create your first project to get started</p>
            <button
              onClick={() => router.push('/projects')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all"
              style={{ background: 'var(--accent)', color: 'white' }}
            >
              <Plus size={14} /> Create Project
            </button>
          </div>
        ) : (
          <div className="space-y-1">
            {recentProjects.map((project: any) => (
              <RecentProject key={project._id} project={project} />
            ))}
          </div>
        )}
      </div>

      {/* Quick Tips */}
      <div className="glass p-5">
        <h2 className="text-sm font-semibold mb-3" style={{ color: 'var(--text-1)' }}>💡 Quick Tips</h2>
        <ul className="space-y-2 text-xs" style={{ color: 'var(--text-2)' }}>
          <li className="flex items-start gap-2">
            <span style={{ color: 'var(--accent)' }}>•</span>
            <span>Mark projects as <strong>Featured</strong> to showcase them prominently on your portfolio</span>
          </li>
          <li className="flex items-start gap-2">
            <span style={{ color: 'var(--accent)' }}>•</span>
            <span>Use <strong>Draft</strong> status while working on projects, then publish when ready</span>
          </li>
          <li className="flex items-start gap-2">
            <span style={{ color: 'var(--accent)' }}>•</span>
            <span>Drag and drop to reorder projects in the list view</span>
          </li>
          <li className="flex items-start gap-2">
            <span style={{ color: 'var(--accent)' }}>•</span>
            <span>Add GitHub and Live URLs to make your projects more interactive</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
