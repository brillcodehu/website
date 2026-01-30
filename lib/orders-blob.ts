import { list, put } from '@vercel/blob';

const ORDERS_PATH = 'orders.json';

export type OrderRecord = {
  timestamp: string;
  name: string;
  email: string;
  phone?: string;
  business: string;
  goal: string;
  hasWebsite?: string;
  notes?: string;
};

export async function appendOrder(record: OrderRecord): Promise<void> {
  let orders: OrderRecord[] = [];
  try {
    const { blobs } = await list({ prefix: 'orders', limit: 10 });
    const existing = blobs.find((b) => b.pathname === ORDERS_PATH);
    if (existing?.url) {
      const res = await fetch(existing.url);
      if (res.ok) {
        const text = await res.text();
        const parsed = JSON.parse(text);
        if (Array.isArray(parsed)) orders = parsed;
      }
    }
  } catch {
    // first time or missing blob – start with empty array
  }
  orders.push(record);
  await put(ORDERS_PATH, JSON.stringify(orders, null, 2), {
    access: 'public',
    allowOverwrite: true,
  });
}

export async function getOrders(): Promise<OrderRecord[]> {
  try {
    const { blobs } = await list({ prefix: 'orders', limit: 10 });
    const existing = blobs.find((b) => b.pathname === ORDERS_PATH);
    if (!existing?.url) return [];
    const res = await fetch(existing.url);
    if (!res.ok) return [];
    const text = await res.text();
    const parsed = JSON.parse(text);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}
