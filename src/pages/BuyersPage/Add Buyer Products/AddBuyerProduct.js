import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddBuyerProducts.css";
import { useNavigate } from "react-router-dom";
import SlideBarBuyer from "../Dashboard/SlideBarBuyer";

function AddBuyerProduct() {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: "",
    category: "",
    inventory: "",
  });

  const [errors, setErrors] = useState({});
  const [products, setProducts] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // State to control success message visibility
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://api-generator.retool.com/u9XTxw/data")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const validateFormData = (data) => {
    const errors = {};

    if (!data.name.trim()) {
      errors.name = "Name is required";
    }
    if (!data.brand.trim()) {
      errors.brand = "Brand is required";
    }
    if (!data.price.trim()) {
      errors.price = "Price is required";
    } else if (isNaN(data.price)) {
      errors.price = "Price must be a valid number";
    }
    if (!data.inventory.trim()) {
      errors.inventory = "Inventory is required";
    }

    return errors;
  };

  const handleAddProduct = (e) => {
    e.preventDefault(); // Prevent form submission
    const validationErrors = validateFormData(formData);

    if (Object.keys(validationErrors).length === 0) {
      axios
        .post("https://api-generator.retool.com/u9XTxw/data", formData)
        .then((response) => {
          setProducts([...products, response.data]);
          setFormData({
            name: "",
            brand: "",
            price: "",
            category: "",
            inventory: "",
          });
          loadData();
          setShowSuccessMessage(true); // Set state to show success message
          setTimeout(() => {
            setShowSuccessMessage(false);
            navigate("/ShowBuyerProducts"); // Navigate after hiding the success message
          }, 3000); // Hide success message after 5 seconds
        })
        .catch((error) => {
          if (error.response) {
            console.error("Server Error:", error.response.data);
          } else if (error.request) {
            console.error("No response from server");
          } else {
            console.error("Error:", error.message);
          }
          setErrors({
            server: "Error adding product. Please try again later.",
          });
        });
    } else {
      setErrors(validationErrors);
    }
  };

  const loadData = async () => {
    try {
      const res = await axios.get(
        "https://api-generator.retool.com/u9XTxw/data"
      );
      setProducts(res.data);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  const displayError = (field) => {
    return errors[field] ? (
      <div className="error-message">{errors[field]}</div>
    ) : null;
  };

  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <>
      <div className="grid-container">
        <SlideBarBuyer
          openSidebarToggle={openSidebarToggle}
          OpenSidebar={OpenSidebar}
        />
        <form className="formclss" onSubmit={handleAddProduct}>
          <h1 className="product-list-header">Add Products</h1>
          <label className="labels">
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            {displayError("name")}
          </label>
          <label className="labels">
            Brand:
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={(e) =>
                setFormData({ ...formData, brand: e.target.value })
              }
            />
            {displayError("brand")}
          </label>
          <label className="labels">
            Price:
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
            />
            {displayError("price")}
          </label>
          <label className="labels">
            Inventory:
            <input
              type="text"
              name="inventory"
              value={formData.inventory}
              onChange={(e) =>
                setFormData({ ...formData, inventory: e.target.value })
              }
            />
            {displayError("inventory")}
          </label>
          <button type="submit" className="add-product-button">
            Add Product
          </button>
        </form>
      </div>
      {showSuccessMessage && (
        <div className="popuppp">
          <div className="popuppp-content">
            <p>Product added successfully!</p>
          </div>
        </div>
      )}
    </>
  );
}

export default AddBuyerProduct;
