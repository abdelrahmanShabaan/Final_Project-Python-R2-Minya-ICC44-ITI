// Sidebar.js

import React, { useEffect } from 'react';
import "./Sidebar.css";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getSidebarStatus, setSidebarOff } from '../../store/sidebarSlice';
import { fetchAsyncCategories, getAllCategories } from '../../store/categorySlice';
import { setPriceFilter } from '../../store/filterSlice';

const Sidebar = () => {
  const dispatch = useDispatch();
  const isSidebarOn = useSelector(getSidebarStatus);
  const categories = useSelector(getAllCategories);

  useEffect(() => {
    dispatch(fetchAsyncCategories());
  }, [dispatch]);

  // Function to handle price range filter
  const handlePriceRangeFilter = (minPrice, maxPrice) => {
    dispatch(setPriceFilter({ minPrice, maxPrice }));
    dispatch(setSidebarOff()); // Close sidebar after selecting price range
  };

  return (
    <aside className={`sidebar ${isSidebarOn ? 'hide-sidebar' : ""}`}>
      <button type="button" className='sidebar-hide-btn' onClick={() => dispatch(setSidebarOff())}>
        <i className='fas fa-times'></i>
      </button>
      <div className='sidebar-cnt'>
                
        {/* Price Range Filter */}
        <div className="price-filter">
          <span>Price Range:</span>
          <br/>
          <button onClick={() => handlePriceRangeFilter(0, 100)}>0 - 100</button>
          <br/>
          <button onClick={() => handlePriceRangeFilter(100, 200)}>100 - 200</button>
          <br/>
          <button onClick={() => handlePriceRangeFilter(200, 300)}>200 - 300</button>
          <br/>
          <button onClick={() => handlePriceRangeFilter(300, 1000)}>300 - 1000</button>
          <br/>
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
