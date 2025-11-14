"use client";
// -----------------------------------Dependencies---------------------------------------
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { CardHeader } from "@/components/ui/CardHeader";
import { CardContent } from "@/components/ui/CardContent";
import { Button } from "@/components/ui/button";
import { ChevronDown, Plus, Edit2, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/Dialog";
import uploadImageCloudinary from "@/lib/uploadImageCloudinary";
import { updateOptions } from "recharts/types/state/rootPropsSlice";

// -----------------------------------Type Definition---------------------------------------
type ContactInfo = {
  id?: number;
  name: string;
  role: string;
  imageUrl: string | undefined;
  file: File | null;
  prevCloudinaryImgId: string | undefined;
  contactInfo: string;
};
type Testimonial = { id?: number; name: string; role: string; quote: string };
type Partner = {
  id?: number;
  name: string;
  logoUrl: string;
  prevCloudinaryImgId: string;
  file:File|null;
};

type ContactPageShape = {
  id?: number;
  heroTitle: string;
  heroParagraph: string;
  talkTitle: string;
  talkDescription: string;
  address: string;
  phone: string;
  email: string;
  heroImage: string;
  newImagePublicId?: string;
  prevCloudinaryImgId: string;
  keyContacts: ContactInfo[];
  testimonials: Testimonial[];
  partners: Partner[];
};
// --------------------------------------------------------------------------
export default function DashboardContactEditor() {
  const [data, setData] = useState<ContactPageShape | null>(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>("hero");
  const [saving, setSaving] = useState(false);

  //Modal states
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<ContactInfo | null>(
    null
  );

  //testimony
  const [testimonialModalOpen, setTestimonialModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] =
    useState<Testimonial | null>(null);

  //partner
  const [partnerModalOpen, setPartnerModalOpen] = useState(false);
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);

  //KeyContactImage
  const [KeyContactImage, setKeyContactImage] = useState<File | null>(null); //file to upload
  const [previewImage, setPreviewImage] = useState<string | null>(null); //preview url

  useEffect(() => {
    load();
  }, []);
  // -------------------------Fetch All ContactPage Data------------------------------------------
  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/contact-page");
      const json = await res.json();
      // normalize
      const normalized: ContactPageShape = {
        prevCloudinaryImgId: json?.prevCloudinaryImgId ?? "",
        heroImage: json?.heroImage ?? "",
        heroTitle: json?.heroTitle ?? "Contact PetrusWise",
        heroParagraph:
          json?.heroParagraph ??
          "We help organisations across Africa design systems...",
        talkTitle: json?.talkTitle ?? "Let’s talk solutions",
        talkDescription:
          json?.talkDescription ??
          "Whether you need regulatory clarity, ISO support, or a people strategy that scales — our consultants are ready.",
        address: json?.address ?? "",
        phone: json?.phone ?? "",
        email: json?.email ?? "",
        keyContacts: json?.keyContacts ?? json?.keyContacts ?? [],
        testimonials: json?.testimonials ?? [],
        partners: json?.partners ?? [],
      };
      setData(normalized);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load contact page");
    } finally {
      setLoading(false);
    }
  }

  if (loading || !data) {
    return <div className="p-6 text-center text-[var(--muted)]">Loading…</div>;
  }
  // ------------------HeroSection Backend------------------------------------------
  const saveMain = async () => {
    setSaving(true);

    try {
      const publicImgId = data.prevCloudinaryImgId;
      const newPublicId = data.newImagePublicId;
      // delete old if changed
      if (publicImgId && publicImgId !== newPublicId) {
        await fetch("/api/contact-page/deleteOldCloudinaryImage", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            publicId: publicImgId,
          }),
        });
      }

      // save new contact page data
      const res = await fetch("/api/contact-page", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("save failed");

      toast.success("Saved");
    } catch (err) {
      console.error(err);
      toast.error("Save failed");
    } finally {
      setSaving(false);
    }
    await load();
  };
  //-----------------KeyContact Backend----------------
  const openNewContact = () => {
    setEditingContact({
      name: "",
      role: "",
      contactInfo: "",
      imageUrl: "",
      file: null,
      prevCloudinaryImgId: "",
    });
    setContactModalOpen(true);
  };
  //only using submitContact
  const submitContact = async (payload: ContactInfo) => {
    const toastId = toast.loading("Uploading...");

    try {
      let newImgUrl: string | undefined;
      let newImgPublicId: string | undefined;
      const oldImgPublicId = payload.prevCloudinaryImgId;

      // Upload new image if a file is selected
      if (payload.file) {
        const cloudData = await uploadImageCloudinary(payload.file, "contact");

        if (cloudData) {
          newImgUrl = cloudData.url;
          newImgPublicId = cloudData.publicId;

          newImgPublicId
            ? console.log(
                "newImgPublicId is generated for cloudinary function and it's:" +
                  newImgPublicId
              )
            : console.log("newImgPublicId is not generated at all");

          payload.imageUrl = newImgUrl; // update payload with new image
          toast.success("Upload Successful", { id: toastId });
        } else {
          toast.error("Image upload failed", { id: toastId });
          return; // stop if upload failed
        }
      }

      // Delete old Cloudinary image if changed
      if (oldImgPublicId && oldImgPublicId !== newImgPublicId) {
        console.log("Deleting old Cloudinary image...");
        await fetch("/api/contact-page/deleteOldCloudinaryImage", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ publicId: oldImgPublicId }),
        });
      } else {
        console.log("Not deleting previous image");
      }
      if (newImgPublicId) {
        payload.prevCloudinaryImgId = newImgPublicId;
      }

      // Update or create contact
      if (payload.id) {
        // Update existing contact
        const res = await fetch(
          `/api/contact-page/key-contacts/${payload.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          }
        );
        if (!res.ok) throw new Error("Update failed");
        await load();
        toast.success("Contact updated");
      } else {
        // Create new contact
        const res = await fetch(`/api/contact-page/key-contacts`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Create failed");
        await load();
        toast.success("Contact added");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed", { id: toastId });
    } finally {
      setContactModalOpen(false);
    }
  };

  const deleteContact = async (id?: number) => {
    if (!id) return;
    if (!confirm("Delete contact?")) return;
    try {
      const res = await fetch(`/api/contact-page/key-contacts/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("delete failed");
      await load();
      toast.success("Deleted");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete");
    }
  };

  // -------------------------- Testimonials Backend ---------------------------------
  const openNewTestimonial = () => {
    setEditingTestimonial({ name: "", role: "", quote: "" });
    setTestimonialModalOpen(true);
  };

  const submitTestimonial = async (payload: Testimonial) => {
    try {
      if (payload.id) {
        const res = await fetch(
          `/api/contact-page/testimonials/${payload.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          }
        );
        if (!res.ok) throw new Error("update failed");
        await load();
        toast.success("Testimonial updated");
      } else {
        const res = await fetch(`/api/contact-page/testimonials`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("create failed");
        await load();
        toast.success("Testimonial added");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed");
    } finally {
      setTestimonialModalOpen(false);
    }
  };

  const deleteTestimonial = async (id?: number) => {
    if (!id) return;
    if (!confirm("Delete testimonial?")) return;
    try {
      const res = await fetch(`/api/contact-page/testimonials/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("delete failed");
      await load();
      toast.success("Deleted");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete");
    }
  };

  // ----------------------------- Partners Backend ------------------------------------------
  const openNewPartner = () => {
    setEditingPartner({ name: "", logoUrl: "", prevCloudinaryImgId: "", file:null});
    setPartnerModalOpen(true);
  };

  const submitPartner = async (payload: Partner) => {
    const toastId = toast.loading("Uploading...");

    try {
      let newImgUrl: string | undefined;
      let newImgPublicId: string | undefined;
      const oldImgPublicId = payload.prevCloudinaryImgId;

       // Upload new image if a file is selected
      if (payload.file) {
        const cloudData = await uploadImageCloudinary(payload.file, "contact");

        if (cloudData) {
          newImgUrl = cloudData.url;
          newImgPublicId = cloudData.publicId;

          newImgPublicId
            ? console.log(
                "newImgPublicId is generated for cloudinary function and it's:" +
                  newImgPublicId
              )
            : console.log("newImgPublicId is not generated at all");

          if (newImgUrl) {
            payload.logoUrl = newImgUrl; // update payload with new image
          }
          toast.success("Upload Successful", { id: toastId });
        } else {
          toast.error("Image upload failed", { id: toastId });
          return; // stop if upload failed
        }
      }

       // Delete old Cloudinary image if changed
      if (oldImgPublicId && oldImgPublicId !== newImgPublicId) {
        console.log("Deleting old Cloudinary image...");
        await fetch("/api/contact-page/deleteOldCloudinaryImage", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ publicId: oldImgPublicId }),
        });
      } else {
        console.log("Not deleting previous image");
      }
      // updating prevCloudinaryImgId
      if (newImgPublicId) {
        payload.prevCloudinaryImgId = newImgPublicId;
      }

      
      if (payload.id) {
        const res = await fetch(`/api/contact-page/partners/${payload.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("update failed");
        await load();
        toast.success("Partner updated");
      } else {
        const res = await fetch(`/api/contact-page/partners`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("create failed");
        await load();
        toast.success("Partner added");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed");
    } finally {
      setPartnerModalOpen(false);
    }
  };
//NOT-USED
  const deletePartner = async (id?: number) => {
    if (!id) return;
    if (!confirm("Delete partner?")) return;
    try {
      const res = await fetch(`/api/contact-page/partners/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("delete failed");
      await load();
      toast.success("Deleted");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete");
    }
  };

  // UI components
  const SectionHeader = ({ id, title }: { id: string; title: string }) => (
    // reuseable toggle button used to expands & collapse section controlled by expanded state
    <button
      onClick={() => setExpanded((prev) => (prev === id ? null : id))}
      className="w-full text-left flex items-center justify-between"
    >
      <div className="text-lg font-semibold text-[var(--brand-gold)]">
        {title}
      </div>
      <ChevronDown
        className={`w-5 h-5 transition-transform ${
          expanded === id ? "rotate-180" : ""
        }`}
      />
    </button>
  );

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-[var(--brand-gold)]">
        Contact Page Editor
      </h1>
      <p className="text-[var(--muted)]">
        Open a section to edit. Use Add to create new items. Save affects server
        immediately.
      </p>

      {/* ------------------------------HERO SECTION------------------------------ */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <Card>
          <CardHeader>
            <SectionHeader id="hero" title="Hero Section" />
          </CardHeader>

          {expanded === "hero" && (
            <CardContent>
              <div className="grid gap-3">
                <div>
                  <div className="text-sm text-[var(--muted)] mb-1">
                    Current Contact Image
                  </div>
                  {/* current image preview */}
                  {data.heroImage && (
                    <img
                      src={data.heroImage}
                      alt="Contact Hero Image"
                      className="w-full h-50 object-contain rounded mb-2 border-l border-[var(--border)]"
                    />
                  )}

                  {/* file input */}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;

                      const toastId = toast.loading("Uploading...");
                      const tempUrl = URL.createObjectURL(file);
                      setData((prev) => ({ ...prev!, heroImage: tempUrl }));
                      //Upload to cloudinary
                      try {
                        const cloudData = await uploadImageCloudinary(
                          file,
                          "contact"
                        ); // returns { url, publicId }
                        if (cloudData) {
                          setData((prev) => ({
                            ...prev!,
                            heroImage: cloudData.url,
                            newImagePublicId: cloudData.publicId,
                          }));
                          toast.success("Upload Successful", { id: toastId });
                        } else {
                          toast.error("Image upload failed", { id: toastId });
                        }
                      } catch (err) {
                        console.error(err);
                        toast.error("Upload failed", { id: toastId });
                      }
                    }}
                    className="w-full p-2 border border-[var(--border)] rounded"
                  />
                </div>

                <label>
                  <div className="text-sm text-[var(--muted)] mb-1">
                    Hero Title
                  </div>
                  <input
                    value={data.heroTitle}
                    onChange={(e) =>
                      setData({ ...data, heroTitle: e.target.value })
                    }
                    className="w-full p-2 border border-[var(--border)] rounded"
                  />
                </label>

                <label>
                  <div className="text-sm text-[var(--muted)] mb-1">
                    Hero Paragraph
                  </div>
                  <textarea
                    value={data.heroParagraph}
                    onChange={(e) =>
                      setData({ ...data, heroParagraph: e.target.value })
                    }
                    className="w-full p-2 border border-[var(--border)] rounded h-28"
                  />
                </label>

                <div className="flex justify-end gap-2">
                  <Button
                    onClick={() => {
                      saveMain();
                    }}
                    className="bg-[var(--brand-gold)] text-black"
                  >
                    Save Hero
                  </Button>
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      </motion.div>

      {/* -------------------------LETS'S TALK SOLUTION--------------------------- */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <Card>
          <CardHeader>
            <SectionHeader id="talk" title="Let’s Talk Solutions" />
          </CardHeader>

          {expanded === "talk" && (
            <CardContent>
              <div className="grid gap-3">
                <label>
                  <div className="text-sm text-[var(--muted)] mb-1">Title</div>
                  <input
                    value={data.talkTitle}
                    onChange={(e) =>
                      setData({ ...data, talkTitle: e.target.value })
                    }
                    className="w-full p-2 border border-[var(--border)] rounded"
                  />
                </label>

                <label>
                  <div className="text-sm text-[var(--muted)] mb-1">
                    Description
                  </div>
                  <textarea
                    value={data.talkDescription}
                    onChange={(e) =>
                      setData({ ...data, talkDescription: e.target.value })
                    }
                    className="w-full p-2 border border-[var(--border)] rounded h-28"
                  />
                </label>

                <div className="flex justify-end gap-2">
                  <Button
                    onClick={() => saveMain()}
                    className="bg-[var(--brand-gold)] text-black"
                  >
                    Save Talk
                  </Button>
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      </motion.div>

      {/* -------------------------------CONTACT INFO---------------------------- */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <Card>
          <CardHeader>
            <SectionHeader
              id="info"
              title="Contact Info (Address, Phone, Email)"
            />
          </CardHeader>

          {expanded === "info" && (
            <CardContent>
              <div className="grid gap-3">
                <label>
                  <div className="text-sm text-[var(--muted)] mb-1">
                    Address
                  </div>
                  <textarea
                    value={data.address}
                    onChange={(e) =>
                      setData({ ...data, address: e.target.value })
                    }
                    className="w-full p-2 border border-[var(--border)] rounded h-20"
                  />
                </label>

                <div className="grid md:grid-cols-2 gap-3">
                  <label>
                    <div className="text-sm text-[var(--muted)] mb-1">
                      Phone
                    </div>
                    <input
                      value={data.phone}
                      onChange={(e) =>
                        setData({ ...data, phone: e.target.value })
                      }
                      className="w-full p-2 border border-[var(--border)] rounded"
                    />
                  </label>

                  <label>
                    <div className="text-sm text-[var(--muted)] mb-1">
                      Email
                    </div>
                    <input
                      value={data.email}
                      onChange={(e) =>
                        setData({ ...data, email: e.target.value })
                      }
                      className="w-full p-2 border border-[var(--border)] rounded"
                    />
                  </label>
                </div>

                <div className="flex justify-end gap-2">
                  <Button
                    onClick={() => saveMain()}
                    className="bg-[var(--brand-gold)] text-black"
                  >
                    Save Contact Info
                  </Button>
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      </motion.div>

      {/* -------------------------------KEY CONTACTS----------------------------- */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between w-full">
              <SectionHeader id="contacts" title="Key Contacts" />
            </div>
          </CardHeader>

          {expanded === "contacts" && (
            <CardContent>
              <div className="grid gap-3">
                {data.keyContacts.length === 0 && (
                  <div className="text-[var(--muted)]">No contacts yet</div>
                )}
                <div className="grid md:grid-cols-2 gap-4">
                  {data.keyContacts.map((c, idx) => (
                    <div
                      key={c.id ?? idx}
                      className="p-4 rounded-lg border border-[var(--border)] bg-[var(--background)] flex justify-between items-start"
                    >
                      <div>
                        {/* The image field */}
                        <img
                          src={previewImage || c.imageUrl}
                          alt="key Contact Preview"
                          className="w-26 h-26 object-contain mb-2 border rounded-full"
                        />

                        <div className="font-semibold text-[var(--brand-gold)]">
                          {c.name}
                        </div>
                        <div className="text-sm text-[var(--muted)]">
                          {c.role}
                        </div>
                        <div className="text-xs mt-2">{c.contactInfo}</div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => {
                            setEditingContact(c);
                            setContactModalOpen(true);
                          }}
                          className="text-sm text-[var(--brand-gold)]"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      </motion.div>

      {/*---------------------------------TESTIMONIALS---------------------------- */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between w-full">
              <SectionHeader id="testimonials" title="Testimonials" />
              {/* <div>
                <Button onClick={openNewTestimonial} className="flex items-center gap-2 bg-[var(--brand-gold)] text-black">
                  <Plus /> Add New
                </Button>
              </div> */}
            </div>
          </CardHeader>

          {expanded === "testimonials" && (
            <CardContent>
              <div className="grid gap-3">
                {data.testimonials.length === 0 && (
                  <div className="text-[var(--muted)]">No testimonials yet</div>
                )}
                <div className="grid md:grid-cols-2 gap-4">
                  {data.testimonials.map((t, idx) => (
                    <div
                      key={t.id ?? idx}
                      className="p-4 rounded-lg border border-[var(--border)] bg-[var(--background)]"
                    >
                      <div className="italic">“{t.quote}”</div>
                      <div className="text-sm mt-2 font-semibold text-[var(--brand-gold)]">
                        {t.name}
                      </div>
                      <div className="text-xs text-[var(--muted)]">
                        {t.role}
                      </div>
                      <div className="mt-2 flex gap-2">
                        <button
                          onClick={() => {
                            setEditingTestimonial(t);
                            setTestimonialModalOpen(true);
                          }}
                          className="text-sm text-[var(--brand-gold)]"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteTestimonial(t.id)}
                          className="text-sm text-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      </motion.div>

      {/*-----------------------------------PARTNERS------------------------------- */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between w-full">
              <SectionHeader id="partners" title="Partners / Logos" />
              {/* <div>
                <Button onClick={openNewPartner} className="flex items-center gap-2 bg-[var(--brand-gold)] text-black">
                  <Plus /> Add New
                </Button>
              </div> */}
            </div>
          </CardHeader>

          {expanded === "partners" && (
            <CardContent>
              <div className="grid gap-3">
                {data.partners.length === 0 && (
                  <div className="text-[var(--muted)]">No partners yet</div>
                )}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {data.partners.map((p, idx) => (
                    <div
                      key={p.id ?? idx}
                      className="p-4 rounded-lg border border-[var(--border)] bg-[var(--background)] flex flex-col items-center text-center"
                    >
                      <img
                        src={p.logoUrl}
                        alt={p.name}
                        className="w-24 h-12 object-contain mb-2"
                      />
                      <div className="text-sm font-semibold">{p.name}</div>
                      <div className="mt-2 flex gap-2">
                        <button
                          onClick={() => {
                            setEditingPartner(p);
                            setPartnerModalOpen(true);
                          }}
                          className="text-sm text-[var(--brand-gold)]"
                        >
                          Edit
                        </button>
                        {/* <button
                          onClick={() => deletePartner(p.id)}
                          className="text-sm text-red-600"
                        >
                          Delete
                        </button> */}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      </motion.div>

      {/*-----------------------------------keyContact MODALS------------------------------- */}
      {/* ===Add Contact Modals === */}
      <Dialog open={contactModalOpen} onOpenChange={setContactModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingContact?.id ? "Edit Contact" : "Add Contact"}
            </DialogTitle>
            <DialogDescription>
              {editingContact?.id
                ? "Edit contact details."
                : "Add a new key contact."}
            </DialogDescription>
          </DialogHeader>
          <DialogBody>
            <div className="grid gap-3">
              <label>
                <div className="flex">
                  {/* upload the image  */}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setEditingContact((prev) =>
                          prev
                            ? {
                                ...prev,
                                imageUrl: URL.createObjectURL(file),
                                file,
                              }
                            : prev
                        );
                      }
                    }}
                  />
                  {/* display the upload image */}
                  <img
                    src={editingContact?.imageUrl}
                    alt={editingContact?.name}
                    className="w-26 h-26 object-contain mb-2 border rounded-full"
                  />
                </div>
                <div className="text-sm text-[var(--muted)] mb-1">Name</div>
                <input
                  className="w-full p-2 border border-[var(--border)] rounded"
                  value={editingContact?.name || ""}
                  onChange={(e) =>
                    setEditingContact((s) =>
                      s ? { ...s, name: e.target.value } : s
                    )
                  }
                />
              </label>
              <label>
                <div className="text-sm text-[var(--muted)] mb-1">Role</div>
                <input
                  className="w-full p-2 border border-[var(--border)] rounded"
                  value={editingContact?.role || ""}
                  onChange={(e) =>
                    setEditingContact((s) =>
                      s ? { ...s, role: e.target.value } : s
                    )
                  }
                />
              </label>
              <label>
                <div className="text-sm text-[var(--muted)] mb-1">
                  Contact Info
                </div>
                <input
                  className="w-full p-2 border border-[var(--border)] rounded"
                  value={editingContact?.contactInfo || ""}
                  onChange={(e) =>
                    setEditingContact((s) =>
                      s ? { ...s, contactInfo: e.target.value } : s
                    )
                  }
                />
              </label>
            </div>
          </DialogBody>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setContactModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={() => editingContact && submitContact(editingContact)}
              className="bg-[var(--brand-gold)] text-black"
            >
              {editingContact?.id ? "Save" : "Add"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ===Add Testimonial Modals === */}
      <Dialog
        open={testimonialModalOpen}
        onOpenChange={setTestimonialModalOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingTestimonial?.id ? "Edit Testimonial" : "Add Testimonial"}
            </DialogTitle>
            <DialogDescription>
              {editingTestimonial?.id
                ? "Update testimonial."
                : "Add a new testimonial."}
            </DialogDescription>
          </DialogHeader>
          <DialogBody>
            <div className="grid gap-3">
              <label>
                <div className="text-sm text-[var(--muted)] mb-1">
                  Author Name
                </div>
                <input
                  className="w-full p-2 border border-[var(--border)] rounded"
                  value={editingTestimonial?.name || ""}
                  onChange={(e) =>
                    setEditingTestimonial((s) =>
                      s ? { ...s, name: e.target.value } : s
                    )
                  }
                />
              </label>
              <label>
                <div className="text-sm text-[var(--muted)] mb-1">Role</div>
                <input
                  className="w-full p-2 border border-[var(--border)] rounded"
                  value={editingTestimonial?.role || ""}
                  onChange={(e) =>
                    setEditingTestimonial((s) =>
                      s ? { ...s, role: e.target.value } : s
                    )
                  }
                />
              </label>
              <label>
                <div className="text-sm text-[var(--muted)] mb-1">Quote</div>
                <textarea
                  className="w-full p-2 border border-[var(--border)] rounded h-24"
                  value={editingTestimonial?.quote || ""}
                  onChange={(e) =>
                    setEditingTestimonial((s) =>
                      s ? { ...s, quote: e.target.value } : s
                    )
                  }
                />
              </label>
            </div>
          </DialogBody>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setTestimonialModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={() =>
                editingTestimonial && submitTestimonial(editingTestimonial)
              }
              className="bg-[var(--brand-gold)] text-black"
            >
              {editingTestimonial?.id ? "Save" : "Add"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ===Add Partner Modals === */}
      <Dialog open={partnerModalOpen} onOpenChange={setPartnerModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingPartner?.id ? "Edit Partner" : "Add Partner"}
            </DialogTitle>
            <DialogDescription>
              {editingPartner?.id
                ? "Update partner info."
                : "Add a brand/partner."}
            </DialogDescription>
          </DialogHeader>
          <DialogBody>
            <div className="grid gap-3">
              <label>
                <div className="flex">
                  {/* upload logo */}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];

                      if (file) {
                        setEditingPartner((s) =>
                          s
                            ? { ...s, logoUrl: URL.createObjectURL(file), file }
                            : s
                        );
                      }
                    }}
                  />

                  {/* display the uploaded logo */}
                  <img
                    src={editingPartner?.logoUrl}
                    alt={editingPartner?.name}
                    className="w-26 h-26 object-contain mb-2 border rounded-full"
                  />
                </div>
                <div className="text-sm text-[var(--muted)] mb-1">Name</div>
                <input
                  className="w-full p-2 border border-[var(--border)] rounded"
                  value={editingPartner?.name || ""}
                  onChange={(e) =>
                    setEditingPartner((s) =>
                      s ? { ...s, name: e.target.value } : s
                    )
                  }
                />
              </label>
              {/* <label>
                <div className="text-sm text-[var(--muted)] mb-1">Logo URL</div>
                <input
                  className="w-full p-2 border border-[var(--border)] rounded"
                  value={editingPartner?.logoUrl || ""}
                  onChange={(e) =>
                    setEditingPartner((s) =>
                      s ? { ...s, logoUrl: e.target.value } : s
                    )
                  }
                />
              </label> */}
            </div>
          </DialogBody>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setPartnerModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={() => editingPartner && submitPartner(editingPartner)}
              className="bg-[var(--brand-gold)] text-black"
            >
              {editingPartner?.id ? "Save" : "Add"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
