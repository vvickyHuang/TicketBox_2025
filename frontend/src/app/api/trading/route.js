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
        seatImg:
          'https://static.tixcraft.com/images/activity/field/25_sjtp_7c2e042840f15cce3d866abd1dd0cb27.jpg',
        image:
          'https://static.tixcraft.com/images/activity/25_sjtp_853cb581812587601551359ae0ef9ed2.jpeg',
        seller: {
          name: 'Mike Chen',
        },
      },
      {
        id: 2,
        title: 'Christian Kuria Paradigm Live in Taipei 2025',
        date: '2025/11/02 (日)',
        location: 'Legacy TERA',
        seatImg:
          'https://static.tixcraft.com/images/activity/field/25_kimberley_b8b4a8315063ac9b19fa011c63925e5c.jpg',
        seat: '全站席無序號 (GA) (需2張)',
        price: 1600,
        tags: ['售票'],
        status: 'sell',
        image:
          'https://static.tixcraft.com/images/activity/25_kimberley_0631399903dc201a1026c8b7ca1c318c.jpg',
        seller: {
          name: 'Mike Chen',
        },
      },
      {
        id: 3,
        title: 'TOMORROW X TOGETHER WORLD TOUR ＜ACT：TOMORROW＞ IN TAIPEI',
        date: '2026.01.31 (六) 18:00',
        location: '臺北大巨蛋',
        seat: '104區 第13排 34-37號 (4張)',
        seatImg:
          'https://static.tixcraft.com/images/activity/field/26_txt_4010227bc8eb58adec6f20c16b5c0869.jpg',
        price: 11500,
        tags: ['售票'],
        status: 'sell',
        image:
          'https://static.tixcraft.com/images/activity/26_txt_99296655aefed82aac6fef02b5946791.jpg',
        seller: {
          name: 'Sarah Wang',
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
