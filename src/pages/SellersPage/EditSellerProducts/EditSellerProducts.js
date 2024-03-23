import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SlideBarBuyer from "../Dashboard/SlideBarBuyer";
import "./EditSellerProducts.css";

function EditSellerProducts() {
  const { id } = useParams();

  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [product, setProduct] = useState({});
  // thumbnail
  const [thumbnail, setthumbnail] = useState(null);
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




/**---------- Start get Products with id ----------**/

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/products/${id}/`
        );
        setProduct(response.data);
        setFormData(response.data);
        console.log("get data");
        console.log(response.data);
        // save image source
        setthumbnail(response.data.thumbnail)
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    getProduct();
  }, [id]);

/** End get Products with id  **/


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

    if (!data.thumbnail || data.thumbnail.trim() === "") {
      errors.thumbnail = "thumbnail is required";
    }

    return errors;
  };



/*---------------Start Handle Edit Product with PUT Mehod ----------*/
const handleEditProduct = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("discountPercentage", formData.discountPercentage);
    formDataToSend.append("rating", formData.rating);
    formDataToSend.append("stock", formData.stock);
    formDataToSend.append("brand", formData.brand);
    formDataToSend.append("category", formData.category);
    // Handle thumbnail upload
    if(thumbnail !== null){
    formDataToSend.append('thumbnail', thumbnail);
    }

    const validationErrors = validateFormData(formData);

    if (Object.keys(validationErrors).length === 0) {

    try {
      const response = await axios.put(`http://127.0.0.1:8000/products/${id}/`, formDataToSend);
      console.log(response.data);
      // Handle successful response, e.g., navigate to another page
      navigate("/Dashboard");
    } catch (error) {
      console.error("Error updating product:", error);
      // Log and handle the error response from the server
    }
    } else {
      setErrors(validationErrors);
    }
  };
/*---------------End Handle Edit Product with PUT Mehod ----------*/


/*---------------Start Display Error if found ----------*/
  const displayError = (field) => {
    return errors[field] ? (
      <div className="error-message">{errors[field]}</div>
    ) : null;
  };
/*---------------End Display Error that found ----------*/


  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  
return (
    <>
      <div className="grid-container">
        <SlideBarBuyer
          // openSidebarToggle={openSidebarToggle}
          // OpenSidebar={OpenSidebar}
        />
          
        <form className="custom-form-seller-edit">
        <h1 className="product-list-header">Edit {formData.title} Details</h1>
          <label>
            Name:
            <input
              type="text"
              name="name"
              placeholder="enter name"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
            {displayError("title")}
          </label>
          <br />

          <label>
            Description:
            <input
              type="text"
              name="description"
              placeholder="enter description"
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
              placeholder="enter price"
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
              placeholder="enter discountPercentage"
              value={formData.discountPercentage}
              onChange={(e) =>
                setFormData({ ...formData, discountPercentage: e.target.value })
              }
            />
            {displayError("discountPercentage")}
          </label>
          <br />
{/* 
          <label>
            Rating:
            <input
              type="text"
              name="rating"
              placeholder="enter rating"
              value={formData.rating}
              onChange={(e) =>
                setFormData({ ...formData, rating: e.target.value })
              }
            />
            {displayError("rating")}
          </label>
          <br /> */}

          <label>
            Stock:
            <input
              type="text"
              name="stock"
              placeholder="enter stock"
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
              placeholder="enter brand"
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
              placeholder="enter category"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            />
            {displayError("category")}
          </label>
          <br />

      <form className="formclss">
          <img src={thumbnail} height="200"  width="200" style={{ padding: '20px' }} />
          <label style={{color:"black"}}>Edit Thumbnail</label>
          <input type="file"
           className="form-control"
           onChange={(e)=>setthumbnail(e.target.files[0])}
           />
          {displayError("thumbnail")}
          </form>
          <br />

          <button
            type="button"
            className="edit-product-button"
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
