// Test page to verify API connection
// Access at: http://localhost:3000/debug-projects

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getProjects() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
  const url = `${apiUrl}/api/v1/projects`;
  
  console.log('[DEBUG-PAGE] Fetching from:', url);
  
  const res = await fetch(url, {
    cache: 'no-store',
    headers: { 'Content-Type': 'application/json' },
  });
  
  if (!res.ok) {
    throw new Error(`Failed: ${res.status}`);
  }
  
  const json = await res.json();
  return json.data;
}

export default async function DebugProjectsPage() {
  let projects = [];
  let error = null;
  
  try {
    projects = await getProjects();
  } catch (err: any) {
    error = err.message;
  }
  
  return (
    <div style={{ padding: '2rem', fontFamily: 'monospace' }}>
      <h1>🔍 Debug: Projects API</h1>
      <hr />
      
      <h2>Environment</h2>
      <pre>{JSON.stringify({
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
        NODE_ENV: process.env.NODE_ENV,
      }, null, 2)}</pre>
      
      <h2>Results</h2>
      {error ? (
        <div style={{ color: 'red' }}>
          <strong>Error:</strong> {error}
        </div>
      ) : (
        <>
          <p><strong>Total Projects:</strong> {projects.length}</p>
          <pre>{JSON.stringify(projects, null, 2)}</pre>
        </>
      )}
    </div>
  );
}
