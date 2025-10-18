import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

export async function POST(request) {
  try {
    const data = await request.formData();
    const file = data.get("file");

    if (!file) {
      return NextResponse.json({ message: "No file found." }, { status: 400 });
    }

    // --- USE ORIGINAL FILENAME ---
    // The filename is now taken directly from the uploaded file.
    const filename = file.name;

    // Convert file data to a buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Define the destination directory and the full file path
    const uploadDir = join(process.cwd(), "public", "uploads");
    const filePath = join(uploadDir, filename);

    // --- SELF-HEALING FOLDER CREATION ---
    // Check if the 'uploads' directory exists, and create it if it doesn't.
    // This makes the API more robust and prevents silent failures.
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (error) {
      // Ignore error if directory already exists
      if (error.code !== "EEXIST") {
        throw error; // Throw other errors
      }
    }

    // Write the file to the server's filesystem
    await writeFile(filePath, buffer);

    return NextResponse.json({ success: true, filename: filename });
  } catch (error) {
    console.error("Upload API Error:", error);
    if (error.code === "EACCES") {
      return NextResponse.json(
        { message: "Permission denied to write file on server." },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { message: "File upload failed." },
      { status: 500 }
    );
  }
}
