import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();
    const { memberId } = body;

    const apiBase = process.env.API_BASE_URL || 'http://localhost:8080';
    const externalRes = await fetch(
      `${apiBase}/api/member/bind-vc?memberId=${encodeURIComponent(memberId)}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      }
    );

    const text = await externalRes.text();
    let result;
    try {
      result = JSON.parse(text);
    } catch {
      result = { error: text };
    }

    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    console.error('Login API error:', err);
    return NextResponse.json({ error: '伺服器錯誤' }, { status: 500 });
  }
}
