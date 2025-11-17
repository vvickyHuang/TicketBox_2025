import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    const events = [
      {
        id: 11,
        title: 'BTS PERMISSION TO DANCE ON STAGE - TAIPEI',
        date: '2025/12/20(六) ~ 2025/12/21(日)',
        location: '臺北大巨蛋',
        status: '熱賣中',
        image: '/aiimg/btsbg.png',
      },
      {
        id: 1,
        title: 'SUPER JUNIOR 20th Anniversary TOUR ＜SUPER SHOW 10＞ in TAIPEI',
        date: '2025/11/14 (五)  ~ 2025/11/16 (日) ',
        location: '臺北大巨蛋',
        status: '熱賣中',
        image: '/aiimg/sjbg.png',
      },

      {
        id: 2,
        title: '頑童MJ116 OGS 台中洲際演唱會',
        date: '2026/01/31 (六) - 2026/02/01 (日)',
        location: '臺中洲際棒球場 (台中市北屯區崇德路三段835號)',
        status: '熱賣中',
        image: '/aiimg/mj116bg.png',
      },
      {
        id: 3,
        title: 'TOMORROW X TOGETHER WORLD TOUR ＜ACT：TOMORROW＞ IN TAIPEI',
        date: '2026/01/31 (六)  ~ 2026/02/01 (日) ',
        location: '臺北大巨蛋',
        status: '熱賣中',
        image: '/aiimg/tomobg.png',
      },
      {
        id: 4,
        title: 'Christian Kuria Paradigm Live in Taipei 2025',
        date: '2025/11/14 (五)',
        location: 'Hana Space 花漾展演空間',
        status: '熱賣中',
        image: '/aiimg/christianbg.png',
      },
      {
        id: 5,
        title: '2025-26 TREASURE TOUR [PULSE ON] IN TAIPEI',
        date: '2026/03/28 (六)',
        location: '國立體育大學綜合體育館（林口體育館)',
        status: '即將開賣',
        image: '/aiimg/treasurebg.png',
      },
    ];
    const data = events;

    return NextResponse.json({ data });
  } catch (err) {
    console.error('Register API error:', err);
    return NextResponse.json({ error: '伺服器錯誤' }, { status: 500 });
  }
}
