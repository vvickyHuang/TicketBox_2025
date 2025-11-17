import { NextResponse } from 'next/server';

function generateTickets(ticketTemplates) {
  return ticketTemplates.map((ticket) => {
    const ticketsAllQty = Math.floor(Math.random() * 200) + 1;
    const currentQty = Math.floor(Math.random() * (ticketsAllQty + 1));
    const remaining = ticketsAllQty - currentQty;
    const seat = '';
    const line = '';
    const email = '';
    const qty = 0;
    let badge = '';
    let status = '';

    if (remaining > 50) {
      badge = '充足';
      status = 'ok';
    } else if (remaining > 10) {
      badge = '餘票不多';
      status = 'limited';
    } else if (remaining > 0) {
      badge = `僅剩${remaining}張`;
      status = 'few';
    } else {
      badge = '售罄';
      status = 'soldout';
    }

    return {
      name: ticket.name,
      price: ticket.price,
      areaKey: ticket.areaKey,
      ticketsAllQty,
      currentQty,
      remaining,
      badge,
      status,
      qty,
      seat,
      line,
      email,
    };
  });
}

export async function POST(req) {
  try {
    const body = await req.json();
    const ticketTemplates = body.ticketTemplates;

    if (!ticketTemplates || !Array.isArray(ticketTemplates)) {
      return NextResponse.json({ error: 'Invalid ticketTemplates' }, { status: 400 });
    }

    const tickets = generateTickets(ticketTemplates);
    return NextResponse.json({ tickets });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
