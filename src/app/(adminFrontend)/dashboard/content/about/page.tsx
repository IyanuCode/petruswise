"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import uploadImageCloudinary from "@/lib/uploadImageCloudinary";
import {
  AboutPageHeroUpdateRequestDTO,
  AboutPageCeoResponseDTO,
  StaffRequestDTO,
} from "@/lib/dto/aboutPage.dto";
import { AboutPageType } from "@/types/about";

export default function AboutAdminPage() {
  // Receive the get endpoint
  const [aboutPage, setAboutPage] = useState<AboutPageType | any>(null);
  // shows loading when fetching data
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  // landing page image
  const [newHeroImage, setNewHeroImage] = useState<string>("");

  // CEO SECTION STATE
  const [ceo, setCeo] = useState({
    name: "",
    title: "",
    bio: "",
    quote: "",
    imageUrl: "",
    prevCloudinaryImgId: "",
  });

  const [newCeoImage, setNewCeoImage] = useState("");
  const [ceoUploading, setCeoUploading] = useState(false);
  const [ceoSaving, setCeoSaving] = useState(false);

  // STAFF STATE
const [showStaffModal, setShowStaffModal] = useState(false);
const [editingStaff, setEditingStaff] = useState<any>(null);

const [staffForm, setStaffForm] = useState({
  name: "",
  role: "",
  experience: "",
  bio: "",
  overlayText: "",
  prevCloudinaryImgId: "",
  imageUrl: "",
});

const [newStaffImage, setNewStaffImage] = useState("");
const [staffUploading, setStaffUploading] = useState(false);
const [savingStaff, setSavingStaff] = useState(false);


  // ===============================
  // 1. LOAD EXISTING ABOUT PAGE
  // ===============================
  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/api/about-page");
        const data = await res.json();
        setAboutPage(data);

        //load CEO data
        setCeo({
          name: data.meetOurCeo?.name || "",
          title: data.meetOurCeo?.title || "",
          bio: data.meetOurCeo?.bio || "",
          quote: data.meetOurCeo?.quote || "",
          imageUrl: data.meetOurCeo?.imageUrl || "",
          prevCloudinaryImgId: data.meetOurCeo?.prevCloudinaryImgId || "",
        });
      } catch (error) {
        console.error(error);
        toast.error("Failed to load About Page");
      }
    }
    loadData();
  }, []);

  console.log("checking ceo value", ceo);

  // ===============================
  // 2. HANDLE HERO IMAGE UPLOAD
  // ===============================
  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const toastId = toast.loading("Uploading...");

    try {
      //upload the image to cloudinary
      const uploadImg = await uploadImageCloudinary(file, "about");

      if (!uploadImg) {
        throw new Error("Upload failed");
      }

      const imageUrl = uploadImg.url;
      const imageId = uploadImg.publicId;
      const toDeleteImgId = aboutPage.prevCloudinaryImgId;

      // Delete old image
      if (imageId && toDeleteImgId) {
        await fetch("/api/deleteOldCloudinaryImage", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            publicId: toDeleteImgId,
          }),
        });

        // Update state

        setNewHeroImage(imageUrl);
        setAboutPage((prev: any) => {
          if (!prev) return null;
          return {
            ...prev,
            prevCloudinaryImgId: imageId, // store new cloudinary ID
            aboutHeroImage: imageUrl, //  live preview
          };
        });
      }

      toast.success("Image uploaded successfully!", { id: toastId });
    } catch (error) {
      console.error(error);
      toast.error("Image upload failed", { id: toastId });
    } finally {
      setUploading(false);
    }
  }

  // ===============================
  // 3. SAVE HERO IMAGE UPDATE
  // ===============================
  async function saveHeroSection() {
    if (!newHeroImage) {
      toast.error("Please upload an image first");
      return;
    }

    setSaving(true);

    try {
      const dto: AboutPageHeroUpdateRequestDTO = {
        aboutHeroImage: newHeroImage,
        prevCloudinaryImgId: aboutPage?.prevCloudinaryImgId,
      };

      const res = await fetch("/api/about-page/", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dto),
      });

      if (!res.ok) throw new Error("Failed to update hero image");

      toast.success("Hero section updated!");

      // Refresh UI
      const updated = await fetch("/api/about-page").then((r) => r.json());
      setAboutPage(updated);
      setNewHeroImage(""); // clear preview
    } catch (error) {
      console.error(error);
      toast.error("Update failed");
    } finally {
      setSaving(false);
    }
  }

  // ===============================
  // 4. HANDLE CEO IMAGE UPLOAD
  // ===============================
  async function handleCeoImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setCeoUploading(true);
    const toastId = toast.loading("Uploading...");

    try {
      //upload the image to cloudinary
      const uploadImg = await uploadImageCloudinary(file, "about");

      if (!uploadImg) {
        throw new Error("Upload failed");
      }

      const imageUrl = uploadImg.url;
      const imageId = uploadImg.publicId;
      const oldImageId = ceo.prevCloudinaryImgId;

      // Delete old image
      if (imageId && oldImageId) {
        await fetch("/api/deleteOldCloudinaryImage", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            publicId: oldImageId,
          }),
        });

        // update UI preview and store IDs
        setNewCeoImage(imageUrl);
        setCeo((prev: any) => {
          if (!prev) return null;
          return {
            ...prev,
            prevCloudinaryImgId: imageId, // store new cloudinary ID
            imageUrl: imageUrl, //  live preview
          };
        });
      }

      toast.success("CEO Image uploaded successfully!", { id: toastId });
    } catch (error) {
      console.error(error);
      toast.error("CEO Image upload failed", { id: toastId });
    } finally {
      setCeoUploading(false);
    }
  }

  // ===============================
  // 5.SAVE CEO IMAGE UPDATE
  // ===============================
  async function saveCeoSection() {
    setCeoSaving(true);

    try {
      const dto: AboutPageCeoResponseDTO = {
        name: ceo.name,
        title: ceo.title,
        bio: ceo.bio,
        imageUrl: ceo.imageUrl,
        prevCloudinaryImgId: ceo.prevCloudinaryImgId,
        quote: ceo.quote,
      };
      const res = await fetch("/api/about-page/", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dto),
      });

      if (!res.ok) throw new Error("Failed to update CEO section");

      toast.success("CEO section updated successfully!");

      // Refresh About Page
      const updated = await fetch("/api/about-page").then((r) => r.json());
      setAboutPage(updated);

      // Update local state
      setCeo({
        name: updated.meetOurCeo.name,
        title: updated.meetOurCeo.title,
        bio: updated.meetOurCeo.bio,
        quote: updated.meetOurCeo.quote,
        imageUrl: updated.meetOurCeo.imageUrl,
        prevCloudinaryImgId: updated.meetOurCeo.prevCloudinaryImgId,
      });

      setNewCeoImage("");
    } catch (error) {
      toast.error("Update failed");
    } finally {
      setCeoSaving(false);
    }
  }

  // ===============================
  // 6. HANDLE STAFF IMAGE UPLOAD
  // ===============================
async function handleStaffImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
  const file = e.target.files?.[0];
  if (!file) return;

  setStaffUploading(true);

  const toastId = toast.loading("Uploading...");

  try {
    const uploadImg = await uploadImageCloudinary(file, "about");
    if (!uploadImg) {
        throw new Error("Upload failed");
      }
     const imageUrl = uploadImg.url;
      const imageId = uploadImg.publicId;
      const oldImageId = staffForm.prevCloudinaryImgId;

      // Delete old image
      if (imageId && oldImageId) {
        await fetch("/api/deleteOldCloudinaryImage", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            publicId: oldImageId,
          }),
        });

        // update UI preview and store IDs
        setNewStaffImage(imageUrl);
        setStaffForm((prev: any) => {
          if (!prev) return null;
          return {
            ...prev,
            prevCloudinaryImgId: imageId, // store new cloudinary ID
            imageUrl: imageUrl, //  live preview
          };
        });
      }

    toast.success("Staff Image uploaded successfully!", {id:toastId});
  } catch (error) {
    toast.error("Staff Upload failed", {id: toastId});
  } finally {
    setStaffUploading(false);
  }
}

  // ===============================
  // 7.SAVE STAFF IMAGE UPDATE
  // ===============================
  async function saveStaff() {
  setSavingStaff(true);

  try {
    const dto: StaffRequestDTO ={
      name: staffForm.name,
      role: staffForm.role,
      experience:staffForm.experience,
      bio:staffForm.bio,
      imageUrl: staffForm.imageUrl,
      prevCloudinaryImgId:staffForm.prevCloudinaryImgId,
      overlayText:staffForm.overlayText
    }
    const res = await fetch(
      editingStaff
        ? `/api/about-page/staff/${editingStaff.id}`
        : `/api/about-page/staff`,
      {
        method: editingStaff ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dto),
      }
    );

    if (!res.ok) throw new Error("Failed to save staff");

    toast.success("Staff saved successfully!");

    // Reload About Page
    const updated = await fetch("/api/about-page").then((r) => r.json());
    setAboutPage(updated);

    closeStaffModal();
  } catch (error) {
    toast.error("Failed to save staff");
  } finally {
    setSavingStaff(false);
  }
}

  

  function openStaffModal(staff: any | null) {
  setEditingStaff(staff);

  if (staff) {
    // Editing
    setStaffForm({
      name: staff.name,
      role: staff.role,
      experience: staff.experience,
      bio: staff.bio || "",
      overlayText: staff.overlayText || "",
      imageUrl: staff.imageUrl || "",
      prevCloudinaryImgId:staff.prevCloudinaryImgId || "",
    });
  } else {
    // Creating
    setStaffForm({
      name: "",
      role: "",
      experience: "",
      bio: "",
      overlayText: "",
      imageUrl: "",
      prevCloudinaryImgId:""
    });
  }

  setNewStaffImage("");
  setShowStaffModal(true);
}

function closeStaffModal() {
  setShowStaffModal(false);
}


  if (!aboutPage)
    return <p className="p-4 text-gray-500">Loading About Page…</p>;

  return (
    <div className="p-6 space-y-8">
      {/* ============================
          HERO SECTION PANEL
         ============================ */}
      <div className="border rounded-xl p-6 shadow-sm bg-white">
        <h2 className="text-xl font-semibold mb-4">Hero Section</h2>

        {/* Current Image */}
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">Current Hero Image</p>
          {aboutPage.aboutHeroImage ? (
            <Image
              src={aboutPage.aboutHeroImage}
              alt="Hero"
              width={500}
              height={300}
              className="rounded-lg border"
            />
          ) : (
            <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
              No Image
            </div>
          )}
        </div>

        {/* Upload New */}
        <div className="space-y-3">
          <Input type="file" accept="image/*" onChange={handleImageUpload} />

          {uploading && <p className="text-sm text-blue-600">Uploading…</p>}

          {/* Preview of New Image */}
          {newHeroImage && (
            <Image
              src={newHeroImage}
              alt="New Hero Preview"
              width={500}
              height={300}
              className="rounded-lg border mt-2"
            />
          )}
        </div>

        {/* Save Button */}
        <Button
          disabled={saving || uploading || !newHeroImage}
          onClick={saveHeroSection}
          className="mt-4"
        >
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      {/*
       ============================
        CEO SECTION PANEL
       ============================ 
   */}
      <div className="border rounded-xl p-6 shadow-sm bg-white">
        <h2 className="text-xl font-semibold mb-4">CEO Section</h2>

        {/* CURRENT CEO DATA */}
        <div className="space-y-4">
          {/* Current CEO Image */}
          <div>
            <p className="text-sm text-gray-600 mb-2">Current CEO Image</p>

            {aboutPage.meetOurCeo?.imageUrl ? (
              <Image
                src={aboutPage.meetOurCeo.imageUrl}
                alt="CEO"
                width={300}
                height={300}
                className="rounded-lg border"
              />
            ) : (
              <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                No Image
              </div>
            )}
          </div>

          {/* UPLOAD NEW CEO IMAGE */}
          <div>
            <Input
              type="file"
              accept="image/*"
              onChange={handleCeoImageUpload}
            />

            {ceoUploading && (
              <p className="text-sm text-blue-600 mt-1">Uploading…</p>
            )}

            {newCeoImage && (
              <Image
                src={newCeoImage}
                alt="New CEO Image Preview"
                width={300}
                height={300}
                className="rounded-lg border mt-2"
              />
            )}
          </div>

          {/* CEO NAME */}
          <div>
            <p className="text-sm text-gray-600 mb-1">CEO Name</p>
            <Input
              value={ceo.name}
              onChange={(e) => setCeo({ ...ceo, name: e.target.value })}
              placeholder="Enter CEO name"
            />
          </div>

          {/* TITLE */}
          <div>
            <p className="text-sm text-gray-600 mb-1">Title</p>
            <Input
              value={ceo.title}
              onChange={(e) => setCeo({ ...ceo, title: e.target.value })}
              placeholder="CEO Title e.g. Founder & CEO"
            />
          </div>

          {/* BIO */}
          <div>
            <p className="text-sm text-gray-600 mb-1">Bio</p>
            <textarea
              className="w-full border rounded-md p-2 min-h-[120px]"
              value={ceo.bio}
              onChange={(e) => setCeo({ ...ceo, bio: e.target.value })}
            ></textarea>
          </div>

          {/* QUOTE */}
          <div>
            <p className="text-sm text-gray-600 mb-1">Quote (optional)</p>
            <textarea
              className="w-full border rounded-md p-2 min-h-[80px]"
              value={ceo.quote}
              onChange={(e) => setCeo({ ...ceo, quote: e.target.value })}
            ></textarea>
          </div>

          {/* SAVE BUTTON */}
          <Button
            disabled={ceoSaving || ceoUploading}
            onClick={saveCeoSection}
            className="mt-2"
          >
            {ceoSaving ? "Saving..." : "Save CEO Section"}
          </Button>
        </div>
      </div>

      {/* 
    ============================
    STAFF SECTION PANEL
    ============================ 
   */}
      <div className="border rounded-xl p-6 shadow-sm bg-white mt-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Team / Staff Section</h2>

          <Button onClick={() => openStaffModal(null)}>+ Add New Staff</Button>
        </div>

        {/* STAFF LIST */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {aboutPage.meetOurTeam?.map((s: any) => (
            <div
              key={s.id}
              className=" border p-4 rounded-lg flex flex-col md:flex-row items-start gap-4 bg-gray-50"
            >
              <Image
                src={s.imageUrl || "/placeholder.jpg"}
                width={90}
                height={90}
                alt={s.name}
                className="rounded-lg border object-cover"
              />

              <div className="flex-1 space-y-1">
                <p className="font-semibold">{s.name}</p>
                <p className="text-sm text-gray-600">{s.role}</p>
                <p className="text-xs text-gray-500">{s.experience}</p>

                <Button
                  size="sm"
                  className="mt-2"
                  onClick={() => openStaffModal(s)}
                >
                  Edit
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* STAFF MODAL */}
{showStaffModal && (
 <div className="fixed inset-0 bg-black/40 flex items-center  justify-center z-50">
  <div className="bg-white rounded-xl p-4 w-[420px] max-h-[95vh] overflow-y-auto shadow-lg">
    {/* modal content */}

      <h3 className="text-lg font-semibold mb-4">
        {editingStaff ? "Edit Staff" : "Add New Staff"}
      </h3>

        {/* Image */}
        <div>
          <p className="text-sm text-gray-600 mb-1">Photo</p>
          <Input type="file" accept="image/*" onChange={handleStaffImageUpload} />

          {staffUploading && <p className="text-sm text-blue-600">Uploading...</p>}

          {(newStaffImage || staffForm.imageUrl) && (
            <Image
              src={newStaffImage || staffForm.imageUrl}
              width={200}
              height={200}
              className="rounded-lg mt-2 border"
              alt="staff"
            />
          )}
        </div>

        {/* NAME */}
        <div>
          <p className="text-sm">Name</p>
          <Input
            value={staffForm.name}
            onChange={(e) => setStaffForm({ ...staffForm, name: e.target.value })}
          />
        </div>

        {/* ROLE */}
        <div>
          <p className="text-sm">Role</p>
          <Input
            value={staffForm.role}
            onChange={(e) => setStaffForm({ ...staffForm, role: e.target.value })}
          />
        </div>

        {/* Experience */}
        <div>
          <p className="text-sm">Experience</p>
          <Input
            value={staffForm.experience}
            onChange={(e) => setStaffForm({ ...staffForm, experience: e.target.value })}
          />
        </div>

        {/* BIO */}
        <div>
          <p className="text-sm">Bio</p>
          <textarea
            className="w-full border rounded-md p-2 min-h-[100px]"
            value={staffForm.bio}
            onChange={(e) => setStaffForm({ ...staffForm, bio: e.target.value })}
          ></textarea>
        </div>

        {/* Overlay */}
        <div>
          <p className="text-sm">Overlay Text</p>
          <Input
            value={staffForm.overlayText}
            onChange={(e) =>
              setStaffForm({ ...staffForm, overlayText: e.target.value })
            }
          />
        </div>

        <Button
          className="w-full mt-2"
          disabled={savingStaff || staffUploading}
          onClick={saveStaff}
        >
          {savingStaff ? "Saving..." : "Save Staff"}
        </Button>

        <Button
          variant="default"
          className="w-full mt-2"
          onClick={closeStaffModal}
        >
          Cancel
        </Button>
      </div>
    </div>
          
)} 


    </div>
    
  );
}
