"use client";

import { useState, useEffect, ChangeEvent } from "react";
import Image from "next/image";
import { ServicePageType } from "@/types/services";
import uploadImageCloudinary from "@/lib/uploadImageCloudinary";
import toast from "react-hot-toast";

// Props for the admin page, receives the service page ID
type ServicesAdminPageProps = {
  servicePageId: number;
};
//for the image
type ImageData = {
  id: number;
  heroImage: string;
  prevCloudinaryImgId: string;
};

// Form type for each service grid item
type ServiceItemForm = {
  id?: number; // Existing service ID (undefined if new)
  title: string; // Service title / heading
  quote: string; // Service quote / slogan
  description: string; // Service description
  imageFile?: File | null; // New image file (for uploading)
  imageUrl?: string; // Current image URL (for preview)
  prevCloudinaryImgId?: string;
  slug: string; // Slug for routing / URL
};

export default function ServicesAdminPage({}: ServicesAdminPageProps) {
  // State for hero image file and preview
  const [heroImageFile, setHeroImageFile] = useState<File | null>(null);
  const [heroImagePreview, setHeroImagePreview] = useState<string | null>(null);

  // State for all services in the grid
  const [services, setServices] = useState<ServiceItemForm[]>([]);

  // Loading indicator while fetching data
  const [loading, setLoading] = useState(true);

  //Image value for cloudinary
  const [imageData, setImageData] = useState<ImageData | null>(null);

  // ------------------------------
  // Fetch initial data from API
  // ------------------------------
  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/services`);
      const data: ServicePageType = await res.json();

      // Map backend services into form-friendly structure
      setServices(
        data.services.map((s) => ({
          id: s.id,
          title: s.title,
          quote: s.quote,
          description: s.description,
          imageUrl: s.imageUrl,
          prevCloudinaryImgId: s.prevCloudinaryImgId,
          slug: s.slug,
        }))
      );
      setImageData({
        id: data.id,
        prevCloudinaryImgId: data.prevCloudinaryImgId,
        heroImage: data.heroImage,
      });

      // Set hero image preview
      setHeroImagePreview(data.heroImage);
      setLoading(false);
    }

    fetchData();
  }, []);

  // ------------------------------
  // Handle hero image upload + backend update
  // ------------------------------
  const handleHeroChange = async (file: File) => {
    if (!imageData?.id) return toast.error("Service ID not found");

    const toastId = toast.loading("Uploading...");
    try {
      let id = imageData?.id;
      let prevCloudinaryImgId = imageData?.prevCloudinaryImgId;
      let newImgUrl: string | undefined;
      let newImgPublicId: string | undefined;

      // Preview immediately for better UX
      setHeroImageFile(file);
      setHeroImagePreview(URL.createObjectURL(file));

      // Upload to Cloudinary
      const cloudData = await uploadImageCloudinary(file, "services");

      if (cloudData) {
        newImgUrl = cloudData.url;
        newImgPublicId = cloudData.publicId;
      } else {
        throw new Error("Cloudinary upload failed");
      }
      toast.success("Upload Successful");

      //delete previous image from cloudinary to save space
      if (newImgPublicId) {
        await fetch("/api/deleteOldCloudinaryImage", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            publicId: prevCloudinaryImgId,
          }),
        });
      }
      toast.success("👍");

      // save new contact page data
      const res = await fetch(`/api/services/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prevCloudinaryImgId: newImgPublicId,
          heroImage: newImgUrl,
        }),
      });
      toast.success("Saved!!");
    } catch (error) {
      toast.error("Failed to upload hero image");
    }
  };

  // ------------------------------
  // Handle changes to a single service field
  // ------------------------------
  const handleServiceChange = (
    index: number, // which service in the array to update
    field: "title" | "quote" | "description" | "imageUrl" | "imageFile", // which property to update
    value: string | File // the new value
  ) => {
    setServices((prev) => {
      if (!prev) return prev; // safety check

      // copy the array so we don't mutate state
      const newServices = [...prev];

      // copy the specific service object and update the field
      newServices[index] = {
        ...newServices[index],
        [field]: value,
      };

      return newServices;
    });
  };

  // ------------------------------
  // Add a new blank service card
  // ------------------------------
  const addService = () => {
    setServices([
      ...services,
      { title: "", quote: "", description: "", slug: "", imageFile: null },
    ]);
  };

  // ------------------------------
  // Remove a service (both frontend & backend if exists)
  // ------------------------------
  const removeService = async (index: number) => {
    const service = services[index];
    if (service.id) {
      // Call backend API to delete existing service
      await fetch(`/api/services/service-data/${service.id}`, {
        method: "DELETE",
      });
    }
    const newServices = [...services];
    newServices.splice(index, 1); // Remove from frontend
    setServices(newServices);
    /* DELETE DISABLED: removing this item also requires deleting its Cloudinary image, which needs an imageId not handled initially. */
  };

  // ------------------------------
  // Save a service (add or update)
  // ------------------------------
  const saveService = async (index: number) => {
    const service = services[index];
    if (!service) return;

   

    try {
      const toastId = toast.loading("Uploading...");

      let imageUrl = service.imageUrl;
      let publicId = service.prevCloudinaryImgId;

      // Upload image if a new file exists
      if (service.imageFile) {
        const cloudData = await uploadImageCloudinary(
          service.imageFile,
          "services"
        );

        if (!cloudData) throw new Error("Cloudinary upload failed");

        // set new imageUrl and publicId
        imageUrl = cloudData.url;
        publicId = cloudData.publicId;

        // Delete previous image from Cloudinary if it exists
        if (service.prevCloudinaryImgId) {
          await fetch("/api/deleteOldCloudinaryImage", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ publicId: service.prevCloudinaryImgId }),
          });
        }
      }

      // Prepare payload for backend
      const payload = {
        ...service,
        imageUrl, // final URL (old or new)
        prevCloudinaryImgId: publicId, // final publicId
        slug: service.title?.toLowerCase().replace(/\s+/g, "-"), // slug from title
      };

      // Determine method and endpoint
      const method = service.id ? "PUT" : "POST";
      const endpoint = service.id
        ? `/api/services/service-data/${service.id}`
        : `/api/services/service-data`;

      console.log("Before fetch to backend");

      // Send to backend
      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const data = await res.json();

        // Update state only if new service
        if (!service.id) {
          setServices((prev) => {
            const copy = [...prev];
            copy[index] = data.service; // backend provides id
            return copy;
          });
        }

        toast.success("Service saved successfully!", { id: toastId });
      } else {
        toast.error("Failed to save service", { id: toastId });
      }
    } catch (error) {
      console.error(error);
      toast.error("Network error, failed to save service");
    }
  };

  // ------------------------------
  // Render loading state
  // ------------------------------
  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-12">
      <h1 className="text-3xl font-bold mb-4">Services Page Admin</h1>

      {/* ---------------- Hero Image Section ---------------- */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Hero Image</h2>

        {/* Preview current hero image */}
        {heroImagePreview && (
          <Image
            src={heroImagePreview}
            alt="Hero Preview"
            width={200}
            height={120}
            className="rounded-md w-36 h-auto object-cover"
          />
        )}

        {/* Input to update hero image */}
        <label className="block mt-2 font-semibold">Update Hero Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];

            if (file) {
              setHeroImagePreview(URL.createObjectURL(file));
              setHeroImageFile(file);
            }
          }}
        />
        <button
          onClick={() => handleHeroChange(heroImageFile!)}
          disabled={!heroImageFile}
          className="btn-gold px-3 py-1 text-sm"
        >
          Save
        </button>
      </section>

      {/* ---------------- Services Grid Section ---------------- */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold">Services Grid</h2>

        {/* Grid layout */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <div
              key={service.id ?? `new-${i}`}
              className="border p-4 rounded-md space-y-3 shadow-md bg-[var(--background)]"
            >
              {/* Preview current service image */}
              {service.imageUrl && (
                <Image
                  src={service.imageUrl}
                  alt={service.title}
                  width={100}
                  height={100}
                  className="rounded-md h-auto w-24 object-cover"
                />
              )}

              {/* Input to update service image */}
              <label className="block font-semibold">Update Image</label>

              <input
                type="file"
                accept="image/*"
                className="w-full h-auto"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return toast.error("Invalid image uploaded");

                  // Save file (for upload later)
                  handleServiceChange(i, "imageFile", file);

                  // Save preview URL (for UI)
                  handleServiceChange(i, "imageUrl", URL.createObjectURL(file));
                }}
              />

              {/* Service Title */}
              <label className="block font-semibold">Title </label>
              <input
                type="text"
                value={service.title}
                onChange={(e) =>
                  handleServiceChange(i, "title", e.target.value)
                }
                className="w-full"
              />

              {/* Service Quote */}
              <label className="block font-semibold">Quote </label>
              <input
                type="text"
                value={service.quote}
                onChange={(e) =>
                  handleServiceChange(i, "quote", e.target.value)
                }
                className="w-full"
              />

              {/* Service Description */}
              <label className="block font-semibold">Description</label>
              <textarea
                value={service.description}
                onChange={(e) =>
                  handleServiceChange(i, "description", e.target.value)
                }
                className="w-full h-40"
              />

              {/* Service Slug */}
              {/* <label className="block font-semibold">Slug</label>
              <input
                type="text"
                value={service.slug}
                onChange={(e) => handleServiceChange(i, "slug", e.target.value)}
                className="w-full"
              /> */}

              {/* Save & Delete Buttons */}
              <div className="flex justify-between mt-2">
                <button
                  onClick={() => saveService(i)}
                  className="btn-gold px-3 py-1 text-sm"
                >
                  Save
                </button>
                {/* <button
                  onClick={() => removeService(i)}
                  className="btn-gold px-3 py-1 text-sm"
                >
                  Delete
                </button> 
                COMMENT: Delete disabled-removing this item also requires deleting its Cloudinary image, which needs an imageId not handled initially. 

                */}
              </div>
            </div>
          ))}
        </div>

        {/* Button to add new service */}
        <button onClick={addService} className="btn-gold mt-4">
          Add New Service
        </button>
      </section>
    </div>
  );
}
