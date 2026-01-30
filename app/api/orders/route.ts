import { NextRequest, NextResponse } from 'next/server';
import { getOrders } from '@/lib/orders-blob';

export async function GET(request: NextRequest) {
  const secret = process.env.ORDERS_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: 'Megrendelések listázása nincs beállítva.' },
      { status: 500 }
    );
  }
  const provided =
    request.nextUrl.searchParams.get('secret') ??
    request.headers.get('authorization')?.replace(/^Bearer\s+/i, '');
  if (provided !== secret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const orders = await getOrders();
    return NextResponse.json(orders);
  } catch (e) {
    console.error('getOrders error:', e);
    return NextResponse.json(
      { error: 'Hiba a lista betöltése során.' },
      { status: 500 }
    );
  }
}
