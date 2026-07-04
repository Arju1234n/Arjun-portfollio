'use client';
// Simple test component to verify client-side fetching
import { useEffect, useState } from 'react';

export default function ClientFetchTest() {
  const [status, setStatus] = useState('Not started');
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
    const url = `${apiUrl}/api/v1/projects`;
    
    setStatus('Fetching...');
    console.log('[CLIENT-TEST] Starting fetch:', url);
    
    fetch(url, {
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => {
        console.log('[CLIENT-TEST] Response status:', res.status);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(json => {
        console.log('[CLIENT-TEST] Success:', json);
        setData(json);
        setStatus('Success!');
      })
      .catch(err => {
        console.error('[CLIENT-TEST] Error:', err);
        setError(err.message);
        setStatus('Error');
      });
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'monospace', maxWidth: '800px' }}>
      <h1>🧪 Client-Side Fetch Test</h1>
      <hr />
      
      <p><strong>Status:</strong> {status}</p>
      
      {error && (
        <div style={{ color: 'red', padding: '1rem', background: '#fee', marginTop: '1rem' }}>
          <strong>Error:</strong> {error}
        </div>
      )}
      
      {data && (
        <div style={{ marginTop: '1rem' }}>
          <p><strong>Projects Found:</strong> {data.data?.length || 0}</p>
          <pre style={{ background: '#f5f5f5', padding: '1rem', overflow: 'auto' }}>
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}
      
      <div style={{ marginTop: '2rem', padding: '1rem', background: '#f0f0f0' }}>
        <p><strong>Environment:</strong></p>
        <pre>NEXT_PUBLIC_API_URL: {process.env.NEXT_PUBLIC_API_URL || 'not set'}</pre>
      </div>
    </div>
  );
}
