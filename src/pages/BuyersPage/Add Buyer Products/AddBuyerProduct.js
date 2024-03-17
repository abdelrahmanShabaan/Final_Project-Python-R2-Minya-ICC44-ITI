import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddBuyerProducts.css';
import { useNavigate } from 'react-router-dom';
import SlideBarBuyer from '../Home Panel/SlideBarBuyer';

function AddBuyerProduct() {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    brand: '',
    price: '',
    category: '',
    sellerid: '',
    inventory: '',
    productid: '',
    customerid: '',
  });

  const [errors, setErrors] = useState({});
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://api-generator.retool.com/PvW26v/data')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const validateFormData = (data) => {
    const errors = {};

    if (!data.id.trim()) {
      errors.id = 'ID is required';
    }
    if (!data.name.trim()) {
      errors.name = 'Name is required';
    }
    if (!data.brand.trim()) {
      errors.brand = 'Brand is required';
    }
    if (!data.price.trim()) {
      errors.price = 'Price is required';
    } else if (isNaN(data.price)) {
      errors.price = 'Price must be a valid number';
    }
    if (!data.category.trim()) {
      errors.category = 'Category is required';
    }
    if (!data.sellerid.trim()) {
      errors.sellerid = 'Seller ID is required';
    }
    if (!data.inventory.trim()) {
      errors.inventory = 'Inventory is required';
    }
    if (!data.productid.trim()) {
      errors.productid = 'Product ID is required';
    }
    if (!data.customerid.trim()) {
      errors.customerid = 'Customer ID is required';
    }

    return errors;
  };

  const handleAddProduct = () => {
    const validationErrors = validateFormData(formData);

    if (Object.keys(validationErrors).length === 0) {
      axios.post('https://api-generator.retool.com/Vn5ZGU/data', formData)
        .then(response => {
          setProducts([...products, response.data]);
          setFormData({
            id: '',
            name: '',
            brand: '',
            price: '',
            category: '',
            sellerid: '',
            inventory: '',
            productid: '',
            customerid: '',
          });
          loadData();
          navigate('/ShowBuyerProducts');
        })
        .catch(error => {
          if (error.response) {
            console.error('Server Error:', error.response.data);
          } else if (error.request) {
            console.error('No response from server');
          } else {
            console.error('Error:', error.message);
          }
          setErrors({ server: 'Error adding product. Please try again later.' });
        });
    } else {
      setErrors(validationErrors);
    }
  };

  const loadData = async () => {
    try {
      const res = await axios.get('https://api-generator.retool.com/Vn5ZGU/data');
      setProducts(res.data);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const displayError = (field) => {
    return errors[field] ? <div className="error-message">{errors[field]}</div> : null;
  };

  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <>
      <div className="grid-container">
        <SlideBarBuyer openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />

        <form className="formclss" method="POST">
          <label className="labels">
            ID:
            <input type="text" name="id" value={formData.id} onChange={(e) => setFormData({ ...formData, id: e.target.value })} />
            {displayError('id')}
          </label>
          <br />
          <label className="labels">
            Name:
            <input type="text" name="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            {displayError('name')}
          </label>
          <br />
          <label className="labels">
            Brand:
            <input type="text" name="brand" value={formData.brand} onChange={(e) => setFormData({ ...formData, brand: e.target.value })} />
            {displayError('brand')}
          </label>
          <br />
          <label className="labels">
            Price:
            <input type="text" name="price" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
            {displayError('price')}
          </label>
          <br />
          <label className="labels">
            Category:
            <input type="text" name="category" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} />
            {displayError('category')}
          </label>
          <br />
          <label className="labels">
            Seller ID:
            <input type="text" name="sellerid" value={formData.sellerid} onChange={(e) => setFormData({ ...formData, sellerid: e.target.value })} />
            {displayError('sellerid')}
          </label>
          <br />
          <label className="labels">
            Inventory:
            <input type="text" name="inventory" value={formData.inventory} onChange={(e) => setFormData({ ...formData, inventory: e.target.value })} />
            {displayError('inventory')}
          </label>
          <br />
          <label className="labels">
            Product ID:
            <input type="text" name="productid" value={formData.productid} onChange={(e) => setFormData({ ...formData, productid: e.target.value })} />
            {displayError('productid')}
          </label>
          <br />
          <label className="labels">
            Customer ID:
            <input type="text" name="customerid" value={formData.customerid} onChange={(e) => setFormData({ ...formData, customerid: e.target.value })} />
            {displayError('customerid')}
          </label>
          <br />
          <button type="button" className="add-product-button" onClick={handleAddProduct}>
            Add Product
          </button>
        </form>
      </div>
    </>
  );
}

export default AddBuyerProduct;
