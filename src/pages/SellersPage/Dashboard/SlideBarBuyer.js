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
  BsStarFill,
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
          <li style={{ color: '#FFFFFF' }}  className="sidebar-list-item">
            <BsGrid1X2Fill className="icon" /> Dashboard
          </li>
        </Link>
        <Link to="/ShowSellerProducts">
          <li style={{ color: '#FFFFFF' }} className="sidebar-list-item">
            <BsFillArchiveFill className="icon" /> Show All Products
          </li>
        </Link>
        <Link to="/ShowSellerCategories">
          <li  style={{ color: '#FFFFFF' }}  className="sidebar-list-item">
            <BsListCheck className="icon" /> Show Categories
          </li>
        </Link>
        <Link to="/AddSellerProducts">
          <li style={{ color: '#FFFFFF' }}  className="sidebar-list-item">
            <BsFillGrid3X3GapFill className="icon" /> Add New Products
          </li>
        </Link>
        <Link to="/ShowSellerOrders">
          <li style={{ color: '#FFFFFF' }}  className="sidebar-list-item">
            <BsPeopleFill className="icon" /> Orders
          </li>
        </Link>
        <Link to="/ShowSellerReviews">
          <li style={{ color: '#FFFFFF' }}  className="sidebar-list-item">
            <BsStarFill className="icon" /> Reviews
          </li>
        </Link>
      </ul>
    </aside>
  );
}

export default SlideBarBuyer;
