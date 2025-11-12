"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CardHeader } from "@/components/ui/CardHeader";
import { CardContent } from "@/components/ui/CardContent";
import { CardTitle } from "@/components/ui/CardTitle";import { Loader2, PlusCircle, Edit2, Trash2 } from "lucide-react";

export default function ServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] = useState<any | null>(null);
  const [formData, setFormData] = useState({ title: "", content: "" });

  // ✅ Fetch services
  const fetchServices = async () => {
    try {
      const res = await fetch("/api/page-content");
      const data = await res.json();
      const filtered = data.filter((item: any) => item.title.toLowerCase().includes("service"));
      setServices(filtered);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Create or update a service
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingService ? "PUT" : "POST";
    const url = editingService ? `/api/page-content/${editingService.id}` : "/api/page-content";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setFormData({ title: "", content: "" });
      setEditingService(null);
      fetchServices();
    }
  };

  // ✅ Delete a service
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    await fetch(`/api/page-content/${id}`, { method: "DELETE" });
    fetchServices();
  };

  // ✅ Load services on mount
  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <Card className="shadow-md border border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Manage Services</span>
            <PlusCircle className="text-[var(--brand-gold)]" />
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Service Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full border rounded-md p-2"
              required
            />
            <textarea
              placeholder="Service Description"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full border rounded-md p-2 h-32"
              required
            />
            <Button type="submit" className="bg-[var(--brand-gold)] text-white hover:opacity-90">
              {editingService ? "Update Service" : "Add Service"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {loading ? (
          <div className="flex items-center justify-center col-span-full">
            <Loader2 className="animate-spin" />
          </div>
        ) : services.length === 0 ? (
          <p className="text-gray-500 col-span-full text-center">No services found</p>
        ) : (
          services.map((service) => (
            <Card key={service.id} className="shadow-sm border border-gray-200">
              <CardHeader>
                <CardTitle className="flex justify-between">
                  <span>{service.title}</span>
                  <div className="flex space-x-2">
                    <Edit2
                      onClick={() => {
                        setEditingService(service);
                        setFormData({ title: service.title, content: service.content });
                      }}
                      className="cursor-pointer text-blue-600"
                    />
                    <Trash2
                      onClick={() => handleDelete(service.id)}
                      className="cursor-pointer text-red-600"
                    />
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-sm leading-relaxed">{service.content}</p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
