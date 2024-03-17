import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaCreditCard, FaRegEnvelope, FaHome, FaUser } from 'react-icons/fa';
import "./CheckoutPage.css"

const CheckoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    email: '',
    cardNumber: '',
    expDate: '',
    cvv: ''
  });

  const [itemsCount, setItemsCount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [carts, setCarts] = useState([]);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setItemsCount(parseInt(searchParams.get('itemsCount')) || 0);
    setTotalAmount(parseFloat(searchParams.get('totalAmount')) || 0);
    const cartsString = searchParams.get('carts');
    if (cartsString) {
      setCarts(JSON.parse(decodeURIComponent(cartsString)));
    }
  }, [location.search]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Validation rules
    const errors = { ...formErrors };
    switch(name) {
      case 'name':
        errors.name = value.length < 3 ? 'Name must be at least 3 characters long' : '';
        break;
      case 'address':
        errors.address = value.length < 5 ? 'Address must be at least 5 characters long' : '';
        break;
      case 'email':
        errors.email = !/\S+@\S+\.\S+/.test(value) ? 'Email address is invalid' : '';
        break;
      case 'cardNumber':
        errors.cardNumber = value.length !== 16 ? 'Card number must be 16 digits long' : '';
        break;
      case 'expDate':
        errors.expDate = value.length !== 5 ? 'Expiration date must be in MM/YY format' : '';
        break;
      case 'cvv':
        errors.cvv = value.length !== 3 ? 'CVV must be 3 digits long' : '';
        break;
      default:
        break;
    }
    setFormErrors(errors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = Object.values(formErrors).every(error => error === '');
    if (isValid) {
      // Here you would handle the submission of the form, e.g., send the data to your backend for processing
      console.log('Form submitted:', formData);
      // After successful submission, navigate to the confirmation page
      navigate('/confirmation');
    } else {
      console.log('Form has errors. Please fix them before submitting.');
    }
  };

  return (
    <div className="container mx-auto py-8 checkout-container">
      <div className="checkout-section">
        <form onSubmit={handleSubmit} className="checkout-form">
        <h2 className="checkout-heading">Checkout</h2>
          <div className="form-field">
            <FaUser className="form-icon" />
            <input type="text" id="name" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required className="input-field" />
            {formErrors.name && <span className="error-message">{formErrors.name}</span>}
          </div>
          <div className="form-field">
            <FaHome className="form-icon" />
            <input type="text" id="address" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required className="input-field" />
            {formErrors.address && <span className="error-message">{formErrors.address}</span>}
          </div>
          <div className="form-field">
            <FaRegEnvelope className="form-icon" />
            <input type="email" id="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="input-field" />
            {formErrors.email && <span className="error-message">{formErrors.email}</span>}
          </div>
          <div className="form-field">
            <FaCreditCard className="form-icon" />
            <input type="text" id="cardNumber" name="cardNumber" placeholder="Card Number" value={formData.cardNumber} onChange={handleChange} required className="input-field" />
            {formErrors.cardNumber && <span className="error-message">{formErrors.cardNumber}</span>}
          </div>
          <div className="form-field">
            <FaCreditCard className="form-icon" />
            <input type="text" id="expDate" name="expDate" placeholder="Expiration Date" value={formData.expDate} onChange={handleChange} required className="input-field" />
            {formErrors.expDate && <span className="error-message">{formErrors.expDate}</span>}
          </div>
          <div className="form-field">
            <FaCreditCard className="form-icon" />
            <input type="text" id="cvv" name="cvv" placeholder="CVV" value={formData.cvv} onChange={handleChange} required className="input-field" />
            {formErrors.cvv && <span className="error-message">{formErrors.cvv}</span>}
          </div>
          <button type="submit" className="checkout-button">Complete Purchase</button>
        </form>
      </div>
      
      <div className="order-summary-section">
        <div className="order-summary-container">
          <h3 className="order-summary-header">Order Summary</h3>
          <p className="order-summary-total">Total Items: {itemsCount}</p>
          <p className="order-summary-total">Total Amount: ${totalAmount.toFixed(2)}</p>
          <h4 className="order-summary-heading">Items:</h4>
          <ul className="order-summary-list">
            {carts.map((cart, index) => (
              <li key={index} className="order-summary-item">
                <span className="order-summary-item-text">{cart.title}</span>
                <span className="order-summary-item-price">${cart.totalPrice.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
