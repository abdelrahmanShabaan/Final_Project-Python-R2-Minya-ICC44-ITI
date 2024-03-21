import React from "react";
import "./HeaderSeller.css";
import NavbarSeller from "./NavbarSeller";

const Header = () => {
  return (
    <header className="header text-white">
      <div className="container">
        <div className="header-cnt">
          <div className="header-cnt-bottom">
            <NavbarSeller />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
