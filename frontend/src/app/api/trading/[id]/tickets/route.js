import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    /*  const apiUrl = 'https://api.example.com/data';

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      console.error('External API error:', response.status, response.statusText);
      return NextResponse.json({ error: '外部 API 錯誤' }, { status: response.status });
    } */

    const events = [
      /* {
        id: 1,
        title: 'SUPER JUNIOR 20th Anniversary TOUR ＜SUPER SHOW 10＞ in TAIPEI',
        date: '2025/11/14 (五) 20:00',
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
      } */
      {
        status: 'sell',
        id: 1,
        title: 'SUPER JUNIOR 20th Anniversary TOUR ＜SUPER SHOW 10＞ in TAIPEI',
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
        price: {
          original: 8500,
          sale: 7500,
          fee: 200,
          total: 17000,
        },
        locationImage:
          'https://static.tixcraft.com/images/activity/field/25_sjtp_7c2e042840f15cce3d866abd1dd0cb27.jpg',
        features: ['保證真票', '絕佳視野', 'VIP座區', '贈品包含'],
        seller: {
          name: 'Mike Chen',
          isMessage: true,
          isEmail: true,
          response: '五分鐘前',
        },
      },
      {
        id: 2,
        title: 'Christian Kuria Paradigm Live in Taipei 2025',
        date: '2025/11/02 (日) ',
        location: 'Legacy TERA',
        status: '熱賣中',
        image:
          'https://static.tixcraft.com/images/activity/25_kimberley_0631399903dc201a1026c8b7ca1c318c.jpg',
      },
      {
        id: 3,
        title: 'TOMORROW X TOGETHER WORLD TOUR ＜ACT：TOMORROW＞ IN TAIPEI',
        date: '2026/01/31 (六)  ~ 2026/02/01 (日) ',
        location: '臺北大巨蛋',
        status: '熱賣中',
        image:
          'https://static.tixcraft.com/images/activity/26_txt_99296655aefed82aac6fef02b5946791.jpg',
      },
      {
        id: 4,
        title: 'Christian Kuria Paradigm Live in Taipei 2025',
        date: '2025/11/14 (五)',
        location: 'Hana Space 花漾展演空間',
        status: '熱賣中',
        image:
          'https://static.tixcraft.com/images/activity/25_kuria_32a1022c2c069add3639189d34aa6c3f.png',
      },
      {
        id: 5,
        title: '2025-26 TREASURE TOUR [PULSE ON] IN TAIPEI',
        date: '2026/03/28 (六)',
        location: '國立體育大學綜合體育館（林口體育館)',
        status: '即將開賣',
        image:
          'https://static.tixcraft.com/images/activity/26_treasure_8e5cabef2a455b291a9e6646f800eb63.jpg',
      },
    ];
    const data = events;

    return NextResponse.json(data);
  } catch (err) {
    console.error('Register API error:', err);
    return NextResponse.json({ error: '伺服器錯誤' }, { status: 500 });
  }
}
