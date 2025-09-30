import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function GET(_: Request, { params }: { params: { id: string }}) {
  const rows = await sql`select emp_id,name,role,status,updated_at from employees where emp_id=${params.id}`;
  if (!rows[0]) return NextResponse.json({ error: 'not_found' }, { status: 404, headers: {'X-Robots-Tag':'noindex'} });
  return NextResponse.json({
    emp_id: rows[0].emp_id,
    name: rows[0].name,
    role: rows[0].role,
    status: rows[0].status,
    last_updated: rows[0].updated_at
  }, { headers: {'X-Robots-Tag':'noindex','Cache-Control':'public, max-age=30, s-maxage=60'}});
}
