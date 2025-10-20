"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import { set } from "zod";

interface PageContent {
    id: number;
    title: string;
    content: string;    
}

export default function contentDashboard() {
  const [pages, setPages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  //Fetch existing page contents
  useEffect(() => {
    const fetchPages = async () => {
      const res = await fetch("/api/pages-content");
      if (res.ok) {
        const data = await res.json();
        setPages(data);
      } else {
        toast.error("Failed to load page contents.");
      }
      setLoading(false);
    };

    fetchPages();
  }, []);

  const handleSave = async(id: string, content: string) => {
    const res = await fetch(`/api/pages-content/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({content}),
    });    
    if(res.ok){
        toast.success("Content updated successfully!");
    }
    else{
        toast.error("Failed to update content.");
    }
  };

  if(loading){
    return <p className="text-center mt-10 text-[var(--muted)]">Loading ...</p>
  }
  return <div>
    <div className="space-y-10">
        <h1 className="text-2xl font-semibold text-[var(--brand-gold)]">Page Content Management</h1>
      {pages.map((page) => (
        <div
          key={page.id}
          className="p-6 border border-[var(--border)] rounded-xl bg-[var(--background)] shadow-sm"
        >
          <h2 className="text-xl font-bold mb-3 text-[var(--heading)]">
            {page.title}
          </h2>
          <textarea
            className="w-full p-3 border border-[var(--border)] rounded mb-3 bg-[var(--background)] text-[var(--foreground)]"
            rows={6}
            defaultValue={page.content}
            onBlur={(e) => handleSave(page.id, e.target.value)}
          />
          <p className="text-sm text-[var(--muted)] italic">
            Changes are auto-saved when you click outside the box.
          </p>
        </div>
      ))}
    </div>
  </div>;
}
