import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";

export async function POST(request) {
  try {
    const data = await request.formData();
    const file = data.get("file");
    const location = data.get("location") || "general";

    if (!file) {
      return NextResponse.json({ message: "No file found." }, { status: 400 });
    }

    // Sanitize location name for use in filename
    const safeLocation = location.toLowerCase().replace(/[^a-z0-9]/g, "-");

    // Generate a unique filename: location-timestamp-originalfilename
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const originalFilename = file.name.replace(/[^a-zA-Z0-9.]/g, "_");
    const filename = `${safeLocation}-${uniqueSuffix}-${originalFilename}`;

    // Convert file data to a buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Define the path to save the file
    // It will be saved in the `public/uploads` directory
    const filePath = join(process.cwd(), "public", "uploads", filename);

    // Write the file to the server's filesystem
    await writeFile(filePath, buffer);

    return NextResponse.json({ success: true, filename: filename });
  } catch (error) {
    console.error("Upload API Error:", error);
    return NextResponse.json(
      { message: "File upload failed." },
      { status: 500 }
    );
  }
}
