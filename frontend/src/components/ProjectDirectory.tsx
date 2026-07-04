'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { BookOpen, ExternalLink, Github, Search, Star } from 'lucide-react';
import type { ApiProject } from '@/hooks/usePortfolioData';
import { apiFetch } from '@/lib/api';

const PAGE_SIZE = 9;

function ProjectCard({ project }: { project: ApiProject }) {
  return (
    <article className="surface overflow-hidden hover-lift flex flex-col min-h-full">
      <Link href={`/projects/${project.slug}`} className="block aspect-[16/10] bg-[var(--surface-2)] overflow-hidden">
        {project.coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={project.coverImage} alt={project.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.02]" />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-sm" style={{ color: 'var(--text-3)' }}>
            {project.category}
          </div>
        )}
      </Link>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-3">
          <Link href={`/projects/${project.slug}`} className="text-lg font-semibold tracking-tight hover:text-[var(--accent)] transition-colors" style={{ color: 'var(--text-1)' }}>
            {project.title}
          </Link>
          {project.featured && (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[11px] font-semibold bg-[var(--amber-bg)] text-[var(--amber)]">
              <Star size={12} fill="currentColor" />
              Featured
            </span>
          )}
        </div>
        <p className="mt-2 text-sm leading-relaxed line-clamp-3" style={{ color: 'var(--text-2)' }}>
          {project.shortDescription}
        </p>
        <div className="flex flex-wrap gap-1.5 mt-4">
          {project.techStack.map((tech) => (
            <span key={tech} className="tech-chip">{tech}</span>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-[var(--border)]">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noreferrer" className="btn-primary px-3 py-2 text-xs">
              <ExternalLink size={14} />
              Live
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noreferrer" className="btn-ghost px-3 py-2 text-xs">
              <Github size={14} />
              GitHub
            </a>
          )}
          {project.docsUrl && (
            <a href={project.docsUrl} target="_blank" rel="noreferrer" className="btn-ghost px-3 py-2 text-xs">
              <BookOpen size={14} />
              Docs
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function ProjectDirectory({ projects: initialProjects, error: initialError }: { projects: ApiProject[]; error?: string | null }) {
  const [projects, setProjects] = useState(initialProjects);
  const [error, setError] = useState(initialError ?? null);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [tech, setTech] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    let cancelled = false;

    const refreshProjects = async () => {
      try {
        const nextProjects = await apiFetch<ApiProject[]>('/projects?status=published&limit=100');
        if (!cancelled) {
          setProjects(nextProjects);
          setError(null);
        }
      } catch (err: any) {
        if (!cancelled) setError(err?.message ?? 'Failed to load projects');
      }
    };

    const interval = window.setInterval(refreshProjects, 30000);
    window.addEventListener('focus', refreshProjects);

    return () => {
      cancelled = true;
      window.clearInterval(interval);
      window.removeEventListener('focus', refreshProjects);
    };
  }, []);

  const categories = useMemo(() => Array.from(new Set(projects.map((p) => p.category).filter(Boolean))).sort(), [projects]);
  const techOptions = useMemo(() => Array.from(new Set(projects.flatMap((p) => p.techStack))).sort(), [projects]);

  const filtered = useMemo(() => {
    const text = query.trim().toLowerCase();
    return projects.filter((project) => {
      const matchesText = !text || [project.title, project.shortDescription, project.category, ...project.techStack].join(' ').toLowerCase().includes(text);
      const matchesCategory = !category || project.category === category;
      const matchesTech = !tech || project.techStack.includes(tech);
      return matchesText && matchesCategory && matchesTech;
    });
  }, [category, projects, query, tech]);

  const totalPages = Math.max(Math.ceil(filtered.length / PAGE_SIZE), 1);
  const currentPage = Math.min(page, totalPages);
  const visible = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const resetPage = (fn: () => void) => {
    fn();
    setPage(1);
  };

  return (
    <main className="min-h-screen bg-[var(--bg)]">
      <section className="section-pad">
        <div className="container-lg">
          <div className="mb-10">
            <p className="section-eyebrow mb-3">Projects</p>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight" style={{ color: 'var(--text-1)' }}>Built work, shipped cleanly</h1>
            <p className="mt-4 max-w-2xl text-base" style={{ color: 'var(--text-2)' }}>
              Published projects pulled directly from the portfolio API.
            </p>
          </div>

          <div className="surface p-4 mb-8 grid gap-3 md:grid-cols-[1fr_180px_180px]">
            <label className="relative block">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-3)' }} />
              <input
                value={query}
                onChange={(event) => resetPage(() => setQuery(event.target.value))}
                placeholder="Search projects"
                className="w-full h-11 pl-10 pr-3 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] outline-none text-sm"
                style={{ color: 'var(--text-1)' }}
              />
            </label>
            <select value={category} onChange={(event) => resetPage(() => setCategory(event.target.value))} className="h-11 px-3 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] outline-none text-sm" style={{ color: 'var(--text-1)' }}>
              <option value="">All categories</option>
              {categories.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
            <select value={tech} onChange={(event) => resetPage(() => setTech(event.target.value))} className="h-11 px-3 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] outline-none text-sm" style={{ color: 'var(--text-1)' }}>
              <option value="">All tech</option>
              {techOptions.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </div>

          {error && (
            <div className="surface p-5 mb-8" role="alert">
              <p className="font-semibold" style={{ color: 'var(--red)' }}>Unable to load projects</p>
              <p className="text-sm mt-1" style={{ color: 'var(--text-3)' }}>{error}</p>
            </div>
          )}

          {!error && visible.length === 0 ? (
            <div className="surface p-10 text-center">
              <p className="font-semibold" style={{ color: 'var(--text-1)' }}>No projects found</p>
              <p className="text-sm mt-1" style={{ color: 'var(--text-3)' }}>Try a different search or filter.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {visible.map((project) => <ProjectCard key={project._id} project={project} />)}
            </div>
          )}

          {filtered.length > PAGE_SIZE && (
            <div className="flex items-center justify-between gap-4 mt-8">
              <p className="text-sm" style={{ color: 'var(--text-3)' }}>Page {currentPage} of {totalPages}</p>
              <div className="flex gap-2">
                <button className="btn-ghost" disabled={currentPage === 1} onClick={() => setPage((value) => Math.max(value - 1, 1))}>Previous</button>
                <button className="btn-ghost" disabled={currentPage === totalPages} onClick={() => setPage((value) => Math.min(value + 1, totalPages))}>Next</button>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
