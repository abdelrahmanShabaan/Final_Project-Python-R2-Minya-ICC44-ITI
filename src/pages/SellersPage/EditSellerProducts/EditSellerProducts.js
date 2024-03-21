import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SlideBarBuyer from "../Dashboard/SlideBarBuyer";

function EditSellerProducts() {
  const { id } = useParams();

  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [product, setProduct] = useState({});
  const navigate = useNavigate();

  /** Redirection */
  useEffect(() => {
    if (localStorage.getItem("login") !== null) {
      const user = JSON.parse(localStorage.getItem("login"));
      if (user.role === "customer") {
        navigate("/");
      }
    } else {
      navigate("/user");
    }
  }, []);
  /** End of Redirection */

  /**----------------- Vaildation FormData ----------------**/
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

  const handleEditProduct = () => {
    const validationErrors = validateFormData(formData);

    if (Object.keys(validationErrors).length === 0) {
      axios
        .put(`http://127.0.0.1:8000/products/${id}/`, formData)
        .then((response) => {
          setProduct(response.data);
          navigate("/Dashboard");
        })
        .catch((error) => {
          console.error("Error updating product:", error);
          setErrors({
            server: "Error updating product. Please try again later.",
          });
        });
    } else {
      setErrors(validationErrors);
    }
  };

  // const handleEditProduct = () => {
  //   const validationErrors = validateFormData(formData);

  //   if (Object.keys(validationErrors).length === 0) {
  //     const formattedData = {
  //       ...formData,
  //       rating: parseFloat(formData.rating),
  //       stock: parseInt(formData.stock),
  //       discountPercentage: parseFloat(formData.discountPercentage),
  //     };

  // axios.patch(`http://127.0.0.1:8000/products/${id}/`, formattedData)
  //       .then((response) => {
  //         setProduct(response.data);
  //         navigate("/Dashboard");
  //       })
  //       .catch((error) => {
  //         console.error("Error updating product:", error);
  //         setErrors({
  //           server: "Error updating product. Please try again later.",
  //         });
  //       });
  //   } else {
  //     setErrors(validationErrors);
  //   }
  // };

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/products/${id}/`
        );
        setProduct(response.data);
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    getProduct();
  }, [id]);

  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const displayError = (field) => {
    return errors[field] ? (
      <div className="error-message">{errors[field]}</div>
    ) : null;
  };

  // Handle thumbnail images
  const handleImageUpload = (file) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData({
        ...formData,
        thumbnail: file,
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className="grid-container">
        <SlideBarBuyer
          openSidebarToggle={openSidebarToggle}
          OpenSidebar={OpenSidebar}
        />

        <form className="formclss">
          <label>
            Name:
            <input
              type="text"
              name="name"
              placeholder={product.title}
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            {displayError("name")}
          </label>
          <br />

          <label>
            Description:
            <input
              type="text"
              name="description"
              placeholder={product.description}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
            {displayError("description")}
          </label>
          <br />

          <label>
            Price:
            <input
              type="text"
              name="price"
              placeholder={product.price}
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
            />
            {displayError("price")}
          </label>
          <br />

          <label>
            DiscountPercentage:
            <input
              type="text"
              name="discountPercentage"
              placeholder={product.discountPercentage}
              value={formData.discountPercentage}
              onChange={(e) =>
                setFormData({ ...formData, discountPercentage: e.target.value })
              }
            />
            {displayError("discountPercentage")}
          </label>
          <br />

          <label>
            Rating:
            <input
              type="text"
              name="rating"
              placeholder={product.rating}
              value={formData.rating}
              onChange={(e) =>
                setFormData({ ...formData, rating: e.target.value })
              }
            />
            {displayError("rating")}
          </label>
          <br />

          <label>
            Stock:
            <input
              type="text"
              name="stock"
              placeholder={product.stock}
              value={formData.stock}
              onChange={(e) =>
                setFormData({ ...formData, stock: e.target.value })
              }
            />
            {displayError("stock")}
          </label>
          <br />

          <label>
            Brand:
            <input
              type="text"
              name="brand"
              placeholder={product.brand}
              value={formData.brand}
              onChange={(e) =>
                setFormData({ ...formData, brand: e.target.value })
              }
            />
            {displayError("brand")}
          </label>
          <br />

          <label>
            Category:
            <input
              type="text"
              name="category"
              placeholder={product.category}
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            />
            {displayError("category")}
          </label>
          <br />

          <label>
            Thumbnail:
            <input
              type="file"
              name="thumbnail"
              placeholder={product.thumbnail}
              // value={formData.thumbnail}
              accept="image/*"
              onChange={(e) => handleImageUpload(e.target.files[0])}
            />
            {displayError("thumbnail")}
          </label>

          <br />
          <button
            type="button"
            className="add-product-button"
            onClick={handleEditProduct}
          >
            Update Product
          </button>
        </form>
      </div>
    </>
  );
}

export default EditSellerProducts;
