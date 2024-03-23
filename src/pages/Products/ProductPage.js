// ProductPage.js

import React, { useEffect, useState } from 'react';
import "./ProductPage.css";
import { useSelector, useDispatch } from 'react-redux';
import { getAllCategories } from '../../store/categorySlice';
import ProductList from "../../components/ProductList/ProductList";
import { fetchAsyncProducts, getAllProducts, getAllProductsStatus } from '../../store/productSlice';
import Loader from "../../components/Loader/Loader";
import { STATUS } from '../../utils/status';

const ProductPage = () => {
  const dispatch = useDispatch();
  const categories = useSelector(getAllCategories);
  const products = useSelector(getAllProducts);
  const productStatus = useSelector(getAllProductsStatus);
  const [selectedCategory, setSelectedCategory] = useState('0');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    dispatch(fetchAsyncProducts(1000));
  }, [dispatch]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handlePriceFilter = () => {
    // Implement filtering logic based on minPrice and maxPrice
    console.log("Minimum Price:", minPrice);
    console.log("Maximum Price:", maxPrice);
  };

  const getProductsByCategory = () => {
    if (selectedCategory === '0') {
      return products;
    } else {
      return products.filter(product => product.category === selectedCategory);
    }
  };

  const carouselImages = [
    "https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/71j8damPo5L._SX3000_.jpg",
    "https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/51Id5Jjpm-L._SX1500_.jpg",
    "https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/61CiqVTRBEL._SX3000_.jpg",
    "https://images-eu.ssl-images-amazon.com/images/W/MEDIAX_792452-T2/images/G/31/img23/Softlines_JWL_SH_GW_Assets/UNREC/11th-14th/Shoes/WithoutFDFO/Shoes_3000_one_monthly._CB571660453_.jpg",
    "https://images-eu.ssl-images-amazon.com/images/W/MEDIAX_792452-T2/images/G/31/img22/Wireless/devjyoti/GW/Uber/Nov/D103625178_DesktopTallHero_3000x1200._CB574597993_.jpg",
    "https://images-eu.ssl-images-amazon.com/images/W/MEDIAX_792452-T2/images/G/31/img23/Beauty/GW/TBS/Skincare-PCdd._CB571612292_.jpg",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % carouselImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [carouselImages]);

  return (
    <main>
      <div className='main-content bg-whitesmoke'>
        <div className='container'>
          <div className='categories py-5'>
            {/* Sidebar */}
            <aside className="sidebar">
              <div className='cat-title fs-17 text-uppercase fw-6 ls-1h'>All Categories</div>
              <ul className='cat-list'>
                {categories.map((category, idx) => (
                  <li key={idx}>
                    <a href={`category/${category}`} className='cat-list-link text-capitalize'>{category.replace("-", " ")}</a>
                  </li>
                ))}
              </ul>

              <div className='price-filter'>
                <div className='fs-17 text-uppercase fw-6 ls-1h'>Price Filter</div>
                <div>
                  <input type="number" placeholder="Min Price" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
                  <input type="number" placeholder="Max Price" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
                  <button onClick={handlePriceFilter}>Apply</button>
                </div>
              </div>
            </aside>

            <div className='slider-wrapper' style={{ width: '100%', overflow: 'hidden' }}>
              <img src={carouselImages[currentImageIndex]} alt={`Image ${currentImageIndex + 1}`} style={{ width: '100%', height: 'auto' }} />
            </div>
            <div className='categories-item'>
              <h3 style={{ color: 'black'}}>Select a category:</h3>
              <select value={selectedCategory} onChange={handleCategoryChange}>
                <option value='0'>All</option>
                {categories.map((category, index) => (
                  <option value={category} key={index}>{category}</option>
                ))}
              </select>
            </div>
            <div className='categories-item'>
              <div className='title-md'>
                <h3 style={{ color: 'white' }}>Filtered Products</h3>
              </div>
              {productStatus === STATUS.LOADING ? <Loader /> : <ProductList products={getProductsByCategory()} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductPage;
