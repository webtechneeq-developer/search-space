"use client";
import { useState } from "react";

const contactItems = [
  {
    title: "Estatex Ventures Pvt. Ltd.",
    imageSrc: "/images/banner/contact.jpg",
    info: [
      {
        iconClass: "icon icon-map-trifold",
        text: `Estatex Ventures Pvt. Ltd.
B-405, Rustomjee Central Park,
Andheri – Kurla Road, Chakala,
Andheri (E), Mumbai 400 059.`,
      },
      {
        iconClass: "icon icon-phone-line",
        text: "+91 9820279750",
      },
      {
        iconClass: "icon icon-mail-line",
        text: "info@searchspaces.in",
      },
    ],
  },
];

export default function ContactMap() {
  const [showInfo, setShowInfo] = useState(false);

  const toggleInfo = () => setShowInfo(!showInfo);

  return (
    <div className="contact-map-wrapper" style={{ width: "100%", height: "500px", position: "relative",borderRadius: "25px" }}>
      {/* Google Maps Iframe */}
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.8463338016363!2d72.85816662497847!3d19.114396082098104!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c9218da077e5%3A0x9f3270ceed365d45!2sSearch%20Spaces!5e0!3m2!1sen!2sin!4v1759812742830!5m2!1sen!2sin"
        width="100%"
        height="100%"
        style={{ borderRadius: "25px" }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Estatex Ventures Location"
      ></iframe>

      {/* Overlay Info Card */}
      {showInfo && (
        <div
          className="map-box"
          style={{
            position: "absolute",
            top: "20px",
            left: "20px",
            zIndex: 10,
            background: "#fff",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 0 15px rgba(0,0,0,0.2)",
          }}
        >
          <div className="contact-map-item">
            <div className="inner-box">
              <div className="image-box">
                <img src={contactItems[0].imageSrc} alt="" />
              </div>
              <div className="content">
                <div className="title">{contactItems[0].title}</div>
                <ul className="list-info">
                  {contactItems[0].info.map((item, i) => (
                    <li key={i}>
                      <span className={item.iconClass} />
                      {item.iconClass.includes("phone") ? (
                        <a href={`tel:${item.text}`}>{item.text}</a>
                      ) : item.iconClass.includes("mail") ? (
                        <a href={`mailto:${item.text}`}>{item.text}</a>
                      ) : (
                        item.text
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <button onClick={toggleInfo} style={{ marginTop: "10px" }}>
            Close
          </button>
        </div>
      )}

      {/* Button to toggle info */}
      {/* {!showInfo && (
        <button
          onClick={toggleInfo}
          style={{
            position: "absolute",
            top: "20px",
            left: "20px",
            zIndex: 10,
            padding: "10px 15px",
            background: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Show Info
        </button>
      )} */}
    </div>
  );
}
