// app/api/qr/scan/route.js
import { NextResponse } from 'next/server';

const scanLog = (global._scanLog ||= {}); // 全域記憶體，重啟會清空

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');
  if (!token) return NextResponse.json({ error: 'Missing token' }, { status: 400 });

  // 記錄掃描
  scanLog[token] = {
    time: new Date().toISOString(),
    ua: request.headers.get('user-agent'),
  };
  console.log(`✅ QR ${token} 被掃描`);

  // 導向手機看到的頁面
  return NextResponse.redirect('https://example.com', { status: 302 });
}

// 方便測試查看 log
export async function POST() {
  return NextResponse.json(scanLog);
}
