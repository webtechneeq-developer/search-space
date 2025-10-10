"use client";
import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";
import ContactMap from "./ContactMap";
export default function Contact() {
  const formRef = useRef();
  const [success, setSuccess] = useState(true);
  const [showMessage, setShowMessage] = useState(false);

  const handleShowMessage = () => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 2000);
  };

  const sendMail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm("service_forx6hc", "template_5wbugeo", formRef.current, {
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
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <section className="flat-section flat-contact">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="contact-content">
                <h4>Drop Us A Line</h4>
                <p className="body-2 text-variant-1">
                  Feel free to connect with us through our online channels for
                  updates, news, and more.
                </p>
                <form onSubmit={sendMail} ref={formRef} className="form-contact">
                  <div className="box grid-2">
                    <fieldset>
                      <label htmlFor="name">Full Name:</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Your name"
                        name="name"
                        id="name"
                        required
                      />
                    </fieldset>
                    <fieldset>
                      <label htmlFor="email">Email Address:</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        name="email"
                        id="email"
                        required
                      />
                    </fieldset>
                  </div>

                  <div className="box grid-2">
                    <fieldset>
                      <label htmlFor="phone">Phone Number:</label>
                      <input
                        type="text"
                        className="form-control style-1"
                        placeholder="ex: 0123456789"
                        name="phone"
                        id="phone"
                        required
                      />
                    </fieldset>
                    <fieldset>
                      <label htmlFor="officeType">Required Office Type:</label>
                      <input
                        type="text"
                        className="form-control style-1"
                        placeholder="e.g. Co-working, Private Office"
                        name="officeType"
                        id="officeType"
                        required
                      />
                    </fieldset>
                  </div>

                  <div className="box grid-2">
                    <fieldset>
                      <label htmlFor="seatCount">No. of Seats Required:</label>
                      <input
                        type="number"
                        className="form-control style-1"
                        placeholder="e.g. 5"
                        name="seatCount"
                        id="seatCount"
                        required
                      />
                    </fieldset>
                    <fieldset>
                      <label htmlFor="locality">Preferred Locality:</label>
                      <input
                        type="text"
                        className="form-control style-1"
                        placeholder="e.g. Andheri, Bandra, Powai"
                        name="locality"
                        id="locality"
                        required
                      />
                    </fieldset>
                  </div>

                  <fieldset>
                    <label htmlFor="message">Your Message:</label>
                    <textarea
                      name="message"
                      className="form-control"
                      cols={30}
                      rows={10}
                      placeholder="Message"
                      id="message"
                      required
                    />
                  </fieldset>

                  <div
                    className={`tfSubscribeMsg footer-sub-element ${
                      showMessage ? "active" : ""
                    }`}
                  >
                    {success ? (
                      <p style={{ color: "rgb(52, 168, 83)" }}>
                        Message has been sent successfully
                      </p>
                    ) : (
                      <p style={{ color: "red" }}>Something went wrong</p>
                    )}
                  </div>

                  <div className="send-wrap">
                    <button className="tf-btn primary size-1" type="submit">
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="contact-info">
                <h4>Contact Us</h4>
                <ul>
                  <li className="box">
                    <h6 className="title">Address:</h6>
                    <p className="text-variant-1">
                      Estatex Ventures Pvt. Ltd.B-405, Rustomjee Central Park, Andheri – Kurla Road, Chakala, Andheri (E),  <br />
                        Mumbai 400 059.
                    </p>
                  </li>
                  <li className="box">
                    <h6 className="title">Infomation:</h6>
                    <p className="text-variant-1">
                      <a href="tel:+91 9820279750">+91 9820279750</a> <br/>
                      <a href="mailto:info@searchspaces.in">info@searchspaces.in</a>
                    </p>
                  </li>
                  <li className="box">
                    <div className="title">Opentime:</div>
                    <p className="text-variant-1">
                      Monay - Friday: 08:00 - 20:00 <br />
                      Saturday - Sunday: 10:00 - 18:00
                    </p>
                  </li>
                  <li className="box">
                    <div className="title">Follow Us:</div>
                  <ul className="list-social d-flex align-items-center">
                    <li>
                      <a href="https://www.facebook.com/searchspaces" target="_blank" className="box-icon w-40 social">
                        <svg
                          className="icon"
                          width={9}
                          height={16}
                          viewBox="0 0 9 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7.60547 9L8.00541 6.10437H5.50481V4.22531C5.50481 3.43313 5.85413 2.66094 6.97406 2.66094H8.11087V0.195625C8.11087 0.195625 7.07925 0 6.09291 0C4.03359 0 2.68753 1.38688 2.68753 3.8975V6.10437H0.398438V9H2.68753V16H5.50481V9H7.60547Z"
                            fill="white"
                          />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a href="linkedin.com/company/searchspaces/" target="_blank" className="box-icon w-40 social">
                        <svg
                          width={16}
                          height={16}
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M3.58151 16H0.264292V5.31762H3.58151V16ZM1.92111 3.86044C0.860376 3.86044 0 2.98185 0 1.92111C7.59231e-09 1.4116 0.202403 0.92296 0.562681 0.562681C0.92296 0.202403 1.4116 0 1.92111 0C2.43063 0 2.91927 0.202403 3.27955 0.562681C3.63983 0.92296 3.84223 1.4116 3.84223 1.92111C3.84223 2.98185 2.98149 3.86044 1.92111 3.86044ZM15.9968 16H12.6867V10.7999C12.6867 9.56057 12.6617 7.97125 10.962 7.97125C9.23735 7.97125 8.97306 9.31771 8.97306 10.7106V16H5.65941V5.31762H8.84091V6.77479H8.88734C9.33021 5.93549 10.412 5.04976 12.026 5.04976C15.3832 5.04976 16.0004 7.26052 16.0004 10.132V16H15.9968Z"
                            fill="white"
                          />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a href="https://x.com/Search_spaces" target="_blank" className="box-icon w-40 social">
                        <svg
                          width={14}
                          height={14}
                          viewBox="0 0 14 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8.30314 5.92804L13.4029 0H12.1944L7.7663 5.14724L4.22958 0H0.150391L5.4986 7.78354L0.150391 14H1.35894L6.03514 8.56434L9.77017 14H13.8494L8.30284 5.92804H8.30314ZM6.64787 7.85211L6.10598 7.07705L1.79439 0.909771H3.65065L7.13015 5.88696L7.67204 6.66202L12.195 13.1316H10.3387L6.64787 7.85241V7.85211Z"
                            fill="white"
                          />
                        </svg>
                      </a>
                    </li>
                    {/* <li>
                      <a href="#" className="box-icon w-40 social">
                        <svg
                          width={13}
                          height={16}
                          viewBox="0 0 13 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.53967 0C3.2506 0 0 2.19271 0 5.74145C0 7.99827 1.26947 9.28056 2.03884 9.28056C2.3562 9.28056 2.53893 8.39578 2.53893 8.14574C2.53893 7.8476 1.77918 7.21287 1.77918 5.97226C1.77918 3.39486 3.74108 1.5676 6.28001 1.5676C8.4631 1.5676 10.0788 2.80821 10.0788 5.08748C10.0788 6.78972 9.39597 9.98261 7.18402 9.98261C6.3858 9.98261 5.70298 9.40558 5.70298 8.57851C5.70298 7.36675 6.54929 6.19345 6.54929 4.94322C6.54929 2.82103 3.53912 3.20572 3.53912 5.7703C3.53912 6.30886 3.60644 6.90512 3.84686 7.3956C3.40448 9.2998 2.50046 12.1369 2.50046 14.0988C2.50046 14.7046 2.58702 15.3009 2.64472 15.9068C2.75371 16.0286 2.69922 16.0158 2.86591 15.9549C4.4816 13.7429 4.42389 13.3102 5.1548 10.4154C5.5491 11.1655 6.56852 11.5694 7.37636 11.5694C10.7808 11.5694 12.31 8.25152 12.31 5.26059C12.31 2.07731 9.55946 0 6.53967 0Z"
                            fill="white"
                          />
                        </svg>
                      </a>
                    </li> */}
                    <li>
                      <a href="https://www.instagram.com/searchspaces/" target="_blank" className="box-icon w-40 social">
                        <svg
                          width={14}
                          height={14}
                          viewBox="0 0 14 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.99812 4.66567C5.71277 4.66567 4.66383 5.71463 4.66383 7C4.66383 8.28537 5.71277 9.33433 6.99812 9.33433C8.28346 9.33433 9.3324 8.28537 9.3324 7C9.3324 5.71463 8.28346 4.66567 6.99812 4.66567ZM13.9992 7C13.9992 6.03335 14.008 5.07545 13.9537 4.11055C13.8994 2.98979 13.6437 1.99512 12.8242 1.17556C12.0029 0.35426 11.01 0.100338 9.88927 0.0460516C8.92263 -0.00823506 7.96475 0.000520879 6.99987 0.000520879C6.03323 0.000520879 5.07536 -0.00823506 4.11047 0.0460516C2.98973 0.100338 1.99508 0.356011 1.17554 1.17556C0.354253 1.99687 0.100336 2.98979 0.0460508 4.11055C-0.00823491 5.0772 0.00052087 6.0351 0.00052087 7C0.00052087 7.9649 -0.00823491 8.92455 0.0460508 9.88945C0.100336 11.0102 0.356004 12.0049 1.17554 12.8244C1.99683 13.6457 2.98973 13.8997 4.11047 13.9539C5.07711 14.0082 6.03499 13.9995 6.99987 13.9995C7.9665 13.9995 8.92438 14.0082 9.88927 13.9539C11.01 13.8997 12.0047 13.644 12.8242 12.8244C13.6455 12.0031 13.8994 11.0102 13.9537 9.88945C14.0097 8.92455 13.9992 7.96665 13.9992 7ZM6.99812 10.5917C5.01056 10.5917 3.40651 8.98759 3.40651 7C3.40651 5.01241 5.01056 3.40832 6.99812 3.40832C8.98567 3.40832 10.5897 5.01241 10.5897 7C10.5897 8.98759 8.98567 10.5917 6.99812 10.5917ZM10.7368 4.10004C10.2728 4.10004 9.89802 3.72529 9.89802 3.26122C9.89802 2.79716 10.2728 2.42241 10.7368 2.42241C11.2009 2.42241 11.5756 2.79716 11.5756 3.26122C11.5758 3.37142 11.5542 3.48056 11.5121 3.58239C11.47 3.68422 11.4082 3.77675 11.3303 3.85467C11.2523 3.93258 11.1598 3.99437 11.058 4.03647C10.9562 4.07858 10.847 4.10018 10.7368 4.10004Z"
                            fill="white"
                          />
                        </svg>
                      </a>
                    </li>
                    {/* <li>
                      <a href="#" className="box-icon w-40 social">
                        <svg
                          width={16}
                          height={12}
                          viewBox="0 0 16 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M15.6657 1.76024C15.4817 1.06737 14.9395 0.521689 14.2511 0.336504C13.0033 0 8 0 8 0C8 0 2.99669 0 1.7489 0.336504C1.06052 0.521718 0.518349 1.06737 0.334336 1.76024C0 3.01611 0 5.63636 0 5.63636C0 5.63636 0 8.25661 0.334336 9.51248C0.518349 10.2053 1.06052 10.7283 1.7489 10.9135C2.99669 11.25 8 11.25 8 11.25C8 11.25 13.0033 11.25 14.2511 10.9135C14.9395 10.7283 15.4817 10.2053 15.6657 9.51248C16 8.25661 16 5.63636 16 5.63636C16 5.63636 16 3.01611 15.6657 1.76024ZM6.36363 8.01535V3.25737L10.5454 5.63642L6.36363 8.01535Z"
                            fill="white"
                          />
                        </svg>
                      </a>
                    </li> */}
                  </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="">
        <div
          id="map-contact"
          className="map-contact"
          data-map-zoom={16}
          data-map-scroll="true"
        >
          <ContactMap />
        </div>
      </section>
    </>
  );
}
