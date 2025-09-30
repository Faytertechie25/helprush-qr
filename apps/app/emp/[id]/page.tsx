import { sql } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function EmpPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const rows = await sql`
    select emp_id, name, role, status, updated_at
    from employees where emp_id=${id}`;
  const emp = rows[0];

  if (!emp) {
    return <main style={{padding:24}}><h1>Not Verified</h1><p>No record for {id}</p></main>;
  }

  return (
    <main style={{padding:24}}>
      <h1>HelpRush Employee Verification</h1>
      <p><strong>Name:</strong> {emp.name}</p>
      <p><strong>Role:</strong> {emp.role ?? "—"}</p>
      <p><strong>Status:</strong> {emp.status}</p>
      <p style={{opacity:.6}}>Last updated: {new Date(emp.updated_at).toLocaleString()}</p>
    </main>
  );
}
