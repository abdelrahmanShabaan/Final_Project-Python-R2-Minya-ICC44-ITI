import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SlideBarBuyer from "../Dashboard/SlideBarBuyer";

function EditBuyerProducts() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    discountPercentage: "",
    rating: "",
    stock: "",
    brand: "",
    category: "",
    thumbnail: null, // Updated to null initially
  });
  const [errors, setErrors] = useState({});
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const validateFormData = (data) => {
    const errors = {};

    if (!data.title || data.title.trim() === "") {
      errors.title = "Name is required";
    }

    if (!data.description || data.description.trim() === "") {
      errors.description = "Description is required";
    }

    if (!data.price || isNaN(data.price)) {
      errors.price = "Price must be a valid number";
    }

    if (!data.discountPercentage || isNaN(data.discountPercentage)) {
      errors.discountPercentage = "Discount percentage must be a valid number";
    }

    if (!data.rating || isNaN(data.rating)) {
      errors.rating = "Rating must be a valid number";
    }

    if (!data.stock || isNaN(data.stock)) {
      errors.stock = "Stock must be a valid number";
    }

    if (!data.brand || data.brand.trim() === "") {
      errors.brand = "Brand is required";
    }

    if (!data.category || data.category.trim() === "") {
      errors.category = "Category is required";
    }

    return errors;
  };

  const handleEditProduct = async (e) => {
    e.preventDefault();

    try {
      const validationErrors = validateFormData(formData);
      if (Object.keys(validationErrors).length === 0) {
        const response = await axios.patch(`http://127.0.0.1:8000/products/${id}/`, formData);
        console.log('Response:', response.data); // Log the response for debugging
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
          navigate("/Dashboard");
        }, 3000);
      } else {
        setErrors(validationErrors);
      }
    } catch (error) {
      // console.error("Error updating product:", error);
      if (error.response && error.response.data) {
        setErrors({
          server: error.response.data.detail || "Error updating product. Please try again later.",
        });
      } else {
        setErrors({
          server: "Error updating product. Please try again later.",
        });
      }
    }
  };

  // Handle thumbnail images
  const handleImageUpload = (file) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData({
        ...formData,
        thumbnail: file, // Set the base64 encoded image data in formData
      });
    };

    if (file) {
      reader.readAsDataURL(file); // Read the file as data URL
    }
  };

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/products/${id}/`);
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    getProduct();
  }, [id]);

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
        <SlideBarBuyer openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />

        <form className="formclss" onSubmit={handleEditProduct}>
          <label className="labels">
            Name:
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            {displayError("title")}
          </label>

          <label className="labels">
            Description:
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
            {displayError("description")}
          </label>

          <label className="labels">
            Price:
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            />
            {displayError("price")}
          </label>

          <label className="labels">
            Discount Percentage:
            <input
              type="text"
              name="discountPercentage"
              value={formData.discountPercentage}
              onChange={(e) => setFormData({ ...formData, discountPercentage: e.target.value })}
            />
            {displayError("discountPercentage")}
          </label>

          <label className="labels">
            Rating:
            <input
              type="text"
              name="rating"
              value={formData.rating}
              onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
            />
            {displayError("rating")}
          </label>

          <label className="labels">
            Stock:
            <input
              type="text"
              name="stock"
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
            />
            {displayError("stock")}
          </label>

          <label className="labels">
            Brand:
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
            />
            {displayError("brand")}
          </label>

          <label className="labels">
            Category:
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            />
            {displayError("category")}
          </label>

          <label className="labels">
            Thumbnail:
            <input
              type="file"
              name="thumbnail"
              accept="image/*"
              onChange={(e) => handleImageUpload(e.target.files[0])}
            />
            {displayError("thumbnail")}
          </label>

          <br />
          <button type="submit" className="add-product-button">
            Edit Product
          </button>
        </form>
      </div>
      {showSuccessMessage && (
        <div className="popuppp">
          <div className="popuppp-content">
            <p>Product edited successfully!</p>
          </div>
        </div>
      )}
    </>
  );
}

export default EditBuyerProducts;
