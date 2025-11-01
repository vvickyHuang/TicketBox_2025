import { NextResponse } from 'next/server';

// 簡易記憶體紀錄（重新啟動會清空）
const scanLog = {};

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const now = new Date().toISOString();

  if (!id) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  }

  // 紀錄掃描資料
  if (!scanLog[id]) scanLog[id] = [];
  scanLog[id].push({
    time: now,
    ua: request.headers.get('user-agent'),
  });

  console.log(`✅ QR ${id} 被掃描 at ${now}`);

  // 導向真實頁面
  return NextResponse.redirect('https://example.com', { status: 302 });
}

// 若想查詢紀錄，可加一個 POST 查詢
export async function POST() {
  return NextResponse.json(scanLog);
}
