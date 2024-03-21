import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaCreditCard, FaRegEnvelope, FaHome, FaUser } from "react-icons/fa";
import axios from "axios";
import "./CheckoutPage.css";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    card_number: "",
    exp_date: "",
    cvv: "",
    total_items: 0,
    total_amount: 0,
  });

  /** Redirection */
  useEffect(() => {
    if (localStorage.getItem("login") !== null) {
      const user = JSON.parse(localStorage.getItem("login"));
      if (user.role === "seller") {
        navigate("/Dashboard");
      } else {
        // Set name and email from local storage
        setFormData((prevData) => ({
          ...prevData,
          name: user.name,
          email: user.email,
        }));
      }
    } else {
      navigate("/user");
    }
  }, []);

  const [carts, setCarts] = useState([]);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const itemsCount = parseInt(searchParams.get("itemsCount")) || 0;
    const totalAmount = parseFloat(searchParams.get("totalAmount")) || 0;
    const cartsString = searchParams.get("carts");
    if (cartsString) {
      setCarts(JSON.parse(decodeURIComponent(cartsString)));
    }
    setFormData((prevData) => ({
      ...prevData,
      total_items: itemsCount,
      total_amount: totalAmount,
    }));
  }, [location.search]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validation rules
    const errors = { ...formErrors };
    switch (name) {
      case "name":
        errors.name =
          value.length < 3 ? "Name must be at least 3 characters long" : "";
        break;
      case "address":
        errors.address =
          value.length < 5 ? "Address must be at least 5 characters long" : "";
        break;
      case "email":
        errors.email = !/\S+@\S+\.\S+/.test(value)
          ? "Email address is invalid"
          : "";
        break;
      case "card_number":
        errors.card_number =
          value.length !== 16 ? "Card number must be 16 digits long" : "";
        break;
      case "exp_date":
        errors.exp_date =
          value.length !== 5 ? "Expiration date must be in MM/YY format" : "";
        break;
      case "cvv":
        errors.cvv = value.length !== 3 ? "CVV must be 3 digits long" : "";
        break;
      default:
        break;
    }
    setFormErrors(errors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = Object.values(formErrors).every((error) => error === "");
    if (isValid) {
      try {
        const formattedData = {
          name: formData.name,
          address: formData.address,
          email: formData.email,
          card_number: formData.card_number,
          exp_date: formData.exp_date,
          cvv: formData.cvv,
          total_items: formData.total_items,
          total_amount: formData.total_amount.toFixed(2), // Round to 2 decimal places
        };
        const response = await axios.post(
          "http://localhost:8000/checkout/",
          formattedData
        );
        if (response.status === 201) {
          navigate("/");
        } else {
          console.error("Failed to submit order:", response.statusText);
        }
      } catch (error) {
        console.error("Error submitting order:", error);
        console.log("Response data:", error.response.data);
        console.log("Response status:", error.response.status);
        console.log("Response headers:", error.response.headers);
      }
    } else {
      console.log("Form has errors. Please fix them before submitting.");
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="container mx-auto py-8 checkout-container">
      <div className="checkout-section">
        <form onSubmit={handleSubmit} className="checkout-form">
          <h2 className="checkout-heading">Checkout</h2>
          {/* <div className="form-field">
            <FaUser className="form-icon" />
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="input-field"
              disabled
            />

          </div> */}

          <div className="user-box">
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            <label><i class="fa-regular fa-user"/> Username</label>
            {formErrors.name && (
              <span className="error-message">{formErrors.name}</span>
            )}
          </div>

          {/* <div className="user-box">
            <input
              type={showPassword ? "text" : "password"}
              name=""
              id="password"
              required
            />
            <label>Password</label>
            <span className="password-toggle-icon" onClick={togglePasswordVisibility}>
              {showPassword ? <i class="fas fa-eye"/> : <i class="fas fa-eye-slash"/>}
            </span>
          </div> */}

          {/* <div className="form-field">
            <FaRegEnvelope className="form-icon" />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="input-field"
              disabled
            />
          </div> */}

          <div className="user-box">
            <input type="text" name="email" value={formData.email} onChange={handleChange} required />
            <label><i class="fa-regular fa-envelope"/> email</label>
            {formErrors.email && (
              <span className="error-message">{formErrors.email}</span>
            )}
          </div>

          
          {/* <div className="form-field">
            <FaHome className="form-icon" />
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              required
              className="input-field"
            />

          </div> */}

          <div className="user-box">
            <input type="text" name="address" value={formData.address} onChange={handleChange} required />
            <label><i class="fa-solid fa-house-user"/> Address</label>
            {formErrors.address && (
              <span className="error-message">{formErrors.address}</span>
            )}
          </div>

          {/* <div className="form-field">
            <FaCreditCard className="form-icon" />
            <input
              type="text"
              id="card_number"
              name="card_number"
              placeholder="Card Number"
              value={formData.card_number}
              onChange={handleChange}
              required
              className="input-field"
            />

          </div> */}

          <div className="user-box">
            <input type="text" name="card_number" value={formData.card_number} onChange={handleChange} required />
            <label><i class="fa-regular fa-credit-card"/> Card Number</label>
            {formErrors.card_number && (
              <span className="error-message">{formErrors.card_number}</span>
            )}
          </div>

          {/* <div className="form-field">
            <FaCreditCard className="form-icon" />
            <input
              type="text"
              id="exp_date"
              name="exp_date"
              placeholder="Expiration Date"
              value={formData.exp_date}
              onChange={handleChange}
              required
              className="input-field"
            />

          </div> */}


          <div className="user-box">
            <input type="text" name="exp_date" value={formData.exp_date} onChange={handleChange} required />
            <label><i class="fa-solid fa-credit-card"/> Expiration Date</label>
            {formErrors.exp_date && (
              <span className="error-message">{formErrors.exp_date}</span>
            )}
          </div>



          
          {/* <div className="form-field">
            <FaCreditCard className="form-icon" />
            <input
              type="text"
              id="cvv"
              name="cvv"
              placeholder="CVV"
              value={formData.cvv}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div> */}


          <div className="user-box">
            <input type="text" name="cvv" value={formData.cvv} onChange={handleChange} required />
            <label><i class="fa-solid fa-credit-card"/> CVV</label>
            {formErrors.cvv && (
              <span className="error-message">{formErrors.cvv}</span>
            )}
          </div>

          <button type="submit" className="checkout-button" onChange={handleChange}>
            Complete Purchase
          </button>
        </form>
      </div>

      <div className="order-summary-section">
        <div className="order-summary-container">
          <h3 className="order-summary-header">Order Summary</h3>
          <p className="order-summary-total">
            Total Items: {formData.total_items}
          </p>
          <p className="order-summary-total">
            Total Amount: EGP {formData.total_amount.toFixed(2)}
          </p>
          <h4 className="order-summary-heading">Items:</h4>
          <ul className="order-summary-list">
            {carts.map((cart, index) => (
              <li key={index} className="order-summary-item">
                <span className="order-summary-item-text">{cart.title}</span>
                <span className="order-summary-item-price">
                EGP {cart.totalPrice.toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
