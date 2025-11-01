import { console } from 'inspector/promises';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();
    const apiKey = 'HH5IPtqr3WnyY31pIiZFCZfelt4W2Nxg';

    const externalRes = await fetch('https://issuer-sandbox.wallet.gov.tw/api/qrcode/data', {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
        'Access-Token': apiKey,
      },
      body: JSON.stringify(body),
    });

    const result = await externalRes.json();

    if (externalRes.ok) {
      return NextResponse.json({ message: 'VC登入成功', data: result }, { status: 200 });
    }

    return NextResponse.json(
      { error: result.error || 'VC登入失敗' },
      { status: externalRes.status || 500 },
    );
  } catch (err) {
    console.error('Register API error:', err);
    return NextResponse.json({ error: '伺服器錯誤' }, { status: 500 });
  }
}
