"use client";
import { menuItems } from "@/data/menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Nav() {
  const pathname = usePathname();

  return (
    <>
      {menuItems.map((item, index) => {
        // This line checks if the item should be a dropdown
        const hasDropdown = item.links && item.links.length > 1;

        // This logic checks if the current page URL matches any link in the menu item
        const isCurrent = item.links.some(
          (el) =>
            (el.href.split("/")[1] === pathname.split("/")[1] &&
              el.href !== "/") ||
            el.href === pathname
        );

        return (
          <li key={index} className={`dropdown2 ${isCurrent ? "current" : ""}`}>
            {/* If it's a dropdown, render a non-clickable title with an arrow. */}
            {hasDropdown ? (
              <a>
                {item.title}
                {/* <span className="dropdown-arrow"></span> */}
              </a>
            ) : (
              // Otherwise, render a direct link with just the title.
              <Link href={item.links[0]?.href || "/"}>{item.title}</Link>
            )}

            {/* Only render the <ul> dropdown list if it's a dropdown */}
            {hasDropdown && (
              <ul>
                {item.links.map((link, linkIndex) => {
                  const isSubCurrent =
                    (link.href.split("/")[1] === pathname.split("/")[1] &&
                      link.href !== "/") ||
                    link.href === pathname;
                  return (
                    <li
                      key={linkIndex}
                      className={isSubCurrent ? "current" : ""}
                    >
                      <Link href={link.href}>{link.label}</Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </li>
        );
      })}

      {/* This <style jsx> block contains all the necessary CSS for the hover effect and dropdown styling */}
      <style jsx>{`
        .dropdown2 {
          position: relative;
          list-style: none;
        }
        .dropdown2 > a {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 12px;
          text-decoration: none;
          cursor: pointer;
        }
        .dropdown-arrow {
          margin-left: 8px;
          border: solid #333;
          border-width: 0 2px 2px 0;
          display: inline-block;
          padding: 3px;
          transform: rotate(45deg);
          transition: transform 0.3s ease;
        }
        .dropdown2 ul {
          display: none;
          position: absolute;
          top: 100%;
          left: 0;
          background: #fff;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          margin: 0;
          padding: 8px 0;
          list-style: none;
          min-width: 220px;
          z-index: 999;
          border-radius: 8px;
        }
        .dropdown2:hover ul {
          display: block;
        }
        .dropdown2:hover .dropdown-arrow {
          transform: rotate(225deg);
        }
        .dropdown2 ul li {
          padding: 0;
        }
        .dropdown2 ul li a {
          text-decoration: none;
          color: #333;
          display: block;
          padding: 10px 20px;
          transition: background-color 0.2s ease, color 0.2s ease;
        }
        .dropdown2 ul li a:hover {
          background-color: #f8f9fa;
          color: #007bff;
        }
        .dropdown2 ul li.current > a {
          font-weight: bold;
          color: #007bff;
        }
      `}</style>
    </>
  );
}
