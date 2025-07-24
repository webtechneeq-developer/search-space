"use client";
import { useEffect, useState } from "react";
import Nav from "./Nav";
import Link from "next/link";
import Image from "next/image";
import MobileNav from "./MobileNav";
export default function Header1({
  parentClass = "main-header header-fixed fixed-header",
}) {
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsFixed(window.scrollY > 60);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      id="header"
      className={`${parentClass} ${isFixed ? "is-fixed" : ""}`}
    >
      {/* Header Lower */}
      <div className="header-lower">
        <div className="row">
          <div className="col-lg-12">
            <div className="inner-header">
              <div className="inner-header-left">
                <div className="logo-box flex">
                  <div className="logo">
                    <Link href={`/`}>
                      <Image
                        alt="logo"
                        width={166}
                        className="logo-1"
                        height={48}
                        src="/images/logo/logo@2x.png"
                      />
                      <Image
                        alt="logo"
                        width={166}
                        className="logo-2"
                        height={48}
                        src="/images/logo/logo@2x-white.png"
                      />
                    </Link>
                  </div>
                </div>
                <div className="nav-outer flex align-center">
                  {/* Main Menu */}
                  <nav className="main-menu show navbar-expand-md">
                    <div
                      className="navbar-collapse collapse clearfix"
                      id="navbarSupportedContent"
                    >
                      <ul className="navigation clearfix">
                        <Nav />
                      </ul>
                    </div>
                  </nav>
                  {/* Main Menu End*/}
                </div>
              </div>
              <div className="inner-header-right header-account">
                <a
                  href="#modalLogin"
                  data-bs-toggle="modal"
                  className="tf-btn btn-line btn-login"
                >
                  <svg
                    width={20}
                    height={20}
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.1251 5C13.1251 5.8288 12.7959 6.62366 12.2099 7.20971C11.6238 7.79576 10.8289 8.125 10.0001 8.125C9.17134 8.125 8.37649 7.79576 7.79043 7.20971C7.20438 6.62366 6.87514 5.8288 6.87514 5C6.87514 4.1712 7.20438 3.37634 7.79043 2.79029C8.37649 2.20424 9.17134 1.875 10.0001 1.875C10.8289 1.875 11.6238 2.20424 12.2099 2.79029C12.7959 3.37634 13.1251 4.1712 13.1251 5ZM3.75098 16.765C3.77776 15.1253 4.44792 13.5618 5.61696 12.4117C6.78599 11.2616 8.36022 10.6171 10.0001 10.6171C11.6401 10.6171 13.2143 11.2616 14.3833 12.4117C15.5524 13.5618 16.2225 15.1253 16.2493 16.765C14.2888 17.664 12.1569 18.1279 10.0001 18.125C7.77014 18.125 5.65348 17.6383 3.75098 16.765Z"
                      stroke="black"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Sign in
                </a>
                <div className="flat-bt-top">
                  <Link className="tf-btn primary" href={`/add-property`}>
                    <svg
                      width={21}
                      height={20}
                      viewBox="0 0 21 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.625 14.375V17.1875C13.625 17.705 13.205 18.125 12.6875 18.125H4.5625C4.31386 18.125 4.0754 18.0262 3.89959 17.8504C3.72377 17.6746 3.625 17.4361 3.625 17.1875V6.5625C3.625 6.045 4.045 5.625 4.5625 5.625H6.125C6.54381 5.62472 6.96192 5.65928 7.375 5.72834M13.625 14.375H16.4375C16.955 14.375 17.375 13.955 17.375 13.4375V9.375C17.375 5.65834 14.6725 2.57417 11.125 1.97834C10.7119 1.90928 10.2938 1.87472 9.875 1.875H8.3125C7.795 1.875 7.375 2.295 7.375 2.8125V5.72834M13.625 14.375H8.3125C8.06386 14.375 7.8254 14.2762 7.64959 14.1004C7.47377 13.9246 7.375 13.6861 7.375 13.4375V5.72834M17.375 11.25V9.6875C17.375 8.94158 17.0787 8.22621 16.5512 7.69876C16.0238 7.17132 15.3084 6.875 14.5625 6.875H13.3125C13.0639 6.875 12.8254 6.77623 12.6496 6.60041C12.4738 6.4246 12.375 6.18614 12.375 5.9375V4.6875C12.375 4.31816 12.3023 3.95243 12.1609 3.6112C12.0196 3.26998 11.8124 2.95993 11.5512 2.69876C11.2901 2.4376 10.98 2.23043 10.6388 2.08909C10.2976 1.94775 9.93184 1.875 9.5625 1.875H8.625"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Submit Property
                  </Link>
                </div>
              </div>
              <div
                className="mobile-nav-toggler mobile-button"
                onClick={() => {
                  document.body.classList.add("mobile-menu-visible");
                }}
              >
                <span />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Header Lower */}
      {/* Mobile Menu  */}
      <div
        className="close-btn"
        onClick={() => {
          document.body.classList.remove("mobile-menu-visible");
        }}
      >
        <span className="icon flaticon-cancel-1" />
      </div>
      <div className="mobile-menu">
        <div className="menu-backdrop" />
        <nav className="menu-box">
          <div className="nav-logo">
            <Link href={`/`}>
              <Image
                alt="nav-logo"
                width={174}
                height={44}
                src="/images/logo/logo@2x.png"
              />
            </Link>
          </div>
          <div className="bottom-canvas">
            <div className="login-box flex align-center">
              <a href="#modalLogin" data-bs-toggle="modal">
                Login
              </a>
              <span>/</span>
              <a href="#modalRegister" data-bs-toggle="modal">
                Register
              </a>
            </div>
            <div className="menu-outer">
              <MobileNav />
            </div>
            <div className="button-mobi-sell">
              <Link className="tf-btn primary" href={`/add-property`}>
                Submit Property
              </Link>
            </div>
            <div className="mobi-icon-box">
              <div className="box d-flex align-items-center">
                <span className="icon icon-phone2" />
                <div>1-333-345-6868</div>
              </div>
              <div className="box d-flex align-items-center">
                <span className="icon icon-mail" />
                <div>themesflat@gmail.com</div>
              </div>
            </div>
          </div>
        </nav>
      </div>
      {/* End Mobile Menu */}
    </header>
  );
}
