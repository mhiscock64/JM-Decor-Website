import { addStaff, listStaff } from "@/lib/admin/actions";

export const metadata = { title: "Users" };

export default async function UsersPage() {
  const rows = await listStaff();
  return (
    <>
      <h1 className="font-display text-4xl">Users</h1>
      <p className="mt-1 font-body text-sm text-[oklch(50%_0.02_258)]">Admin accounts can manage staff. Staff can run the office.</p>
      <form action={addStaff} className="mt-6 grid gap-3 rounded-lg bg-white p-4 shadow-sm ring-1 ring-[oklch(90%_0.01_255)] md:grid-cols-5">
        <input name="name" placeholder="Name" required className="rounded-md border border-[oklch(90%_0.01_255)] px-3 py-2 font-body text-sm" />
        <input name="email" type="email" placeholder="Email" required className="rounded-md border border-[oklch(90%_0.01_255)] px-3 py-2 font-body text-sm" />
        <input name="password" type="password" minLength={8} placeholder="Password" required className="rounded-md border border-[oklch(90%_0.01_255)] px-3 py-2 font-body text-sm" />
        <select name="role" className="rounded-md border border-[oklch(90%_0.01_255)] px-3 py-2 font-body text-sm">
          <option value="staff">staff</option>
          <option value="admin">admin</option>
        </select>
        <button className="rounded-md bg-[oklch(27%_0.035_258)] px-3 py-2 font-body text-sm text-ivory">Add user</button>
      </form>
      <ul className="mt-4 divide-y divide-[oklch(90%_0.01_255)] rounded-lg bg-white font-body text-sm shadow-sm ring-1 ring-[oklch(90%_0.01_255)]">
        {rows.map((row) => (
          <li key={row.id} className="flex justify-between px-5 py-3"><span>{row.name} · {row.email}</span><span className="capitalize text-[oklch(50%_0.02_258)]">{row.role}</span></li>
        ))}
      </ul>
    </>
  );
}
