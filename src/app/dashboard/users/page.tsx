"use client";
import { Admin } from '@prisma/client';
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

type User = {
    id: number;
    name: number;
    email: string;
    role: string;
}

export default function ManageUsers() {
    const {data: session} = useSession();
    const [users, setUsers] = useState<Admin[]> ([]);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "EDITOR",
    });

    //fetch users from the database and set to state
    const fetchUsers = async () =>{
        const res = await fetch('/api/users');
        const data = await res.json();
        setUsers(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    //Add user
    const handleAddUser = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
        });
        if(res.ok){
            setForm({
                name: "",
                email: "",
                password: "",
                role: "EDITOR",
            }); 
            fetchUsers();
        }   
    };
    
    //Delete user
    const handleDelete =async (id: number) => {
        if(!confirm("Are you sure you want to delete this user?")) return;
        await fetch(`/api/users/${id}`, {
            method: 'DELETE',
        });
        fetchUsers();
    };
    //Loading state
    if(loading){
        return <div>Loading...</div>;
    }

  return (
    <div className="p-6 bg-[var(--background)] text-[var(--foreground)] rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-[var(--brand-gold)]">User Management</h1>

      {/* Add User Form */}
      <form onSubmit={handleAddUser} className="grid md:grid-cols-2 gap-4 mb-8">
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
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="border p-2 rounded"
          required
        />
        <select
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          className="border p-2 rounded"
        >
          <option value="admin">ADMIN</option>
          <option value="editor">EDITOR</option>
        </select>
        <button
          type="submit"
          className="md:col-span-2 bg-[var(--brand-gold)] text-black py-2 font-semibold rounded hover:opacity-90"
        >
          Add User
        </button>
      </form>

       {/* Users Table */}
      <table className="w-full border border-[var(--border)] rounded-md overflow-hidden">
        <thead className="bg-[var(--brand-gold)] text-black">
          <tr>
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-left">Role</th>
            <th className="p-2 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-b border-[var(--border)]">
              <td className="p-2">{u.name}</td>
              <td className="p-2">{u.email}</td>
              <td className="p-2">{u.role}</td>
              <td className="p-2 text-center">
                <button
                  onClick={() => handleDelete(u.id)}
                  className="text-red-500 hover:underline"
                  disabled={session?.user?.email === u.email}
                >
                  {session?.user?.email === u.email ? "—" : "Delete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  )
}
