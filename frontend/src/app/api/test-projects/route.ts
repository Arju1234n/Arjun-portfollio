// Test route to verify backend connection
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
    console.log('[TEST] Fetching from:', `${apiUrl}/api/v1/projects`);
    
    const response = await fetch(`${apiUrl}/api/v1/projects`, {
      cache: 'no-store',
    });
    
    if (!response.ok) {
      throw new Error(`API returned ${response.status}`);
    }
    
    const data = await response.json();
    
    return NextResponse.json({
      success: true,
      apiUrl: `${apiUrl}/api/v1/projects`,
      projectCount: data.data?.length || 0,
      projects: data.data,
    });
  } catch (error: any) {
    console.error('[TEST] Error:', error.message);
    return NextResponse.json({
      success: false,
      error: error.message,
      apiUrl: process.env.NEXT_PUBLIC_API_URL,
    }, { status: 500 });
  }
}
