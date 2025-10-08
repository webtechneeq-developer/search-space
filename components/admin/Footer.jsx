import React from "react";

export default function Footer() {
  return (
    <footer
      className="text-center text-muted p-3 mt-auto"
      style={{ fontSize: "0.9rem" }}
    >
      © {new Date().getFullYear()} Search Spaces CMS. All Rights Reserved.
    </footer>
  );
}
