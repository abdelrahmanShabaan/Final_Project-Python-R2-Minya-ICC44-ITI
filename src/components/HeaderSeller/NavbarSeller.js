import React, { useEffect, useState } from "react";
import "./NavbarSeller.css";
import { Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate
import { useSelector, useDispatch } from "react-redux";
import { setSidebarOn, setSidebarOff } from "../../store/sidebarSlice";
import { getAllCategories } from "../../store/categorySlice";
import {
  getAllCarts,
  getCartItemsCount,
  getCartTotal,
} from "../../store/cartSlice";
import CartModal from "../CartModal/CartModal";
import { getFavoritesCount } from "../../store/actions/ToggleFav";
import { useAuth } from "../../pages/context/AuthContext";

const NavbarSeller = () => {
  const dispatch = useDispatch();
  const {
    setIsLoggedInContext,
    setRoleContext,
    isLoggedInContext,
    roleContext } = useAuth();

  const categories = useSelector(getAllCategories);
  const carts = useSelector(getAllCarts);
  const itemsCount = useSelector(getCartItemsCount);
  const favoritesCount = useSelector(getFavoritesCount);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const navigate = useNavigate();
  const isUserLoggedIn = localStorage.getItem("login") === null;
  const user = JSON.parse(localStorage.getItem("login"));

  const handleSearch = (e) => {
    e.preventDefault();
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    if (newSearchTerm.trim() !== "") {
      navigate(`/search/${newSearchTerm}`);
    }
  };


  const handleLogout = () => {
    localStorage.clear();
    setRoleContext("");
    navigate("/");
  };

  useEffect(() => {
    dispatch(getCartTotal());
  }, [carts]);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
    if (isSidebarVisible) {
      dispatch(setSidebarOff());
    } else {
      dispatch(setSidebarOn());
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-cnt flex align-center">
        <div className="brand-and-toggler flex align-center">
          <button
            type="button"
            className="sidebar-show-btn text-white"
            onClick={toggleSidebar}
          >
            <i className="fas fa-bars"></i>
          </button>
          <Link to="/" className="navbar-brand flex align-center">
            <span className="navbar-brand-ico">
              <i class="fa-brands fa-shopify"></i>
            </span>
            <span className="navbar-brand-txt mx-2">
              <span className="fw-7">Easy</span>Trade.
            </span>
          </Link>
        </div>

        <div className="navbar-collapse w-100">
          <div className="navbar-search bg-white">
            <form>
              <div className="flex align-center">
                <input
                  type="text"
                  className="form-control fs-14"
                  placeholder="Search your preferred items here"
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <Link
                  to={`search/${searchTerm}`}
                  className="text-white search-btn flex align-center justify-center"
                  disabled={searchTerm.trim() === ""}
                >
                  <i className="fa-solid fa-magnifying-glass"></i>
                </Link>
              </div>
            </form>
          </div>
          </div>

        {isUserLoggedIn && (
          <div className="navbar-cart flex align-center">
            <Link to="/user" className="cart-btn">
              <i className="fa-solid fa-user"></i>
            </Link>
          </div>
        )}

        {!isUserLoggedIn && (
          <div className="navbar-cart flex align-center">
            <a href="#" onClick={handleLogout}>
              <i class="fa-solid fa-right-from-bracket"></i>
            </a>
          </div>
        )}

      </div>
    </nav>
  );
};

export default NavbarSeller;
