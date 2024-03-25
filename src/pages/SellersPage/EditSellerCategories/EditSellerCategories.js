import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SlideBarBuyer from "../Dashboard/SlideBarBuyer";
import "./EditSellerCategories.css";

function EditSellerCategories() {
  const { id } = useParams();

  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [Categories, setCategories] = useState({});
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




/**---------- Start get Categories with id ----------**/

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/Categories/${id}/`
        );
        setCategories(response.data);
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching Categories:", error);
      }
    };

    getCategories();
  }, [id]);

/** End get Products with id  **/


/**----------------- Vaildation FormData ----------------**/
  const validateFormData = (data) => {
    const errors = {};

    if (!data.name || data.name.trim() === "") {
      errors.name = "Name is required";
    }

    return errors;
  };



/*---------------Start Handle Edit Product with PUT Mehod ----------*/
const handleEditProduct = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);


    const validationErrors = validateFormData(formData);

    if (Object.keys(validationErrors).length === 0) {

    try {
      const response = await axios.put(`http://127.0.0.1:8000/Categories/${id}/`, formDataToSend);
      console.log(response.data);
      // Handle successful response, e.g., navigate to another page
      navigate("/Dashboard");
    } catch (error) {
      console.error("Error updating Categories:", error);
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
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            {displayError("name")}
          </label>
        
          <br />

          <button
            type="button"
            className="edit-product-button"
            onClick={handleEditProduct}
          >
            Update Categories
          </button>
        </form>
      </div>
    </>
  );
}

export default EditSellerCategories;
