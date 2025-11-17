import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();
    const { memberId, password } = body;

    const apiBase = process.env.API_BASE_URL || 'http://localhost:8080';
    const externalRes = await fetch(
      `${apiBase}/api/member/login?memberId=${encodeURIComponent(
        memberId
      )}&password=${encodeURIComponent(password)}`,
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

    if (result.status === 'SUCCESS') {
      return NextResponse.json({ data: result }, { status: 200 });
    }

    return NextResponse.json({ data: result }, { status: 401 });
  } catch (err) {
    console.error('Login API error:', err);
    return NextResponse.json({ error: '伺服器錯誤' }, { status: 500 });
  }
}
