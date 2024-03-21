import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddBuyerProducts.css";
import { useNavigate } from "react-router-dom";
import SlideBarBuyer from "../Dashboard/SlideBarBuyer";

function AddBuyerProduct() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    discountPercentage: "",
    rating: "",
    stock: "",
    brand: "",
    category: "",
    thumbnail: "",
  });

  const [errors, setErrors] = useState({});
  const [products, setProducts] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // State to control success message visibility
  const navigate = useNavigate();

  /** Redirection */
  useEffect(() => {
    if (sessionStorage.getItem("login") !== null) {
      const user = JSON.parse(sessionStorage.getItem("login"));
      if (user.role === "customer") {
        navigate("/");
      }
    } else {
      navigate("/user");
    }
  }, []);
  /** End of Redirection */

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/products/")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const validateFormData = (data) => {
    const errors = {};

    const validateFormData = (data) => {
      const errors = {};

      if (!data.title.trim()) {
        errors.title = "Name is required";
      }
      if (!data.description.trim()) {
        errors.description = "description is required";
      }
      if (!data.price.trim()) {
        errors.price = "price is required";
      }
      if (!data.discountPercentage.trim()) {
        errors.discountPercentage = "discountPercentage is required";
      }
      if (!data.rating.trim()) {
        errors.rating = "rating is required";
      }
      if (!data.stock.trim()) {
        errors.stock = "stock is required";
      }
      if (!data.brand.trim()) {
        errors.brand = "brand is required";
      }
      if (!data.category.trim()) {
        errors.category = "category is required";
      }
      if (!data.thumbnail) {
        errors.thumbnail = "thumbnail is required";
      }

      return errors;
    };

    return errors;
  };
  const handleAddProduct = (e) => {
    e.preventDefault(); // Prevent form submission
    const validationErrors = validateFormData(formData);

    if (Object.keys(validationErrors).length === 0) {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("discountPercentage", formData.discountPercentage);
      formDataToSend.append("rating", formData.rating);
      formDataToSend.append("stock", formData.stock);
      formDataToSend.append("brand", formData.brand);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("thumbnail", formData.thumbnail); // Append the image file to FormData

      axios
        .post("http://127.0.0.1:8000/products/", formDataToSend)
        .then((response) => {
          setProducts([...products, response.data]);
          // Reset form data after successful submission
          setFormData({
            title: "",
            description: "",
            price: "",
            discountPercentage: "",
            rating: "",
            stock: "",
            brand: "",
            category: "",
            thumbnail: "",
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
      const res = await axios.get("http://127.0.0.1:8000/products/");
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

  // Handle thumbonals images
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

  return (
    <>
      <div className="grid-container">
        <SlideBarBuyer
          openSidebarToggle={openSidebarToggle}
          OpenSidebar={OpenSidebar}
        />
        <form
          className="formclss"
          onSubmit={handleAddProduct}
          encType="multipart/form-data"
        >
          <h1 className="product-list-header">Add Products</h1>
          <label className="labels">
            Name:
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
            {displayError("title")}
          </label>

          <label className="labels">
            Description:
            <input
              type="text"
              name="category"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
            {displayError("description")}
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
            DiscountPercentage:
            <input
              type="text"
              name="discountPercentage"
              value={formData.discountPercentage}
              onChange={(e) =>
                setFormData({ ...formData, discountPercentage: e.target.value })
              }
            />
            {displayError("discountPercentage")}
          </label>

          <label className="labels">
            Rating:
            <input
              type="text"
              name="rating"
              value={formData.rating}
              onChange={(e) =>
                setFormData({ ...formData, rating: e.target.value })
              }
            />
            {displayError("rating")}
          </label>

          <label className="labels">
            Stock:
            <input
              type="text"
              name="stock"
              value={formData.stock}
              onChange={(e) =>
                setFormData({ ...formData, stock: e.target.value })
              }
            />
            {displayError("stock")}
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
            Category:
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
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
