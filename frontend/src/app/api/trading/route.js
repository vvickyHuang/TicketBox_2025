import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    const tickets = [
      {
        id: 1,
        title: 'SUPER JUNIOR 20th Anniversary TOUR ＜SUPER SHOW 10＞ in TAIPEI',
        date: '2025/11/14 (五) 19:30',
        location: '臺北大巨蛋',
        seat: '特A1區 第5排 15-16號 (2張)',
        price: 8500,
        tags: ['售票', 'VIP', '含SOUNDCHECK'],
        status: 'sell',
        seatImg: '/aiimg/sjseat.png',
        image: '/aiimg/sjbg.png',
        seller: {
          name: 'Mike Chen',
        },
      },
      {
        id: 2,
        title: 'Christian Kuria Paradigm Live in Taipei 2025',
        date: '2025/11/29 (五) 19:30',
        location: 'Hana Space 花漾展演空間',
        seat: 'VIP 37號 (1張)',
        price: 3200,
        tags: ['售票', 'VIP', '含SOUNDCHECK'],
        status: 'sell',
        seatImg: '/aiimg/sjseat.png',
        image: '/aiimg/christianbg.png',
        seller: {
          name: 'Mike Chen',
        },
      },
      {
        id: 3,
        title: 'TOMORROW X TOGETHER WORLD TOUR ＜ACT：TOMORROW＞ IN TAIPEI',
        date: '2026/01/31 (六) 19:30',
        location: 'Hana Space 花漾展演空間',
        seat: 'S區 55-56號 (2張)',
        price: 3200,
        tags: ['售票'],
        status: 'sell',
        seatImg: '/aiimg/sjseat.png',
        image: '/aiimg/tomobg.png',
        seller: {
          name: 'Mike Chen',
        },
      },
    ];

    const data = tickets;

    return NextResponse.json({ data });
  } catch (err) {
    console.error('Register API error:', err);
    return NextResponse.json({ error: '伺服器錯誤' }, { status: 500 });
  }
}
