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
        const hasDropdown = item.links && item.links.length > 1;

        return (
          <li
            key={index}
            className={`dropdown2 ${
              item.links.some(
                (el) => el.href.split("/")[1] === pathname.split("/")[1]
              )
                ? "current"
                : ""
            }`}
          >
            {/* If dropdown → show title only, else → show direct link */}
            {hasDropdown ? (
              <a>
                {item.title}
                <span className="dropdown-arrow"></span>
              </a>
            ) : (
              <Link href={item.links[0].href}>{item.title}</Link>
            )}

            {/* Show dropdown only if more than one link */}
            {hasDropdown && (
              <>
                <ul>
                  {item.links.map((link, linkIndex) => (
                    <li
                      key={linkIndex}
                      className={
                        link.href.split("/")[1] === pathname.split("/")[1]
                          ? "current"
                          : ""
                      }
                    >
                      <Link href={link.href}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </li>
        );
      })}

      {/* 🔽 Dropdown Arrow Styling + 2 column dropdown */}
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

        /* Arrow styling */
        .dropdown-arrow {
          margin-left: 6px;
          border: solid #333;
          border-width: 0 2px 2px 0;
          display: inline-block;
          justify-content: center;
          align-items: center;
          padding: 3px;
          transform: rotate(45deg);
          transition: transform 0.3s ease;
        }

        /* Dropdown list styling */
        /* Dropdown list styling */
        .dropdown2 ul {
          display: none;
          position: absolute;
          top: 100%;
          left: 0;
          background: #fff;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);

          margin: 0;
          list-style: none;

          /* 👇 Width increased */
          min-width: 400px; /* पहले 250px था */
          max-width: 600px; /* optional limit */
          z-index: 99;

          /* Grid layout */
          /* display: grid;*/
          /* grid-template-columns: repeat(
            2,
            minmax(160px, 1fr)*/
          ); /* column थोड़ा बड़ा */
        }

        .dropdown2:hover ul {
          /* display: grid; *//* hover पर भी grid ही */
        }

        .dropdown2 ul li {
          padding: 8px 10px;
        }

        .dropdown2 ul li a {
          text-decoration: none;
          color: #333;
          display: block;
        }

        .dropdown2 ul li.current a {
          font-weight: bold;
          color: #0070f3;
        }
      `}</style>
    </>
  );
}
