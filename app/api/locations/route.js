import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(request) {
  try {
    const [locations] = await pool.query("SELECT * FROM locations");
    return NextResponse.json(locations);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { message: "Error fetching locations" },
      { status: 500 }
    );
  }
}
