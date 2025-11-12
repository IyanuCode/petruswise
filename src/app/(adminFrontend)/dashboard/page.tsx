"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Activity, FileText, Mail, Users } from "lucide-react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type DashboardData = {
  stats: {
    pages: number;
    users: number;
    messages: number;
  };
  recentPages: { id: number; title: string; updatedAt: string }[];
  userCounts: { date: string; users: number; messages: number }[];
};

export default function DashboardHome() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/dashboard")
      .then((res) => res.json())
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="text-center py-20 text-[var(--brand-gold)]">
        Loading dashboard...
      </div>
    );

  if (!data)
    return (
      <div className="text-center py-20 text-red-500">
        Failed to load dashboard data.
      </div>
    );

  const { stats, recentPages } = data;

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--brand-gold)]">
            Dashboard Overview
          </h1>
          <p className="text-[var(--foreground)]/70 mt-1">
            Monitor your site performance, content, and user activities.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Pages" icon={<FileText />} value={stats.pages} />
        <StatCard title="Users" icon={<Users />} value={stats.users} />
        <StatCard title="Messages" icon={<Mail />} value={stats.messages} />
      </div>


        {/* Analytics Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mt-16 border border-[var(--border)] rounded-xl bg-[var(--background)] p-6 shadow-sm"
      >
        <h2 className="text-xl font-bold mb-6 text-[var(--brand-gold)]">
          Analytics Overview
        </h2>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.userCounts}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis
                dataKey="date"
                stroke="var(--muted)"
                fontSize={12}
                tickFormatter={(v) => v.slice(5)}
              />
              <YAxis stroke="var(--muted)" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--background)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#d4af37"
                strokeWidth={2}
                dot={{ r: 4, fill: "#d4af37" }}
                name="New Users"
              />
              <Line
                type="monotone"
                dataKey="messages"
                stroke="#b47d0e"
                strokeWidth={2}
                dot={{ r: 4, fill: "#b47d0e" }}
                name="Messages"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.section>

      {/* Recent Pages Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mt-12 border border-[var(--border)] rounded-xl bg-[var(--background)] shadow-sm"
      >
        <h2 className="text-xl font-bold p-6 border-b border-[var(--border)] text-[var(--brand-gold)]">
          Recently Updated Pages
        </h2>
        <ul className="divide-y divide-[var(--border)]">
          {recentPages.map((page) => (
            <li
              key={page.id}
              className="flex justify-between items-center p-4 hover:bg-[var(--brand-gold)]/5 transition"
            >
              <span>{page.title}</span>
              <span className="text-sm text-[var(--muted)]">
                {new Date(page.updatedAt).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
        {recentPages.length === 0 && (
          <p className="p-6 text-center text-[var(--muted)]">
            No recent updates.
          </p>
        )}
      </motion.section>

    
    </div>
  );
}

function StatCard({
  title,
  icon,
  value,
}: {
  title: string;
  icon: React.ReactNode;
  value: number;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      className="bg-[var(--background)] border border-[var(--border)] p-6 rounded-xl shadow-sm hover:shadow-lg"
    >
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold">{title}</h2>
        <div className="text-[var(--brand-gold)]">{icon}</div>
      </div>
      <p className="text-3xl font-bold text-[var(--brand-gold)]">{value}</p>
    </motion.div>
  );
}
