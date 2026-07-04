// frontend/src/app/api/contact/route.ts
// Thin proxy — forwards contact form submissions to the backend API.
// The backend handles validation, email delivery, and DB persistence.
import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const backendRes = await fetch(`${BACKEND_URL}/api/v1/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await backendRes.json();
    return NextResponse.json(data, { status: backendRes.status });
  } catch (err) {
    console.error('[Contact Proxy Error]', err);
    return NextResponse.json(
      { success: false, error: 'Could not reach the server. Please try again.' },
      { status: 502 }
    );
  }
}
