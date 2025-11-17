import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();

    const apiBase = process.env.API_BASE_URL || 'http://localhost:8080';
    // console.log(body.vcBindToken);
    const externalRes = await fetch(`${apiBase}/api/tickets/revokeVc/${body.vcBindToken}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // body: JSON.stringify({ credentialStatus: 'REVOKED' }),
    });

    const data = await externalRes.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in createOrder:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
