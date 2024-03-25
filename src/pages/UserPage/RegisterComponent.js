import React from "react";
import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import axios from "axios";

const loginPat = /^[a-zA-Z0-9._]+@[a-z]{1,8}\.(com|eg|gov|edu)$/;
const passwordRegex =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=])(?=.*[^\w\d\s]).{8,}$/;

const ValidSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please Enter a Valid Email")
    .required("Must Add Email")
    .matches(loginPat, "Email Didn't Meet Requirements should contain @ and ."),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password must be at most 20 characters")
    .matches(
      passwordRegex,
      "Password must contain at least a uppercase letter, a lowercase letter, a number, a special character, and be at least 8 characters long"
    )
    .required("Must Fill this Field"),
  name: yup
    .string()
    .min(3, "Name must be at least 3 letters")
    .max(15, "Name must be maximum 15 letters")
    .required("Must Fill this Field"),
});

function RegisterComponent() {
  const [isError, setIsError] = useState(false);
  const [type, setType] = useState("signUp");

  const { values, errors, handleChange, handleSubmit, touched, handleBlur } =
    useFormik({
      initialValues: {
        id: "",
        email: "",
        name: "",
        password: "",
        role: "",
      },
      validationSchema: ValidSchema,

      onSubmit: async (values, { resetForm }) => {
        if (!values.email || !values.name || !values.password || !values.role) {
          setIsError(true);
          console.log(values);
          return;
        }
       
        try {

        // Abdelrahman add seller condition
        if (values.role === 'seller'){
          const response = await axios.post(
            "http://127.0.0.1:8000/sellers/",
            values
          );
          console.log("Seller registered:", response.data);
          setType("signIn");
          resetForm();
       
        }else if (values.role === 'customer'){

          // Abdelrahman add User condition
          const response = await axios.post(
            "http://127.0.0.1:8000/user/",
            values
          );
          console.log("User registered:", response.data);
          setType("signIn");
          resetForm();
        }
      
        
      } catch (error) {
        console.error("Error registering user:", error);
        console.log("Error response data:", error.response.data); // Log the response data
        setIsError(true);
      }
      },
    });

  const [showRegPassword, setRegShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setRegShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <>
      <div className="form-containerx sign-up-containerx">
        <form className="form" onSubmit={handleSubmit}>
          <h1>Create Account</h1>
          <div className="social-containerx">
            <a href="#" className="icon a">
              <i id="id-btn-register-phone" className="fa-solid fa-phone"></i>
            </a>
            <a href="#" className="icon a">
              <i
                id="id-btn-register-google"
                className="fa-brands fa-google"
              ></i>
            </a>
          </div>
          <span>or use your email for registration</span>
          <input
            type="text"
            className="input"
            name="name"
            value={values.name}
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Please, enter your name"
            class={errors.name && touched.name ? "input-error" : ""}
          />
          {errors.name && touched.name && (
            <p className="error">{errors.name}</p>
          )}
          <input
            type="email"
            className="input"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Please, enter your email"
            class={errors.email && touched.email ? "input-error" : ""}
          />
          {errors.email && touched.email && (
            <p className="error">{errors.email}</p>
          )}
          <input
            type={showRegPassword ? "text" : "password"}
            className="input"
            name="password"
            value={values.password}
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Please, enter your password"
            class={errors.password && touched.password ? "input-error" : ""}
          />
          <span
            className="password-toggle-iconx"
            onClick={togglePasswordVisibility}
          >
            {showRegPassword ? (
              <i class="fas fa-eye" />
            ) : (
              <i class="fas fa-eye-slash" />
            )}
          </span>

          {errors.password && touched.password && (
            <p className="error1">{errors.password}</p>
          )}
          <select
            className="input"
            name="role"
            value={values.role}
            onBlur={handleBlur}
            onChange={handleChange}
            class={errors.role && touched.role ? "input-error" : ""}
          >
            <option value="">Select Role</option>
            {/* <option value="admin">Admin</option> */}
            <option value="seller">Seller</option>
            <option value="customer">Customer</option>
          </select>
          {errors.role && touched.role && (
            <p className="error">{errors.role}</p>
          )}
          {isError && <p className="error">Please, fill all data.</p>}
          <button type="submit" className="button">
            Register
          </button>
        </form>
      </div>
    </>
  );
}

export default RegisterComponent;
