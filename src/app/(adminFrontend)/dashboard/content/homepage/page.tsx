"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CardHeader } from "@/components/ui/CardHeader";
import { CardContent } from "@/components/ui/CardContent";
import { CardTitle } from "@/components/ui/CardTitle";import { Loader2, Edit2, Trash2, PlusCircle } from "lucide-react";

export default function HomepageContent() {
  const [contentList, setContentList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingContent, setEditingContent] = useState<any | null>(null);
  const [formData, setFormData] = useState({ title: "", content: "" });

  // ✅ Fetch homepage content
  const fetchHomepage = async () => {
    try {
      const res = await fetch("/api/page-content");
      const data = await res.json();
      const filtered = data.filter((item: any) =>
        item.title.toLowerCase().includes("home")
      );
      setContentList(filtered);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Add or update homepage section
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingContent ? "PUT" : "POST";
    const url = editingContent
      ? `/api/page-content/${editingContent.id}`
      : "/api/page-content";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setFormData({ title: "", content: "" });
      setEditingContent(null);
      fetchHomepage();
    }
  };

  // ✅ Delete homepage section
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this content?")) return;
    await fetch(`/api/page-content/${id}`, { method: "DELETE" });
    fetchHomepage();
  };

  useEffect(() => {
    fetchHomepage();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <Card className="shadow-md border border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Homepage Content</span>
            <PlusCircle className="text-[var(--brand-gold)]" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Section Title (e.g., Hero Heading)"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full border rounded-md p-2"
              required
            />
            <textarea
              placeholder="Homepage Content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full border rounded-md p-2 h-32"
              required
            />
            <Button
              type="submit"
              className="bg-[var(--brand-gold)] text-white hover:opacity-90"
            >
              {editingContent ? "Update Section" : "Add Section"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {loading ? (
          <div className="flex items-center justify-center col-span-full">
            <Loader2 className="animate-spin" />
          </div>
        ) : contentList.length === 0 ? (
          <p className="text-gray-500 text-center col-span-full">
            No homepage content found
          </p>
        ) : (
          contentList.map((item) => (
            <Card key={item.id} className="shadow-sm border border-gray-200">
              <CardHeader>
                <CardTitle className="flex justify-between">
                  <span>{item.title}</span>
                  <div className="flex space-x-2">
                    <Edit2
                      onClick={() => {
                        setEditingContent(item);
                        setFormData({ title: item.title, content: item.content });
                      }}
                      className="cursor-pointer text-blue-600"
                    />
                    <Trash2
                      onClick={() => handleDelete(item.id)}
                      className="cursor-pointer text-red-600"
                    />
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {item.content}
                </p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
