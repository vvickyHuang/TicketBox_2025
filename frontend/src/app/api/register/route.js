import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();

    return NextResponse.json(
      { message: '註冊成功', user: { account: body.memberId } },
      { status: 200 },
    );
  } catch (err) {
    console.error('Register API error:', err);
    return NextResponse.json({ error: '伺服器錯誤' }, { status: 500 });
  }
}
