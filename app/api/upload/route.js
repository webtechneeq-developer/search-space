import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(request) {
  try {
    const data = await request.formData();
    const file = data.get("file");
    const location = data.get("location") || "general";

    if (!file) {
      return NextResponse.json(
        { message: "No file uploaded." },
        { status: 400 }
      );
    }

    // Sanitize and create a unique filename
    const sanitizedLocation = location.toLowerCase().replace(/[^a-z0-9]/g, "-");
    const filename = `${sanitizedLocation}-${Date.now()}${path.extname(
      file.name
    )}`;

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Define the path to save the file
    const uploadPath = path.join(process.cwd(), "public/uploads", filename);

    // Write the file to the server
    await writeFile(uploadPath, buffer);

    console.log(`File uploaded successfully: ${filename}`);

    // Return the new filename to the client
    return NextResponse.json({
      message: "File uploaded successfully",
      filename: filename,
    });
  } catch (error) {
    console.error("Upload API Error:", error);
    return NextResponse.json(
      { message: "File upload failed." },
      { status: 500 }
    );
  }
}
