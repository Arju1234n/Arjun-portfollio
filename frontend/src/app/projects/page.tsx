// src/app/projects/page.tsx
// Dedicated projects page with server-side data fetching
import { Metadata } from 'next';
import ProjectDirectory from '@/components/ProjectDirectory';
import { serverApi } from '@/lib/serverApi';
import type { ApiProject } from '@/hooks/usePortfolioData';

export const metadata: Metadata = {
  title: 'Projects | Arjun Kumar',
  description: 'Explore my portfolio of full-stack web applications and software projects.',
};

export const dynamic = 'force-dynamic';

export default async function ProjectsPage() {
  let projects: ApiProject[] = [];
  let error: string | null = null;

  try {
    projects = await serverApi.getProjects();
  } catch (err: any) {
    error = err?.message ?? 'Failed to load projects';
  }

  return <ProjectDirectory projects={projects} error={error} />;
}
