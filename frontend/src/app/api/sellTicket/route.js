import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const apiBase = process.env.API_BASE_URL || 'http://localhost:8080';

    const externalRes = await fetch(`${apiBase}/api/tickets/tickets/sellingTicket`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await externalRes.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in createOrder:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
