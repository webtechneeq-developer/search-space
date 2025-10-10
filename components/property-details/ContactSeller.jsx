"use client";
import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

export default function ContactSeller() {
  const formRef = useRef();
  const [success, setSuccess] = useState(null); // null = no message yet
  const [showMessage, setShowMessage] = useState(false);

  const handleShowMessage = (isSuccess) => {
    setSuccess(isSuccess);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
  };

  const sendMail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_forx6hc", "template_5wbugeo", formRef.current, {
        publicKey: "rk4oDll0cKKZtagYK",
      })
      .then((res) => {
        if (res.status === 200) {
          handleShowMessage(true);
          formRef.current.reset();
        } else {
          handleShowMessage(false);
        }
      })
      .catch((err) => {
        console.error("Email send error:", err);
        handleShowMessage(false);
      });
  };

  return (
    <div className="contact-seller-form">
      <h5 className="title fw-6 mb-3">Contact Seller</h5>

      <form ref={formRef} onSubmit={sendMail} className="contact-form">
        <div className="ip-group">
          <input
            type="text"
            // name="name"
            placeholder=" Name"
            className="form-control"
            required
          />
        </div>
        <div className="ip-group">
          <input
            type="email"
            // name="email"
            placeholder="Email"
            className="form-control"
            required
          />
        </div>
        <div className="ip-group">
          <input
            type="text"
            // name="phone"
            placeholder="Phone Number"
            className="form-control"
            required
          />
        </div>
        <div className="ip-group">
          <input
            type="text"
            // name="officeType"
            placeholder="Office Type"
            className="form-control"
            required
          />
        </div>
        <div className="ip-group">
          <input
            type="number"
            // name="seatCount"
            placeholder="No. of Seats "
            className="form-control"
            required
          />
        </div>
        <div className="ip-group">
          <input
            type="text"
            // name="locality"
            placeholder="Locality"
            className="form-control"
            required
          />
        </div>
        <div className="ip-group">
          <textarea
            // name="message"
            rows={4}
            placeholder="Message"
            className="form-control"
            required
          />
        </div>

        {showMessage && (
          <div className="mt-2">
            {success ? (
              <p style={{ color: "rgb(52, 168, 83)" }}>
                ✅ Message sent successfully!
              </p>
            ) : (
              <p style={{ color: "red" }}>❌ Failed to send. Please try again.</p>
            )}
          </div>
        )}

        <button
          type="submit"
          className="tf-btn btn-view primary hover-btn-view w-50 mt-2"
        >
          Submit
          <span className="icon icon-arrow-right2 ms-2" />
        </button>
      </form>
    </div>
  );
}
