import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(request) {
  try {
    const { email } = await request.json();
    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { message: "Invalid email address." },
        { status: 400 }
      );
    }

    // Using INSERT IGNORE to prevent errors if the email already exists
    await pool.query(
      "INSERT IGNORE INTO newsletter_subscribers (email) VALUES (?)",
      [email]
    );

    return NextResponse.json(
      { message: "Thank you for subscribing!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Newsletter API Error:", error);
    return NextResponse.json(
      { message: "Subscription failed." },
      { status: 500 }
    );
  }
}
