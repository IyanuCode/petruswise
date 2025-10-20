"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { toast } from "react-hot-toast";

export default function PageEditor() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPage() {
      const res = await fetch(`/api/page-content/${id}`);
      const data = await res.json();
      setTitle(data.title);
      setContent(data.content);
      setLoading(false);
    }
    loadPage();
  }, [id]);

  const handleSave = async () => {
    const res = await fetch(`/api/page-content/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });

    if (res.ok) toast.success("Page updated!");
    else toast.error("Error saving changes.");
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-[var(--heading)] mb-4">
        Edit Page: {title}
      </h1>

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full h-80 border border-[var(--border)] p-3 rounded mb-4"
      />

      <button
        onClick={handleSave}
        className="bg-[var(--brand-gold)] text-black px-4 py-2 rounded font-semibold hover:opacity-90"
      >
        Save Changes
      </button>
    </div>
  );
}
