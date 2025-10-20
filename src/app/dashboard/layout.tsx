import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Dashboard",
  description: "Admin dashboard for managing the application",
};


export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if(!session) redirect("/login");
  return (
    <div className="min-h-screen grid grid-cols-[220px_1fr]">
      <aside className="bg-[var(--brand-gold)]/10 border-r border-[var(--border)] p-4">
        <h2 className="text-[var(--brand-gold)] font-bold mb-6">Admin</h2>
        <nav className="flex flex-col gap-3">
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/dashboard/users">Users</Link>
          <Link href="/dashboard/content">Content</Link>
          <Link href="/dashboard/settings">Settings</Link>
        </nav>
      </aside>

      <main className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-[var(--heading)]">Dashboard</h1>
          <Button variant="outline">Logout</Button>
        </div>
        <Card>{children}</Card>
      </main>
    </div>
  );
}
