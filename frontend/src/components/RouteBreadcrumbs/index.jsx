'use client';

import Link from 'next/link';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import { usePathname, useParams } from 'next/navigation';

// 你的頁面規則
const routeTitleMap = [
  { label: '活動', path: '/concert' },
  { label: '活動詳情', path: '/concert/:id' },
  { label: '購票', path: '/concert/:id/new' },
  { label: '票券交易', path: '/ticketTrading' },
  { label: '我的訂單', path: '/orderInquiry' },
  { label: '訂單完成', path: '/paymentSuccess' },
  { label: '常見問題', path: '/faq' },
];

export default function RouteBreadcrumbs({ showId = false }) {
  const pathname = usePathname(); // ex: /tw/concert/11/new
  const params = useParams();
  const lang = params.lang;
  const id = params.id;

  // 移除語言段 → ['concert','11','new']
  const segments = pathname
    .replace(/^\/|\/$/g, '')
    .split('/')
    .slice(1);

  let pathSoFar = [];
  const crumbs = segments.map((segment, index) => {
    pathSoFar.push(segment); // ex: ['concert'], ['concert','11'], ['concert','11','new']
    const currentPath = `/${pathSoFar.join('/')}`; // ex: /concert/11

    // 找對應 label
    const match =
      routeTitleMap.find((r) => {
        const rSegments = r.path.split('/').filter(Boolean);
        const segCount = pathSoFar.length;
        if (rSegments.length !== segCount) return false;

        return rSegments.every((s, i) => {
          if (s === ':id') return true;
          return s === pathSoFar[i];
        });
      }) || {};

    let label = match.label || segment;

    // 加上 id（如果有）
    if (match.path?.includes(':id') && showId && id) {
      label = `${label} ${id}`;
    }

    const isLast = index === segments.length - 1;
    const href = `/${lang}/${pathSoFar.join('/')}`;

    return isLast ? (
      <Typography key={href} color='text.primary'>
        {label}
      </Typography>
    ) : (
      <Link key={href} href={href} style={{ textDecoration: 'none', color: '#1976d2' }}>
        {label}
      </Link>
    );
  });

  return (
    <Breadcrumbs separator='/' aria-label='breadcrumb' sx={{ mx: 3, my: 1 }}>
      {crumbs}
    </Breadcrumbs>
  );
}
