import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    // 從 URL 查詢參數拿 id
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    console.log('id', id);
    if (!id) {
      return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    }

    const apiBase = process.env.API_BASE_URL || 'http://localhost:8080';

    // 將 id 放到外部 API 的 URL
    const externalRes = await fetch(`${apiBase}/api/tickets/getVcQrcode/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    let data = await externalRes.json();
    if (Array.isArray(data.ticketVcDTOList)) {
      data.ticketVcDTOList = data.ticketVcDTOList.map((item) => ({
        ...item,
        isScanned: false, // 新增欄位
      }));
    }
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in getVerifyCode:', error);
    return NextResponse.json({ error: 'Failed to get verify code' }, { status: 500 });
  }
}
