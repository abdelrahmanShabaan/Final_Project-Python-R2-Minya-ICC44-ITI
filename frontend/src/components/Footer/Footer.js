import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer bg-orange">
      <div className="container py-4 text-center">
        <div className="flex align-center justify-center text-white fw-3 fs-14">
          <Link to="/" className="text-uppercase">
            Conditions of Use & Sale
          </Link>
          <div className="vert-line"></div>
          <Link to="/" className="text-uppercase">
            Privacy Notice
          </Link>
          <div className="vert-line"></div>
          <Link to="/" className="text-uppercase">
            About EasyTrade.
          </Link>
        </div>
        <span className="text-white copyright-text text-manrope fs-14 fw-3">
          &copy; 2020-2024, EasyTrade.com.eg, Inc. or its affliates All Rights
          Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
