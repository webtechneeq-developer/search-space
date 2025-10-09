"use client"
import React from "react";

export default function WhatsAppFloatingButton({
    phone = "+919820279750",
    message = "",
    size = 56,
    position = "bottom-right",
    className = "",
    ariaLabel = "Chat on WhatsApp",
}) {
    const digits = phone.replace(/\D/g, "");
    const waUrl = `https://wa.me/${digits}${message ? `?text=${encodeURIComponent(message)}` : ""}`;

    const posStyle =
        position === "bottom-left"
            ? { bottom: "20px", left: "20px" }
            : { bottom: "20px", right: "20px" };

    const style = {
        position: "fixed",
        zIndex: 9999,
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "50%",
        boxShadow: "0 6px 18px rgba(0,0,0,0.18)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#25D366",
        cursor: "pointer",
        transition: "transform 120ms ease, box-shadow 120ms ease",
        ...posStyle,
    };

    const svgSize = Math.max(18, Math.floor(size * 0.52));

    return (
        <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={ariaLabel}
            title="Chat on WhatsApp"
            style={{ textDecoration: "none" }}
            className={className}
        >
            <div
                style={style}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-3px) scale(1.02)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}
            >
                <svg
                    aria-hidden="true"
                    focusable="false"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    width={svgSize}
                    height={svgSize}
                >
                    <path
                        fill="#fff"
                        d="M380.9 97.1C339-3.5 275-24.6 212.6 6.3 151.2 36.5 108.8 89.6 95.7 153.4c-6.8 33.3-3.1 67.8 10.6 99.5L32 480l229.8-74.1c31.3 12.8 65.9 16.8 99.4 10.2 63.7-13.5 117.1-56 147.1-117.4 31.1-63.7 12-127.7-29.4-169.5zM224 362c-74 0-134-60-134-134S150 94 224 94s134 60 134 134-60 134-134 134zm77.3-108.4c-4.3-2.2-25.4-12.6-29.4-14-3.9-1.4-6.7-2.2-9.6 2.2s-11 14-13.5 16.9c-2.5 2.9-4.8 3.3-9.1 1.1-4.3-2.2-18.2-6.7-34.7-21.3-12.8-11.4-21.4-25.4-23.9-29.7-2.5-4.3-.3-6.6 1.9-8.7 2-2 4.3-4.8 6.5-7.2 2.2-2.5 2.9-4.3 4.3-7.2 1.4-2.9.7-5.4-.3-7.6-1-2.2-9.6-23-13.2-31.4-3.5-8.3-7.1-7.2-9.6-7.3-2.5 0-5.4-.1-8.3-.1s-7.6 1.1-11.6 5.4c-4.3 4.3-16.4 16-16.4 39s16.8 45.3 19.1 48.4c2.2 3.1 33 50.3 80 70.5 11.2 4.8 19.9 7.7 26.7 9.8 11.2 3.5 21.4 3 29.5 1.8 9-1.4 25.4-10.3 29-20.2 3.6-9.8 3.6-18.2 2.5-20.2-1-2-3.9-3.1-8.2-5.4z"
                    />
                </svg>
            </div>
        </a>
    );
}
