// lib/uploadImageCloudinary.ts

export default async function uploadImageCloudinary(file: File, folder: string) {
  try {
    //Upload new image
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "default_upload"); 
    formData.append("asset_folder", `petruswise/${folder}`);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/dk0tsy61g/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!res.ok) throw new Error("Image upload failed");

    const data = await res.json();
    return {
        url:data.secure_url,
        publicId: data.public_id
    }; 
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return null;
  }
}
