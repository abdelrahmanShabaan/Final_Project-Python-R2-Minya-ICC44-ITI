import React, { useState, useEffect } from 'react';
import "./Sidebar.css";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getSidebarStatus, setSidebarOff } from '../../store/sidebarSlice';
import { fetchAsyncCategories, getAllCategories } from '../../store/categorySlice';

const Sidebar = () => {
  const dispatch = useDispatch();
  const isSidebarOn = useSelector(getSidebarStatus);
  const categories = useSelector(getAllCategories);

  // State variables for filter options
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);
  const [specialOffers, setSpecialOffers] = useState(false);
  const [discounts, setDiscounts] = useState(false);
  const [freeShipping, setFreeShipping] = useState(false);

  useEffect(() => {
    dispatch(fetchAsyncCategories());
  }, [dispatch]);

  // Apply filters function
  const applyFilters = () => {
    // Logic to apply filters to product listing
    // Dispatch action or update state accordingly
  };

  return (
    <aside className={`sidebar ${isSidebarOn ? 'hide-sidebar' : ""}`}>
      <button type="button" className='sidebar-hide-btn' onClick={() => dispatch(setSidebarOff())}>
        <i className='fas fa-times'></i>
      </button>
      <div className='sidebar-cnt'>
      <button onClick={applyFilters}>Apply Filters</button>
        {/* Color Filter */}
        <div>
          <label>Color:</label>
          <select value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)}>
            <option value="">All Colors</option>
            <option value="red">Red</option>
            <option value="blue">Blue</option>
            <option value="green">Green</option>
            <option value="yellow">Yellow</option>
            <option value="black">Black</option>
          </select>
        </div>

        {/* Price Range Filter */}
        <div>
          <label>Price Range:</label>
          <select value={selectedPriceRange} onChange={(e) => setSelectedPriceRange(e.target.value)}>
            <option value="">All Prices</option>
            <option value="0-50">$0 - $50</option>
            <option value="50-100">$50 - $100</option>
            <option value="100-200">$100 - $200</option>
            <option value="200-500">$200 - $500</option>
            <option value="500+">$500+</option>
          </select>
        </div>

        {/* Brand Filter */}
        <div>
          <label>Brand:</label>
          <select value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)}>
            <option value="">All Brands</option>
            <option value="Nike">Nike</option>
            <option value="Adidas">Adidas</option>
            <option value="Puma">Puma</option>
            <option value="Reebok">Reebok</option>
            <option value="Under Armour">Under Armour</option>
          </select>
        </div>

        {/* Rating Filter */}
        <div>
          <label>Rating:</label>
          <select value={selectedRating} onChange={(e) => setSelectedRating(e.target.value)}>
            <option value="">All Ratings</option>
            <option value="1">1 Star</option>
            <option value="2">2 Stars</option>
            <option value="3">3 Stars</option>
            <option value="4">4 Stars</option>
            <option value="5">5 Stars</option>
          </select>
        </div>

        {/* Special Offers */}
        <div>
          <label>Special Offers:</label>
          <input type="checkbox" checked={specialOffers} onChange={() => setSpecialOffers(!specialOffers)} />
        </div>

        {/* Discounts */}
        <div>
          <label>Discounts:</label>
          <input type="checkbox" checked={discounts} onChange={() => setDiscounts(!discounts)} />
        </div>

        {/* Free Shipping */}
        <div>
          <label>Free Shipping:</label>
          <input type="checkbox" checked={freeShipping} onChange={() => setFreeShipping(!freeShipping)} />
        </div>

        {/* Category List */}
        <div className='cat-title fs-17 text-uppercase fw-6 ls-1h'>All Categories</div>
        <ul className='cat-list'>
          {categories.map((category, idx) => (
            <li key={idx} onClick={() => dispatch(setSidebarOff())}>
              <Link to={`category/${category}`} className='cat-list-link text-capitalize'>{category.replace("-", " ")}</Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
