import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();
    const { memberId } = body;
    console.log(memberId);
    const events = [
      {
        memberId: memberId,
        title: 'SUPER JUNIOR 20th Anniversary TOUR ＜SUPER SHOW 10＞ in TAIPEI',
        ticketId: 1,
        image:
          'https://static.tixcraft.com/images/activity/25_sjtp_853cb581812587601551359ae0ef9ed2.jpeg',
        date: '2025/11/14 (五)',
        time: '19:30',
        location: '臺北大巨蛋',
        seatInfo: {
          area: '特A1區',
          row: '第5排',
          number: '15-16號',
          count: 2,
        },
        price: 0,
        locationImage:
          'https://static.tixcraft.com/images/activity/field/25_sjtp_7c2e042840f15cce3d866abd1dd0cb27.jpg',
        seller: {
          name: memberId,
          isMessage: true,
          isEmail: true,
          response: '五分鐘前',
        },
      },
    ];
    const data = events;

    return NextResponse.json(data);
  } catch (err) {
    console.error('Login API error:', err);
    return NextResponse.json({ error: '伺服器錯誤' }, { status: 500 });
  }
}
