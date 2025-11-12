import cloudinary from "@/lib/cloudinary";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { publicId  } = await req.json();
  if (!publicId) {

      return NextResponse.json({ error: "No publicImgId provided" }, { status: 400 });
    }

     // Delete the image
console.log("PUBLIC ID WE ARE DELETING:", publicId);
const result = await cloudinary.uploader.destroy(publicId);
console.log("CLOUDINARY RESPONSE:", result);
    //check Cloudinary response
    if (result.result !== "ok") {
      return NextResponse.json({ error: "Image deletion failed", details: result }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Error deleting image:", e);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}