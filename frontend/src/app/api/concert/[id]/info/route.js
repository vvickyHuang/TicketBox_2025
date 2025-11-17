import { NextResponse } from 'next/server';

export async function GET(req, context) {
  try {
    const events = [
      {
        id: 11,
        title: 'BTS PERMISSION TO DANCE ON STAGE - TAIPEI',
        saleDate: '2025/11/20 (四）12:00',
        date: '2025/12/20(六) ~ 2025/12/21(日)',
        time: '19:30',
        location: '臺北大巨蛋',
        status: '熱售中',
        dateArr: [
          {
            date: '2025/12/20',
            time: '19:30',
            tickets: [
              {
                name: '特 A 區',
                areaKey: 'A',
                price: 6880,
              },
              {
                name: '特 B 區',
                areaKey: 'B',
                price: 6480,
              },
              {
                name: 'B2 看台區',
                areaKey: 'B2',
                price: 6280,
              },

              {
                name: 'B2 看台區 (部分視線遮蔽區)',
                areaKey: 'B2e',
                price: 5680,
              },
              {
                name: 'L2 看台區',
                areaKey: 'L2',
                price: 4880,
              },
              {
                name: 'L3 看台區',
                areaKey: 'L3',
                price: 3880,
              },
              {
                name: 'L4 看台區',
                areaKey: 'L4',
                price: 3680,
              },
              {
                name: 'L5 看台區',
                areaKey: 'L5',
                price: 2880,
              },
            ],
          },
          {
            date: '2025/12/21',
            time: '18:00',
            tickets: [
              {
                name: '特 A 區',
                areaKey: 'A',
                price: 6880,
              },
              {
                name: '特 B 區',
                areaKey: 'B',
                price: 6480,
              },
              {
                name: 'B2 看台區',
                areaKey: 'B2',
                price: 6280,
              },

              {
                name: 'B2 看台區 (部分視線遮蔽區)',
                areaKey: 'B2e',
                price: 5680,
              },
              {
                name: 'L2 看台區',
                areaKey: 'L2',
                price: 4880,
              },
              {
                name: 'L3 看台區',
                areaKey: 'L3',
                price: 3880,
              },
              {
                name: 'L4 看台區',
                areaKey: 'L4',
                price: 3680,
              },
              {
                name: 'L5 看台區',
                areaKey: 'L5',
                price: 2880,
              },
            ],
          },
        ],
        image: '/aiimg/btsbg.png',
        address: '台灣臺北市松山區南京東路4段',
        descMD: '/data/bts.md',
        locationImage:
          'https://static.tixcraft.com/images/activity/field/25_sjtp_7c2e042840f15cce3d866abd1dd0cb27.jpg',
      },
      {
        id: 1,
        title: 'SUPER JUNIOR 20th Anniversary TOUR ＜SUPER SHOW 10＞ in TAIPEI',
        saleDate: '2025/10/11 (六）12:00',
        date: '2025/11/14 (五)  ~ 2025/11/16 (日)',
        time: '19:30',
        location: '臺北大巨蛋',
        status: '熱售中',
        dateArr: [
          {
            date: '2025/11/14',
            time: '19:30',
            tickets: [
              {
                name: '特 A 區',
                areaKey: 'A',
                price: 6880,
              },
              {
                name: '特 B 區',
                areaKey: 'B',
                price: 6480,
              },
              {
                name: 'B2 看台區',
                areaKey: 'B2',
                price: 6280,
              },

              {
                name: 'B2 看台區 (部分視線遮蔽區)',
                areaKey: 'B2e',
                price: 5680,
              },
              {
                name: 'L2 看台區',
                areaKey: 'L2',
                price: 4880,
              },
              {
                name: 'L3 看台區',
                areaKey: 'L3',
                price: 3880,
              },
              {
                name: 'L4 看台區',
                areaKey: 'L4',
                price: 3680,
              },
              {
                name: 'L5 看台區',
                areaKey: 'L5',
                price: 2880,
              },
            ],
          },
          {
            date: '2025/11/15',
            time: '18:00',
            tickets: [
              {
                name: '特 A 區',
                areaKey: 'A',
                price: 6880,
              },
              {
                name: '特 B 區',
                areaKey: 'B',
                price: 6480,
              },
              {
                name: 'B2 看台區',
                areaKey: 'B2',
                price: 6280,
              },

              {
                name: 'B2 看台區 (部分視線遮蔽區)',
                areaKey: 'B2e',
                price: 5680,
              },
              {
                name: 'L2 看台區',
                areaKey: 'L2',
                price: 4880,
              },
              {
                name: 'L3 看台區',
                areaKey: 'L3',
                price: 3880,
              },
              {
                name: 'L4 看台區',
                areaKey: 'L4',
                price: 3680,
              },
              {
                name: 'L5 看台區',
                areaKey: 'L5',
                price: 2880,
              },
            ],
          },
          {
            date: '2025/11/16',
            time: '17:00',
            tickets: [
              {
                name: '特 A 區',
                areaKey: 'A',
                price: 6880,
              },
              {
                name: '特 B 區',
                areaKey: 'B',
                price: 6480,
              },
              {
                name: 'B2 看台區',
                areaKey: 'B2',
                price: 6280,
              },

              {
                name: 'B2 看台區 (部分視線遮蔽區)',
                areaKey: 'B2e',
                price: 5680,
              },
              {
                name: 'L2 看台區',
                areaKey: 'L2',
                price: 4880,
              },
              {
                name: 'L3 看台區',
                areaKey: 'L3',
                price: 3880,
              },
              {
                name: 'L4 看台區',
                areaKey: 'L4',
                price: 3680,
              },
              {
                name: 'L5 看台區',
                areaKey: 'L5',
                price: 2880,
              },
            ],
          },
        ],
        image:
          'https://static.tixcraft.com/images/activity/25_sjtp_853cb581812587601551359ae0ef9ed2.jpeg',
        address: '台灣臺北市松山區南京東路4段',
        descMD: '/data/event-info.md',
        locationImage:
          'https://static.tixcraft.com/images/activity/field/25_sjtp_7c2e042840f15cce3d866abd1dd0cb27.jpg',
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
