import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SlideBarBuyer from "../Home Panel/SlideBarBuyer";

function EditBuyerProducts() {
  const { id } = useParams();

  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [product, setProduct] = useState({});
  const navigate = useNavigate();

  const validateFormData = (data) => {
    const errors = {};

    if (!data.name || data.name.trim() === "") {
      errors.name = "Name is required";
    }

    if (!data.brand || data.brand.trim() === "") {
      errors.brand = "Brand is required";
    }

    if (!data.price || isNaN(data.price)) {
      errors.price = "Price must be a valid number";
    }

    if (!data.category || data.category.trim() === "") {
      errors.category = "Category is required";
    }

    if (!data.sellerid || isNaN(data.sellerid)) {
      errors.sellerid = "Seller ID must be a valid number";
    }

    if (!data.inventory || data.inventory.trim() === "") {
      errors.inventory = "Inventory is required";
    }

    if (!data.productid || isNaN(data.productid)) {
      errors.productid = "Product ID must be a valid number";
    }

    if (!data.customerid || isNaN(data.customerid)) {
      errors.customerid = "Customer ID must be a valid number";
    }

    return errors;
  };

  const handleEditProduct = () => {
    const validationErrors = validateFormData(formData);

    if (Object.keys(validationErrors).length === 0) {
      axios
        .put(`https://api-generator.retool.com/Vn5ZGU/data/${id}`, formData)
        .then((response) => {
          setProduct(response.data);
          navigate("/HomePanelBuyers");
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

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await axios.get(
          `https://api-generator.retool.com/Vn5ZGU/data/${id}`
        );
        setProduct(response.data);
        setFormData(response.data); // Set formData to populate input fields
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

  return (
    <>
      <div className="grid-container">
        <SlideBarBuyer
          openSidebarToggle={openSidebarToggle}
          OpenSidebar={OpenSidebar}
        />

        <form className="formclss">
          <label>
            ID:
            <input type="text" name="id" value={product.id} readOnly />
          </label>
          <br />
          <label>
            Name:
            <input
              type="text"
              name="name"
              placeholder={product.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            {displayError("name")}
          </label>
          <br />
          <label>
            Brand:
            <input
              type="text"
              placeholder="brand"
              name="brand"
              value={formData.brand}
              onChange={(e) =>
                setFormData({ ...formData, brand: e.target.value })
              }
            />
            {displayError("brand")}
          </label>
          <br />
          <label>
            Price:
            <input
              type="text"
              name="price"
              placeholder={product.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
            />
            {displayError("price")}
          </label>
          <br />
          <label>
            Category:
            <input
              type="text"
              name="category"
              placeholder={product.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            />
            {displayError("category")}
          </label>
          <br />
          <label>
            Seller ID:
            <input
              type="number"
              name="sellerid"
              placeholder={product.sellerid}
              onChange={(e) =>
                setFormData({ ...formData, sellerid: e.target.value })
              }
            />
            {displayError("sellerid")}
          </label>
          <br />
          <label>
            Inventory:
            <input
              type="text"
              name="inventory"
              placeholder={product.inventory}
              onChange={(e) =>
                setFormData({ ...formData, inventory: e.target.value })
              }
            />
            {displayError("inventory")}
          </label>
          <br />
          <label>
            Product ID:
            <input
              type="number"
              name="productid"
              placeholder={product.productid}
              onChange={(e) =>
                setFormData({ ...formData, productid: e.target.value })
              }
            />
            {displayError("productid")}
          </label>
          <br />
          <label>
            Customer ID:
            <input
              type="number"
              name="customerid"
              placeholder={product.customerid}
              onChange={(e) =>
                setFormData({ ...formData, customerid: e.target.value })
              }
            />
            {displayError("customerid")}
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

export default EditBuyerProducts;
