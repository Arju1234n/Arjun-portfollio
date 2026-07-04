'use client';
import { useMemo, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Pencil, Trash2, GripVertical, ExternalLink, Search, Copy, Eye, Star, Upload, X } from 'lucide-react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable, arrayMove } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import api from '@/lib/api';
import { Button, Input, Textarea, Modal, ConfirmDialog, EmptyState, PageHeader, Badge, TagInput } from '@/components/ui';
import { cn } from '@/lib/utils';

type Status = 'draft' | 'published' | 'archived';

type ProjectForm = {
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  status: Status;
  featured: boolean;
  coverImage: string;
  gallery: string[];
  githubUrl: string;
  liveUrl: string;
  docsUrl: string;
  techStack: string[];
  features: string[];
  problemStatement: string;
  solution: string;
  myRole: string;
  challenges: string;
  learnings: string;
  metrics: { duration: string; teamSize: string };
};

const STATUS_COLOR: Record<Status, 'green' | 'gray' | 'red'> = {
  published: 'green',
  draft: 'gray',
  archived: 'red',
};

const FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL ?? 'http://localhost:3000';

const defaultForm: ProjectForm = {
  title: '',
  slug: '',
  shortDescription: '',
  fullDescription: '',
  category: 'web',
  status: 'draft',
  featured: false,
  coverImage: '',
  gallery: [],
  githubUrl: '',
  liveUrl: '',
  docsUrl: '',
  techStack: [],
  features: [],
  problemStatement: '',
  solution: '',
  myRole: '',
  challenges: '',
  learnings: '',
  metrics: { duration: '', teamSize: '' },
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const compactPayload = (form: ProjectForm) => {
  const payload: any = {
    ...form,
    metrics: {
      duration: form.metrics.duration,
      teamSize: form.metrics.teamSize,
    },
  };

  for (const key of ['githubUrl', 'liveUrl', 'docsUrl', 'coverImage']) {
    if (!payload[key]) delete payload[key];
  }
  if (!payload.slug) delete payload.slug;
  payload.gallery = form.gallery.filter(Boolean);
  return payload;
};

function toForm(project: any): ProjectForm {
  return {
    title: project.title ?? '',
    slug: project.slug ?? '',
    shortDescription: project.shortDescription ?? '',
    fullDescription: project.fullDescription ?? '',
    category: project.category ?? 'web',
    status: project.status ?? 'draft',
    featured: Boolean(project.featured),
    coverImage: project.coverImage ?? '',
    gallery: project.gallery ?? [],
    githubUrl: project.githubUrl ?? '',
    liveUrl: project.liveUrl ?? '',
    docsUrl: project.docsUrl ?? '',
    techStack: project.techStack ?? [],
    features: project.features ?? [],
    problemStatement: project.problemStatement ?? '',
    solution: project.solution ?? '',
    myRole: project.myRole ?? '',
    challenges: project.challenges ?? '',
    learnings: project.learnings ?? '',
    metrics: {
      duration: project.metrics?.duration ?? '',
      teamSize: project.metrics?.teamSize ?? '',
    },
  };
}

function SortableRow({ project, onEdit, onDelete, onDuplicate, onToggleFeatured, onPublish, onDraft }: any) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: project._id });
  const projectUrl = `${FRONTEND_URL}/projects/${project.slug}`;

  return (
    <motion.div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1 }}
      className={cn('glass-sm p-4 grid gap-3 lg:grid-cols-[28px_72px_1.5fr_110px_110px_1fr_130px_210px] items-center group', isDragging && 'ring-1 ring-[var(--accent)]')}
    >
      <button {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing" style={{ color: 'var(--text-3)' }} aria-label={`Reorder ${project.title}`}>
        <GripVertical size={16} />
      </button>
      <div className="h-14 w-full rounded-lg overflow-hidden bg-[var(--bg-3)] border border-[var(--border)]">
        {project.coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={project.coverImage} alt="" className="h-full w-full object-cover" />
        ) : null}
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold truncate" style={{ color: 'var(--text-1)' }}>{project.title}</p>
        <p className="text-xs mt-1 line-clamp-1" style={{ color: 'var(--text-3)' }}>{project.shortDescription}</p>
      </div>
      <Badge color={STATUS_COLOR[project.status as Status]}>{project.status}</Badge>
      <button onClick={() => onToggleFeatured(project)} className="inline-flex items-center gap-1 text-xs transition-colors" style={{ color: project.featured ? '#f59e0b' : 'var(--text-3)' }}>
        <Star size={13} fill={project.featured ? 'currentColor' : 'none'} />
        {project.featured ? 'Featured' : 'Feature'}
      </button>
      <div className="flex flex-wrap gap-1">
        {project.techStack?.slice(0, 4).map((t: string) => (
          <span key={t} className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: 'var(--bg-3)', color: 'var(--text-3)', border: '1px solid var(--border)' }}>{t}</span>
        ))}
      </div>
      <p className="text-xs" style={{ color: 'var(--text-3)' }}>{project.updatedAt ? new Date(project.updatedAt).toLocaleDateString() : 'Not saved'}</p>
      <div className="flex items-center justify-end gap-1">
        {project.status !== 'published' ? (
          <button onClick={() => onPublish(project)} className="p-1.5 rounded-lg hover:bg-[var(--bg-3)]" style={{ color: 'var(--text-3)' }} aria-label={`Publish ${project.title}`}>
            <Eye size={13} />
          </button>
        ) : (
          <button onClick={() => onDraft(project)} className="p-1.5 rounded-lg hover:bg-[var(--bg-3)]" style={{ color: 'var(--text-3)' }} aria-label={`Move ${project.title} to draft`}>
            <X size={13} />
          </button>
        )}
        {project.slug && (
          <a href={projectUrl} target="_blank" rel="noreferrer" className="p-1.5 rounded-lg hover:bg-[var(--bg-3)]" style={{ color: 'var(--text-3)' }} aria-label={`View ${project.title}`}>
            <ExternalLink size={13} />
          </a>
        )}
        <button onClick={() => onDuplicate(project)} className="p-1.5 rounded-lg hover:bg-[var(--bg-3)]" style={{ color: 'var(--text-3)' }} aria-label={`Duplicate ${project.title}`}>
          <Copy size={13} />
        </button>
        <button onClick={() => onEdit(project)} className="p-1.5 rounded-lg hover:bg-[var(--bg-3)]" style={{ color: 'var(--text-3)' }} aria-label={`Edit ${project.title}`}>
          <Pencil size={13} />
        </button>
        <button onClick={() => onDelete(project)} className="p-1.5 rounded-lg hover:bg-[var(--bg-3)]" style={{ color: 'var(--red)' }} aria-label={`Delete ${project.title}`}>
          <Trash2 size={13} />
        </button>
      </div>
    </motion.div>
  );
}

export default function ProjectsPage() {
  const qc = useQueryClient();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [modal, setModal] = useState<'create' | 'edit' | null>(null);
  const [editTarget, setEditTarget] = useState<any>(null);
  const [deleteTarget, setDeleteTarget] = useState<any>(null);
  const [form, setForm] = useState<ProjectForm>(defaultForm);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const { data, isLoading } = useQuery({
    queryKey: ['projects', search, statusFilter],
    queryFn: () => api.get('/projects', { params: { search: search || undefined, status: statusFilter || undefined, limit: 100 } }).then(r => r.data.data),
    refetchOnWindowFocus: true,
  });

  const projects: any[] = data ?? [];

  const dashboard = useMemo(() => ({
    total: projects.length,
    published: projects.filter(p => p.status === 'published').length,
    draft: projects.filter(p => p.status === 'draft').length,
    featured: projects.filter(p => p.featured).length,
  }), [projects]);

  const uploadImages = async (projectId: string) => {
    if (coverFile) {
      const body = new FormData();
      body.append('image', coverFile);
      await api.post(`/projects/${projectId}/cover-image`, body, { headers: { 'Content-Type': 'multipart/form-data' } });
    }
    if (galleryFiles.length) {
      const body = new FormData();
      galleryFiles.forEach(file => body.append('images', file));
      await api.post(`/projects/${projectId}/gallery-images`, body, { headers: { 'Content-Type': 'multipart/form-data' } });
    }
  };

  const createMut = useMutation({
    mutationFn: async (d: ProjectForm) => {
      const created = await api.post('/projects', compactPayload(d)).then(r => r.data.data);
      await uploadImages(created._id);
      return created;
    },
    onSuccess: () => {
      toast.success('Project created');
      qc.invalidateQueries({ queryKey: ['projects'] });
      setModal(null);
      setCoverFile(null);
      setGalleryFiles([]);
    },
    onError: (e: any) => toast.error(e?.response?.data?.message ?? 'Failed to create project'),
  });

  const updateMut = useMutation({
    mutationFn: async ({ id, d }: any) => {
      const updated = await api.patch(`/projects/${id}`, compactPayload(d)).then(r => r.data.data);
      await uploadImages(id);
      return updated;
    },
    onSuccess: () => {
      toast.success('Project updated');
      qc.invalidateQueries({ queryKey: ['projects'] });
      setModal(null);
      setCoverFile(null);
      setGalleryFiles([]);
    },
    onError: (e: any) => toast.error(e?.response?.data?.message ?? 'Failed to update project'),
  });

  const deleteMut = useMutation({
    mutationFn: (id: string) => api.delete(`/projects/${id}`),
    onSuccess: () => { toast.success('Project deleted'); qc.invalidateQueries({ queryKey: ['projects'] }); setDeleteTarget(null); },
    onError: (e: any) => toast.error(e?.response?.data?.message ?? 'Failed to delete project'),
  });

  const duplicateMut = useMutation({
    mutationFn: (project: any) => {
      const next = toForm(project);
      next.title = `${next.title} Copy`;
      next.slug = '';
      next.status = 'draft';
      next.featured = false;
      return api.post('/projects', compactPayload(next));
    },
    onSuccess: () => { toast.success('Project duplicated'); qc.invalidateQueries({ queryKey: ['projects'] }); },
    onError: (e: any) => toast.error(e?.response?.data?.message ?? 'Failed to duplicate project'),
  });

  const quickMut = useMutation({
    mutationFn: ({ id, action, data: body }: any) => api.patch(`/projects/${id}/${action}`, body ?? {}),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['projects'] }),
    onError: (e: any) => toast.error(e?.response?.data?.message ?? 'Action failed'),
  });

  const reorderMut = useMutation({
    mutationFn: (order: any[]) => api.post('/projects/reorder', { order }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['projects'] }),
    onError: (e: any) => toast.error(e?.response?.data?.message ?? 'Failed to reorder projects'),
  });

  const openCreate = () => {
    setForm(defaultForm);
    setEditTarget(null);
    setCoverFile(null);
    setGalleryFiles([]);
    setModal('create');
  };

  const openEdit = (p: any) => {
    setForm(toForm(p));
    setEditTarget(p);
    setCoverFile(null);
    setGalleryFiles([]);
    setModal('edit');
  };

  const save = (status?: Status) => {
    const payload = status ? { ...form, status } : form;
    if (modal === 'create') createMut.mutate(payload);
    else updateMut.mutate({ id: editTarget._id, d: payload });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id || !data) return;
    const oldIdx = data.findIndex((p: any) => p._id === active.id);
    const newIdx = data.findIndex((p: any) => p._id === over.id);
    const reordered = arrayMove(data, oldIdx, newIdx);
    reorderMut.mutate(reordered.map((p: any, i: number) => ({ id: p._id, displayOrder: i })));
  };

  const busy = createMut.isPending || updateMut.isPending;

  return (
    <div className="space-y-5">
      <PageHeader
        title="Projects"
        description={`${dashboard.total} projects total`}
        action={<Button icon={<Plus size={14} />} onClick={openCreate} id="create-project-btn">Add Project</Button>}
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ['Total Projects', dashboard.total],
          ['Published', dashboard.published],
          ['Draft', dashboard.draft],
          ['Featured', dashboard.featured],
        ].map(([label, value]) => (
          <div key={label} className="glass-sm p-4">
            <p className="text-xs uppercase tracking-wider" style={{ color: 'var(--text-3)' }}>{label}</p>
            <p className="text-2xl font-bold mt-1" style={{ color: 'var(--text-1)' }}>{value}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-3)' }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search projects"
            className="w-full pl-9 pr-4 py-2 text-sm rounded-lg outline-none"
            style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', color: 'var(--text-1)' }} />
        </div>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
          className="px-3 py-2 text-sm rounded-lg outline-none"
          style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', color: 'var(--text-2)' }}>
          <option value="">All Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      {isLoading ? (
        <div className="space-y-3">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="skeleton h-20 rounded-xl" />)}</div>
      ) : projects.length === 0 ? (
        <div className="glass rounded-xl">
          <EmptyState title="No projects yet" description="Create your first project to start feeding the portfolio API." action={<Button icon={<Plus size={14} />} onClick={openCreate}>Add Project</Button>} />
        </div>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={projects.map(p => p._id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-2">
              {projects.map(p => (
                <SortableRow
                  key={p._id}
                  project={p}
                  onEdit={openEdit}
                  onDelete={setDeleteTarget}
                  onDuplicate={(project: any) => duplicateMut.mutate(project)}
                  onToggleFeatured={(project: any) => quickMut.mutate({ id: project._id, action: 'featured', data: { featured: !project.featured } })}
                  onPublish={(project: any) => quickMut.mutate({ id: project._id, action: 'publish' })}
                  onDraft={(project: any) => quickMut.mutate({ id: project._id, action: 'draft' })}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      <Modal open={!!modal} onClose={() => setModal(null)} title={modal === 'create' ? 'Add Project' : 'Edit Project'} size="xl">
        <div className="space-y-5">
          <section className="grid gap-3 md:grid-cols-2">
            <Input label="Title *" id="project-title" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value, slug: f.slug || slugify(e.target.value) }))} placeholder="My Project" />
            <Input label="Slug" id="project-slug" value={form.slug} onChange={e => setForm(f => ({ ...f, slug: slugify(e.target.value) }))} placeholder="my-project" />
            <Input label="Category" id="project-category" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} />
            <div className="space-y-1.5">
              <label className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--text-3)' }}>Status</label>
              <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value as Status }))}
                className="w-full px-3 py-2.5 text-sm rounded-lg outline-none"
                style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', color: 'var(--text-1)' }}>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </section>

          <Textarea label="Short Description *" id="project-short-desc" value={form.shortDescription} onChange={e => setForm(f => ({ ...f, shortDescription: e.target.value }))} rows={2} />
          <Textarea label="Rich Description" id="project-full-desc" value={form.fullDescription} onChange={e => setForm(f => ({ ...f, fullDescription: e.target.value }))} rows={5} />

          <section className="grid gap-3 md:grid-cols-3">
            <Input label="GitHub URL" id="project-github" value={form.githubUrl} onChange={e => setForm(f => ({ ...f, githubUrl: e.target.value }))} placeholder="https://github.com/..." />
            <Input label="Live Demo URL" id="project-live" value={form.liveUrl} onChange={e => setForm(f => ({ ...f, liveUrl: e.target.value }))} placeholder="https://..." />
            <Input label="Documentation URL" id="project-docs" value={form.docsUrl} onChange={e => setForm(f => ({ ...f, docsUrl: e.target.value }))} placeholder="https://..." />
          </section>

          <section className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--text-3)' }}>Cover Image</label>
              <label className="flex items-center gap-2 px-3 py-2.5 rounded-lg cursor-pointer" style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', color: 'var(--text-2)' }}>
                <Upload size={14} />
                <span className="text-sm">{coverFile ? coverFile.name : 'Upload cover image'}</span>
                <input type="file" accept="image/*" className="hidden" onChange={e => setCoverFile(e.target.files?.[0] ?? null)} />
              </label>
              <Input label="Or Cover URL" id="project-cover-url" value={form.coverImage} onChange={e => setForm(f => ({ ...f, coverImage: e.target.value }))} placeholder="https://res.cloudinary.com/..." />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--text-3)' }}>Gallery Images</label>
              <label className="flex items-center gap-2 px-3 py-2.5 rounded-lg cursor-pointer" style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', color: 'var(--text-2)' }}>
                <Upload size={14} />
                <span className="text-sm">{galleryFiles.length ? `${galleryFiles.length} selected` : 'Upload gallery images'}</span>
                <input type="file" accept="image/*" multiple className="hidden" onChange={e => setGalleryFiles(Array.from(e.target.files ?? []))} />
              </label>
              {form.gallery.length > 0 && (
                <div className="grid gap-2">
                  {form.gallery.map((url, index) => (
                    <div key={url} className="flex items-center gap-2 text-xs">
                      <span className="truncate flex-1" style={{ color: 'var(--text-3)' }}>{url}</span>
                      <button onClick={() => setForm(f => ({ ...f, gallery: f.gallery.filter((_, i) => i !== index) }))} style={{ color: 'var(--red)' }}>Remove</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-2">
            <TagInput label="Tech Stack" tags={form.techStack} onChange={techStack => setForm(f => ({ ...f, techStack }))} placeholder="React, Node.js" />
            <TagInput label="Features" tags={form.features} onChange={features => setForm(f => ({ ...f, features }))} placeholder="Authentication, Dashboard" />
          </section>

          <section className="grid gap-3 md:grid-cols-2">
            <Textarea label="Problem" value={form.problemStatement} onChange={e => setForm(f => ({ ...f, problemStatement: e.target.value }))} rows={3} />
            <Textarea label="Solution" value={form.solution} onChange={e => setForm(f => ({ ...f, solution: e.target.value }))} rows={3} />
            <Textarea label="My Role" value={form.myRole} onChange={e => setForm(f => ({ ...f, myRole: e.target.value }))} rows={3} />
            <Textarea label="Challenges" value={form.challenges} onChange={e => setForm(f => ({ ...f, challenges: e.target.value }))} rows={3} />
            <Textarea label="Learnings" value={form.learnings} onChange={e => setForm(f => ({ ...f, learnings: e.target.value }))} rows={3} className="md:col-span-2" />
          </section>

          <section className="grid gap-3 md:grid-cols-2">
            <Input label="Duration" value={form.metrics.duration} onChange={e => setForm(f => ({ ...f, metrics: { ...f.metrics, duration: e.target.value } }))} placeholder="4 weeks" />
            <Input label="Team Size" value={form.metrics.teamSize} onChange={e => setForm(f => ({ ...f, metrics: { ...f.metrics, teamSize: e.target.value } }))} placeholder="Solo" />
          </section>

          <label className="flex items-center gap-2.5 cursor-pointer">
            <input type="checkbox" checked={form.featured} onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))} className="w-4 h-4 rounded" style={{ accentColor: 'var(--accent)' }} />
            <span className="text-sm" style={{ color: 'var(--text-2)' }}>Featured project</span>
          </label>

          <div className="flex flex-wrap gap-3 justify-end pt-2">
            <Button variant="ghost" onClick={() => setModal(null)}>Cancel</Button>
            <Button variant="outline" onClick={() => save('draft')} loading={busy}>Save Draft</Button>
            <Button onClick={() => save('published')} loading={busy}>Publish</Button>
            <Button onClick={() => save()} loading={busy}>Save Project</Button>
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => deleteMut.mutate(deleteTarget._id)}
        loading={deleteMut.isPending}
        title="Delete Project"
        message={`Are you sure you want to delete "${deleteTarget?.title}"? This will delete its MongoDB record and Cloudinary project images.`}
      />
    </div>
  );
}
