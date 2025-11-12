"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function EditUserPage() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "EDITOR",
  });

  // Load user data
  useEffect(() => {
    async function loadUser() {
      const res = await fetch(`/api/users/${id}`);
      const data = await res.json();
      setForm({ ...form, ...data, password: "" }); // don’t show password
      setLoading(false);
    }
    loadUser();
  }, [id]);

  // Handle form update
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`/api/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      toast.success("User updated successfully");
      router.push("/dashboard/users");
    } else {
      toast.error("Error updating user");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6 bg-[var(--background)] rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-[var(--brand-gold)]">
        Edit User
      </h1>

      <form onSubmit={handleUpdate} className="grid md:grid-cols-2 gap-4">
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2 rounded"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="border p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="New Password (leave blank to keep old one)"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="border p-2 rounded"
        />
        <select
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          className="border p-2 rounded"
        >
          <option value="ADMIN">ADMIN</option>
          <option value="EDITOR">EDITOR</option>
        </select>

        <button
          type="submit"
          className="md:col-span-2 bg-[var(--brand-gold)] text-black py-2 font-semibold rounded hover:opacity-90"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
