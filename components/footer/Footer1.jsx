"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import emailjs from "@emailjs/browser";
// import { footerSections } from "@/data/footer";
import InquiryFloatingButton from "../common/EnquiryForm";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";

export default function Footer1() {
  const formRef = useRef();
  const [success, setSuccess] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const [footerData, setFooterData] = useState(null);

  const WhatsAppFloatingButton = dynamic(
    () => import("../common/WhatsAppFloatingButton"),
    { ssr: false }
  );

  const handleShowMessage = () => {
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 2000);
  };

  const sendMail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm("service_forx6hc", "template_4zgx0ff", formRef.current, {
        publicKey: "rk4oDll0cKKZtagYK",
      })
      .then((res) => {
        if (res.status === 200) {
          setSuccess(true);
          handleShowMessage();
          formRef.current.reset();
        } else {
          setSuccess(false);
          handleShowMessage();
        }
      })
      .catch((err) => console.log(err));
  };

  // 🧩 Fetch footer data dynamically
  useEffect(() => {
    async function fetchFooterData() {
      try {
        const res = await fetch("/api/settings/footer");
        if (res.ok) {
          const data = await res.json();
          setFooterData(data);
        } else {
          console.error("Failed to fetch footer data");
        }
      } catch (error) {
        console.error("Error fetching footer data:", error);
      }
    }
    fetchFooterData();
  }, []);

  // Accordion behavior (mobile)
  useEffect(() => {
    const headings = document.querySelectorAll(".footer-heading-mobile");
    const toggleOpen = (event) => {
      const parent = event.target.closest(".footer-col-block");
      const content = parent.querySelector(".tf-collapse-content");

      if (parent.classList.contains("open")) {
        parent.classList.remove("open");
        content.style.height = "0px";
      } else {
        parent.classList.add("open");
        content.style.height = content.scrollHeight + "px";
      }
    };

    headings.forEach((heading) =>
      heading.addEventListener("click", toggleOpen)
    );
    return () => {
      headings.forEach((heading) =>
        heading.removeEventListener("click", toggleOpen)
      );
    };
  }, []);

  return (
    <footer className="footer">
      <div className="inner-footer">
        <div className="container">
          <div className="row">
            {/* -------- ABOUT SECTION -------- */}
            <div className="col-lg-4 col-md-6">
              <div className="footer-cl-1">
                <div className="footer-logo">
                  <Link href="/">
                    {/* THIS IS THE CORRECTED LOGIC */}
                    {footerData?.settings?.logo_image_name ? (
                      <Image
                        alt="Footer Logo"
                        width={166}
                        height={48}
                        src={`/uploads/${footerData.settings.logo_image_name}`}
                      />
                    ) : (
                      <Image
                        alt="Default Logo"
                        width={166}
                        height={48}
                        src="/images/logo/logo-footer.png" // Fallback logo
                      />
                    )}
                  </Link>
                </div>

                <p className="text-variant-2">
                  {/* Search Spaces is the fastest-growing flexible workspace
                  marketplace in Mumbai, Navi Mumbai & Pune. */}
                  {footerData?.settings?.about_text}
                </p>
                <ul className="mt-12">
                  <li className="mt-12 d-flex align-items-center gap-8">
                    <i className="icon icon-phone2 fs-20 text-variant-2" />
                    <a
                      href={`tel:${footerData?.settings?.phone_number || ""}`}
                      className="text-white caption-1"
                    >
                      {footerData?.settings?.phone_number}
                    </a>
                  </li>
                  <li className="mt-12 d-flex align-items-center gap-8">
                    <i className="icon icon-mail fs-20 text-variant-2" />
                    <p className="text-white">
                      <a
                        href={`mailto:${footerData?.settings?.email || ""}`}
                        className="caption-1"
                      >
                        {footerData?.settings?.email}
                      </a>
                    </p>
                  </li>
                </ul>
              </div>
            </div>

            {/* -------- DYNAMIC LINK SECTIONS -------- */}
            {[
              {
                heading: "Our Company",
                links: footerData?.companyLinks || [],
              },
              {
                heading: "Services",
                links: footerData?.servicesLinks || [],
              },
            ].map((section, index) => (
              <div key={index} className="col-lg-2 col-md-6">
                <div className={`footer-cl-${index + 2} footer-col-block`}>
                  <div className="fw-7 text-white footer-heading-mobile">
                    {section.heading}
                  </div>
                  <div className="tf-collapse-content">
                    <ul className="mt-10 navigation-menu-footer">
                      {section.links.map((link, linkIndex) => (
                        <li key={linkIndex}>
                          <Link
                            href={link.url || "#"}
                            className="caption-1 text-variant-2"
                          >
                            {link.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}

            {/* -------- NEWSLETTER -------- */}
            <div className="col-lg-4 col-md-6">
              <div className="footer-cl-4 footer-col-block">
                <div className="fw-7 text-white footer-heading-mobile">
                  Newsletter
                </div>
                <div className="tf-collapse-content">
                  <p className="mt-12 text-variant-2">
                    Your Weekly/Monthly Dose of Knowledge and Inspiration
                  </p>
                  <div
                    className={`tfSubscribeMsg footer-sub-element ${
                      showMessage ? "active" : ""
                    }`}
                  >
                    {success ? (
                      <p style={{ color: "rgb(52, 168, 83)" }}>
                        You have successfully subscribed.
                      </p>
                    ) : (
                      <p style={{ color: "red" }}>Something went wrong</p>
                    )}
                  </div>
                  <form id="subscribe-form" onSubmit={sendMail} ref={formRef}>
                    <div id="subscribe-content">
                      <input
                        type="email"
                        name="email-form"
                        id="subscribe-email"
                        placeholder="Your email address"
                        required
                      />
                      <button
                        type="submit"
                        id="subscribe-button"
                        className="button-subscribe"
                      >
                        <svg
                          width={20}
                          height={20}
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.00044 9.99935L2.72461 2.60352C8.16867 4.18685 13.3024 6.68806 17.9046 9.99935C13.3027 13.3106 8.16921 15.8118 2.72544 17.3952L5.00044 9.99935ZM5.00044 9.99935H11.2504"
                            stroke="#1563DF"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                    <div id="subscribe-msg" />
                  </form>
                </div>

                {/* -------- SOCIAL LINKS (Dynamic) -------- */}
                <div className="wd-social pt-4">
                  <span>Follow Us:</span>
                  <ul className="list-social d-flex align-items-center">
                    {footerData?.settings?.facebook_url && (
                      <li>
                        <a
                          href={footerData.settings.facebook_url}
                          target="_blank"
                          className="box-icon w-40 social"
                        >
                          <i className="icon icon-facebook" />
                        </a>
                      </li>
                    )}
                    {footerData?.settings?.linkedin_url && (
                      <li>
                        <a
                          href={footerData.settings.linkedin_url}
                          target="_blank"
                          className="box-icon w-40 social"
                        >
                          <i className="icon icon-linkedin" />
                        </a>
                      </li>
                    )}
                    {footerData?.settings?.twitter_url && (
                      <li>
                        <a
                          href={footerData.settings.twitter_url}
                          target="_blank"
                          className="box-icon w-40 social"
                        >
                            <FaXTwitter className="text-white text-2xl" />    
                        </a>
                      </li>
                    )}
                    {footerData?.settings?.instagram_url && (
                      <li>
                        <a
                          href={footerData.settings.instagram_url}
                          target="_blank"
                          className="box-icon w-40 social"
                        >
                          <FaInstagram className="text-white text-2xl" />
                        </a>
                      </li>
                    )}
                    {footerData?.settings?.youtube_url && (
                      <li>
                        <a
                          href={footerData.settings.youtube_url}
                          target="_blank"
                          className="box-icon w-40 social"
                        >
                          <i className="icon icon-youtube" />
                        </a>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* -------- COPYRIGHT -------- */}
      <div className="bottom-footer">
        <div className="container">
          <div className="content-footer-bottom">
            <div className="copyright text-center">
              {footerData?.settings?.copyright_text ? (
                // If the DB already has a full copyright string, just show that
                <span
                  dangerouslySetInnerHTML={{
                    __html: footerData.settings.copyright_text,
                  }}
                />
              ) : (
                // Otherwise, show a fallback default
                <>
                  ©{new Date().getFullYear()} Search Space. All Rights Reserved.
                  Crafted By{" "}
                  <Link
                    target="_blank"
                    className="copyright"
                    href="https://webtechneeq.com/"
                  >
                    Web Techneeq
                  </Link>
                  .
                </>
              )}
            </div>

            <ul className="menu-bottom">
              <li>
                <Link href={`/privacy-policy`}>Privacy Policy</Link>
              </li>
              <li>
                <Link href={`/disclaimer`}>Disclaimer</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <WhatsAppFloatingButton
        phone="+919820279750"
        message="Hello! I have a question about your service."
        size={60}
        position="bottom-right"
      />
      <InquiryFloatingButton />
    </footer>
  );
}
