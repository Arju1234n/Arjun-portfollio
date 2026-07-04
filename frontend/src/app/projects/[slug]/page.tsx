import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BookOpen, ExternalLink, Github } from 'lucide-react';
import { serverApi } from '@/lib/serverApi';
import type { ApiProject } from '@/hooks/usePortfolioData';

export const dynamic = 'force-dynamic';

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const project = await serverApi.getProjectBySlug(slug) as ApiProject;
    return {
      title: project.title,
      description: project.shortDescription,
      openGraph: {
        title: project.title,
        description: project.shortDescription,
        images: project.coverImage ? [project.coverImage] : [],
      },
    };
  } catch {
    return { title: 'Project Not Found' };
  }
}

function TextSection({ title, children }: { title: string; children?: string }) {
  if (!children) return null;
  return (
    <section className="surface p-6">
      <h2 className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--text-3)' }}>{title}</h2>
      <p className="text-base leading-relaxed whitespace-pre-line" style={{ color: 'var(--text-2)' }}>{children}</p>
    </section>
  );
}

export default async function ProjectDetailsPage({ params }: PageProps) {
  const { slug } = await params;
  let project: ApiProject;

  try {
    project = await serverApi.getProjectBySlug(slug) as ApiProject;
  } catch {
    notFound();
  }

  const gallery = [project.coverImage, ...(project.gallery ?? [])].filter(Boolean) as string[];
  const metrics = Object.entries(project.metrics ?? {}).filter(([, value]) => Boolean(value));

  return (
    <main className="min-h-screen bg-[var(--bg)]">
      <section className="section-pad">
        <div className="container-lg">
          <div className="grid lg:grid-cols-[1fr_320px] gap-8 items-start">
            <div>
              <p className="section-eyebrow mb-3">{project.category}</p>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight" style={{ color: 'var(--text-1)' }}>{project.title}</h1>
              <p className="mt-4 text-lg leading-relaxed max-w-3xl" style={{ color: 'var(--text-2)' }}>{project.shortDescription}</p>
              <div className="flex flex-wrap gap-2 mt-6">
                {project.techStack.map((tech) => <span key={tech} className="tech-chip">{tech}</span>)}
              </div>
            </div>

            <aside className="surface p-4">
              <div className="grid gap-2">
                {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer" className="btn-primary"><ExternalLink size={16} /> Live Demo</a>}
                {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noreferrer" className="btn-ghost"><Github size={16} /> GitHub</a>}
                {project.docsUrl && <a href={project.docsUrl} target="_blank" rel="noreferrer" className="btn-ghost"><BookOpen size={16} /> Documentation</a>}
              </div>
            </aside>
          </div>

          {gallery.length > 0 && (
            <div className="grid md:grid-cols-2 gap-4 mt-10">
              {gallery.map((image, index) => (
                <div key={`${image}-${index}`} className="surface overflow-hidden aspect-[16/10]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={image} alt={`${project.title} screenshot ${index + 1}`} loading="lazy" className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          )}

          <div className="grid lg:grid-cols-[1fr_320px] gap-6 mt-8">
            <div className="space-y-6">
              <TextSection title="Description">{project.fullDescription}</TextSection>
              {project.features?.length ? (
                <section className="surface p-6">
                  <h2 className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--text-3)' }}>Features</h2>
                  <ul className="grid gap-2">
                    {project.features.map((feature) => <li key={feature} className="text-sm" style={{ color: 'var(--text-2)' }}>{feature}</li>)}
                  </ul>
                </section>
              ) : null}
              <TextSection title="Problem">{project.problemStatement}</TextSection>
              <TextSection title="Solution">{project.solution}</TextSection>
              <TextSection title="My Role">{project.myRole}</TextSection>
              <TextSection title="Challenges">{project.challenges}</TextSection>
              <TextSection title="Learnings">{project.learnings}</TextSection>
            </div>

            {metrics.length > 0 && (
              <aside className="surface p-6 h-fit">
                <h2 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--text-3)' }}>Metrics</h2>
                <dl className="grid gap-4">
                  {metrics.map(([label, value]) => (
                    <div key={label}>
                      <dt className="text-xs uppercase tracking-wider" style={{ color: 'var(--text-3)' }}>{label}</dt>
                      <dd className="text-lg font-semibold mt-1" style={{ color: 'var(--text-1)' }}>{value}</dd>
                    </div>
                  ))}
                </dl>
              </aside>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
