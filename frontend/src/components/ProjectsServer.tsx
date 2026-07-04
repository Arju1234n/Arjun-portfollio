// src/components/ProjectsServer.tsx
// Server Component wrapper that fetches projects server-side
import { serverApi } from '@/lib/serverApi';
import ProjectsClient from './ProjectsClient';
import type { ApiProject } from '@/hooks/usePortfolioData';

export default async function ProjectsServer() {
  let projects: ApiProject[] = [];
  let error: string | null = null;

  try {
    projects = await serverApi.getProjects();
  } catch (err: any) {
    error = err.message;
  }

  // Pass server-fetched data to client component
  return <ProjectsClient initialProjects={projects} initialError={error} />;
}
