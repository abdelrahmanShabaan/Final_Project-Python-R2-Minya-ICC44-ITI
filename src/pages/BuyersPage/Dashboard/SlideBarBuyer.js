import React from "react";
import {
  BsCart3,
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsListCheck,
  BsMenuButtonWideFill,
  BsFillGearFill,
} from "react-icons/bs";
import { Link } from "react-router-dom";

function SlideBarBuyer({ openSidebarToggle, OpenSidebar }) {
  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
    >
      <div className="sidebar-title">
        <div className="sidebar-brand" style={{ color: "white" }}>
          <BsCart3 className="icon_header" /> Dashboard
        </div>
        <span className="icon close_icon" onClick={OpenSidebar}>
          X
        </span>
      </div>

      <ul className="sidebar-list">
        <Link to="/Dashboard" >
          <li className="sidebar-list-item">
            <BsGrid1X2Fill className="icon" /> Dashboard
          </li>
        </Link>
        <Link to="/ShowBuyerProducts">
          <li className="sidebar-list-item">
            <BsFillArchiveFill className="icon" /> Show Products
          </li>
        </Link>
        <Link to="/AddBuyerProduct">
          <li className="sidebar-list-item">
            <BsFillGrid3X3GapFill className="icon" /> Add Products
          </li>
        </Link>
        <Link to="/SellerOrderPage">
          <li className="sidebar-list-item">
            <BsPeopleFill className="icon" /> Orders
          </li>
        </Link>
        <Link to="/">
          <li className="sidebar-list-item">
            <BsListCheck className="icon" /> Inventory
          </li>
        </Link>
        <Link to="/">
          <li className="sidebar-list-item">
            <BsMenuButtonWideFill className="icon" /> Reports
          </li>
        </Link>
        <Link to="/">
          <li className="sidebar-list-item">
            <BsFillGearFill className="icon" /> Setting
          </li>
        </Link>
      </ul>
    </aside>
  );
}

export default SlideBarBuyer;
