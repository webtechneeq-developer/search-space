import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request) {
  // Clear the session cookie
  cookies().set("session_token", "", { expires: new Date(0), path: "/" });
  return NextResponse.json({ message: "Logout successful" });
}
