import { NextResponse } from "next/server";
import pool from "@/lib/db";

// GET all footer data
export async function GET() {
  try {
    const [settings] = await pool.query(
      "SELECT * FROM footer_settings WHERE id = 1"
    );
    const [links] = await pool.query(
      "SELECT * FROM footer_links ORDER BY display_order ASC"
    );

    const companyLinks = links.filter((l) => l.category === "Our Company");
    const servicesLinks = links.filter((l) => l.category === "Services");

    return NextResponse.json({
      settings: settings[0],
      companyLinks,
      servicesLinks,
    });
  } catch (error) {
    console.error("API GET Footer Error:", error);
    return NextResponse.json(
      { message: "Error fetching footer settings" },
      { status: 500 }
    );
  }
}

// UPDATE all footer data
export async function PUT(request) {
  let connection;
  try {
    const { settings, companyLinks, servicesLinks } = await request.json();
    connection = await pool.getConnection();
    await connection.beginTransaction();

    // Update main settings table, now including the logo_image_name
    await connection.execute(
      `UPDATE footer_settings SET 
            about_text=?, phone_number=?, email=?, copyright_text=?, 
            facebook_url=?, linkedin_url=?, twitter_url=?, instagram_url=?, logo_image_name=? 
            WHERE id=1`,
      [
        settings.about_text,
        settings.phone_number,
        settings.email,
        settings.copyright_text,
        settings.facebook_url,
        settings.linkedin_url,
        settings.twitter_url,
        settings.instagram_url,
        settings.logo_image_name, // Add the new field to the query
      ]
    );

    // Clear and re-insert all links to handle additions/deletions/reordering
    await connection.execute("DELETE FROM footer_links");
    const allLinks = [
      ...companyLinks.map((link, i) => ({
        ...link,
        category: "Our Company",
        display_order: i,
      })),
      ...servicesLinks.map((link, i) => ({
        ...link,
        category: "Services",
        display_order: i,
      })),
    ];

    for (const link of allLinks) {
      if (link.title && link.url) {
        await connection.execute(
          "INSERT INTO footer_links (title, url, category, display_order) VALUES (?, ?, ?, ?)",
          [link.title, link.url, link.category, link.display_order]
        );
      }
    }

    await connection.commit();
    return NextResponse.json({ message: "Footer updated successfully" });
  } catch (error) {
    if (connection) await connection.rollback();
    console.error("API PUT Footer Error:", error);
    return NextResponse.json(
      { message: "Error updating footer settings", error: error.message },
      { status: 500 }
    );
  } finally {
    if (connection) connection.release();
  }
}
