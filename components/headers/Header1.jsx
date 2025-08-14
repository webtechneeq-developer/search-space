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
                        src="/images/logo/Search-Spaces-Logo.png"
                      />
                      <Image
                        alt="logo"
                        width={166}
                        className="logo-2"
                        height={48}
                        src="/images/logo/Search-Spaces-Logo.png"
                      />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="inner-header-right header-account">
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
            {/* <div className="login-box flex align-center">
              <a href="#modalLogin" data-bs-toggle="modal">
                Login
              </a>
              <span>/</span>
              <a href="#modalRegister" data-bs-toggle="modal">
                Register
              </a>
            </div> */}
            <div className="menu-outer">
              <MobileNav />
            </div>
            {/* <div className="button-mobi-sell">
              <Link className="tf-btn primary" href={`/add-property`}>
                Submit Property
              </Link>
            </div> */}
            {/* <div className="mobi-icon-box">
              <div className="box d-flex align-items-center">
                <span className="icon icon-phone2" />
                <div>1-333-345-6868</div>
              </div>
              <div className="box d-flex align-items-center">
                <span className="icon icon-mail" />
                <div>themesflat@gmail.com</div>
              </div>
            </div> */}
          </div>
        </nav>
      </div>
      {/* End Mobile Menu */}
    </header>
  );
}
