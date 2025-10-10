import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser"; // ✅ Import EmailJS

export default function InquiryFloatingButton() {
    const [isOpen, setIsOpen] = useState(false);
    const [success, setSuccess] = useState(false);
    const formRef = useRef(null); // ✅ Create form reference

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        officeType: "",
        seats: "",
        locality: "",
        message: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // ✅ Send email via EmailJS
    const sendMail = async (e) => {
        e.preventDefault();

        try {
            const res = await emailjs.sendForm(
                "service_forx6hc", // ⚙️ Your Service ID
                "template_5wbugeo", // ⚙️ Your Template ID
                formRef.current, // ✅ Use the ref here
                "rk4oDll0cKKZtagYK" // ⚙️ Your Public Key
            );

            if (res.status === 200) {
                setSuccess(true);
                alert("✅ Inquiry sent successfully!");
                formRef.current.reset();
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    officeType: "",
                    seats: "",
                    locality: "",
                    message: "",
                });
                setIsOpen(false);
            } else {
                setSuccess(false);
                alert("❌ Failed to send inquiry. Try again.");
            }
        } catch (error) {
            console.error("Email send failed:", error);
            setSuccess(false);
            alert("❌ Something went wrong. Please try again.");
        }
    };

    // 💡 Styles
    const buttonStyle = {
        position: "fixed",
        bottom: "140px",
        right: "20px",
        zIndex: 1000,
        width: "60px",
        height: "60px",
        borderRadius: "50%",
        backgroundColor: "#1f5ea1",
        color: "#fff",
        fontWeight: "bold",
        fontSize: "12px",
        border: "none",
        cursor: "pointer",
        boxShadow: "0 6px 18px rgba(0,0,0,0.3)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        transition: "transform 0.2s ease",
    };

    const inputStyle = {
        width: "100%",
        padding: "10px",
        marginBottom: "10px",
        borderRadius: "4px",
        border: "1px solid #ccc",
        fontSize: "14px",
    };

    const submitStyle = {
        width: "25%",
        padding: "12px",
        border: "none",
        borderRadius: "4px",
        backgroundColor: "#1563df",
        color: "#fff",
        fontWeight: "bold",
        cursor: "pointer",
        fontSize: "16px",
    };

    return (
        <>
            {/* Floating Inquiry Button */}
            <button
                style={buttonStyle}
                onClick={() => setIsOpen(true)}
                onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "translateY(-3px) scale(1.05)")
                }
                onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}
            >
                Enquiry
            </button>

            {/* Popup Form */}
            {isOpen && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100vw",
                        height: "100vh",
                        backgroundColor: "rgba(0,0,0,0.5)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 999,
                    }}
                    onClick={() => setIsOpen(false)}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            backgroundColor: "#fff",
                            padding: "20px",
                            borderRadius: "8px",
                            width: "90%",
                            maxWidth: "450px",
                            boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
                            position: "relative", // ✅ needed for close button positioning
                        }}
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setIsOpen(false)}
                            style={{
                                position: "absolute",
                                top: "10px",
                                right: "10px",
                                background: "transparent",
                                border: "none",
                                fontSize: "50px",
                                fontWeight: "400",
                                cursor: "pointer",
                            }}
                        >
                            &times;
                        </button>

                        <h2 style={{ marginBottom: "15px" }}>Enquiry Now</h2>
                        <form className="enquiry-form" ref={formRef} onSubmit={sendMail}>
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                style={inputStyle}
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                style={inputStyle}
                            />
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                style={inputStyle}
                            />
                            <select
                                name="officeType"
                                value={formData.officeType}
                                onChange={handleChange}
                                required
                                style={inputStyle}
                            >
                                <option value="">Select Office Type</option>
                                <option value="Private Cabin">Private Cabin</option>
                                <option value="Shared Workspace">Shared Workspace</option>
                                <option value="Meeting Room">Meeting Room</option>
                            </select>
                            <input
                                type="number"
                                name="seats"
                                placeholder="No. of Seats Required"
                                value={formData.seats}
                                onChange={handleChange}
                                required
                                style={inputStyle}
                            />
                            <input
                                type="text"
                                name="locality"
                                placeholder="Locality"
                                value={formData.locality}
                                onChange={handleChange}
                                required
                                style={inputStyle}
                            />
                            <textarea
                                name="message"
                                placeholder="Message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                style={{ ...inputStyle, resize: "vertical" }}
                            />
                            {/* Hidden timestamp input */}
                            <input
                                type="hidden"
                                name="time"
                                value={new Date().toLocaleString()}
                            />
                            <button type="submit" style={submitStyle}>
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
