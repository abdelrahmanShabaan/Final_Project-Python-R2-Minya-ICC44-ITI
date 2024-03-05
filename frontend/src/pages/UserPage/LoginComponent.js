// import React, { useEffect, useState } from "react";
// import { Form, Button } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import { useFormik } from "formik";
// import * as yup from "yup";
// import axios from "axios";

// const loginPat = /^[a-zA-Z0-9._]+@[a-z]{1,8}\.(com|eg|gov|edu)$/;
// const passwordRegex =
//   /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=])(?=.*[^\w\d\s]).{8,}$/;

// const LoginSchema = yup.object().shape({
//   email: yup
//     .string()
//     .email("Please Enter a Valid Email")
//     .required("Must Add Email")
//     .matches(loginPat, "Email Doesn't Meet Requirements"),
//   password: yup
//     .string()
//     .min(8, "Password must be at least 8 characters")
//     .max(20, "Password must be at most 20 characters")
//     .matches(
//       passwordRegex,
//       "Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long"
//     )
//     .required("Must Fill this Field"),
// });

// const LoginComponent = () => {
//   const navigate = useNavigate();
//   let locally = JSON.parse(localStorage.getItem("Account Storage") || "[]");
//   let sessionLogin = JSON.parse(sessionStorage.getItem("login") || "[]");
//   const [isError, setIsError] = useState(false);
//   const [isLoggedin, setIsLoggedin] = useState(false);
//   const [showForm, setShowForm] = useState(false);
//   const [type, setType] = useState("signIn");

//   let findAccounts = (email, password) => {
//     return locally.find(
//       (item) => item.email === email && item.password === password
//     );
//   };

//   const { handleSubmit, values, errors, handleBlur, touched, handleChange } =
//     useFormik({
//       initialValues: {
//         email: "",
//         password: "",
//       },
//       validationSchema: LoginSchema,
//       // onSubmit: async (values) => {
//       //   if (!isLoggedin) {
//       //     let foundUser = findAccounts(values.email, values.password);
//       //     if (foundUser) {
//       //       let sessionLogin = JSON.parse(
//       //         sessionStorage.getItem("login") || "[]"
//       //         );
//       //         sessionLogin.push(foundUser);
//       //         sessionStorage.setItem("login", JSON.stringify(sessionLogin));
//       //         setIsError(false);
//       //         navigate("/");
//       //       } else {
//       //         setIsError(true);
//       //       }
//       //     } else {navigate("/");}

//       onSubmit: async(values) => {
//         let user = findAccounts(values.email, values.password);
//         if (user) {
//           let sessionLogin = JSON.parse(
//             sessionStorage.getItem("login") || "[]"
//           );
//           sessionLogin.push(user);
//           sessionStorage.setItem("login", JSON.stringify(sessionLogin));
//           setIsError(false);
//           navigate("/");
//         } else {
//           setIsError(true);
//         }
//       },
//     });

//   useEffect(() => {
//     if (sessionStorage.getItem("login") != null) {
//       navigate("/");
//     }
//   }, [navigate]);

//   useEffect(() => {
//     let showUserPanel = () => {
//       if (sessionLogin.length > 0) {
//         setIsLoggedin(true);
//         setShowForm(false);
//       } else {
//         setIsLoggedin(false);
//         setShowForm(true);
//       }
//     };
//     showUserPanel();
//   }, []);

//   return (
//     <div className="form-containerx sign-in-containerx">
//       <Form className="form" onSubmit={handleSubmit}>
//         <h1>Login</h1>
//         <div className="social-containerx">
//           <a href="#" className="icon a">
//             <i id="id-btn-login-phone" className="fa-solid fa-phone"></i>
//           </a>
//           <a href="#" className="icon a">
//             <i id="id-btn-login-google" className="fa-brands fa-google"></i>
//           </a>
//         </div>
//         <span>or use your email for registration</span>
//         <Form.Control
//           type="text"
//           value={values.email}
//           id="email"
//           placeholder="Please, enter your email"
//           onBlur={handleBlur}
//           onChange={handleChange}
//           />
//         {errors.email && touched.email && (
//           <p className="error">{errors.email}</p>
//           )}
//         <Form.Control
//           value={values.password}
//           id="password"
//           onBlur={handleBlur}
//           placeholder="Please, enter your password"
//           onChange={handleChange}
//           />
//         {errors.password && touched.password && (
//           <p className="error">{errors.password}</p>
//           )}
//         <a className="a" href="#">
//           Forgot your password?
//         </a>
//         {isError && (
//           <p className="error">Incorrect email or password</p>
//           )}
//       {/* {isError && (
//         <Alert variant="danger">Incorrect email or password</Alert>
//       )} */}
//         <Button className="button my-3" variant="primary" type="submit">
//           Login
//         </Button>
//       </Form>
//     </div>
//   );
// };

// export default LoginComponent;


// ----------------------------------------------------------------------------------


import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";

const loginPat = /^[a-zA-Z0-9._]+@[a-z]{1,8}\.(com|eg|gov|edu)$/;
const passwordRegex =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=])(?=.*[^\w\d\s]).{8,}$/;

const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please Enter a Valid Email")
    .required("Must Add Email")
    .matches(loginPat, "Email Doesn't Meet Requirements"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password must be at most 20 characters")
    .matches(
      passwordRegex,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long"
    )
    .required("Must Fill this Field"),
});

const LoginComponent = () => {
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);

  const { handleSubmit, values, errors, handleBlur, touched, handleChange } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: LoginSchema,
      onSubmit: async (values) => {
        try {
          const response = await axios.get(
            `https://retoolapi.dev/dvbrl0/users?email=${values.email}&password=${values.password}`
          );
          if (response.data.length > 0) {
            const user = response.data[0];
            sessionStorage.setItem("login", JSON.stringify(user));
            setIsError(false);
            redirectBasedOnRole(user.role);
          } else {
            setIsError(true);
          }
        } catch (error) {
          console.error("Error logging in:", error);
          setIsError(true);
        }
      },
    });

  useEffect(() => {
    if (sessionStorage.getItem("login") !== null) {
      const user = JSON.parse(sessionStorage.getItem("login"));
      redirectBasedOnRole(user.role);
    }
  }, []);

  const redirectBasedOnRole = (role) => {
    if (role === "customer") {
      navigate("/");
    } else if (role === "seller") {
      navigate("/dashboard");
    }
  };

  return (
    <div className="form-containerx sign-in-containerx">
      <Form className="form" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className="social-containerx">
          <a href="#" className="icon a">
            <i id="id-btn-login-phone" className="fa-solid fa-phone"></i>
          </a>
          <a href="#" className="icon a">
            <i id="id-btn-login-google" className="fa-brands fa-google"></i>
          </a>
        </div>
        <span>or use your email for registration</span>
        <Form.Control
          type="text"
          value={values.email}
          id="email"
          placeholder="Please, enter your email"
          onBlur={handleBlur}
          onChange={handleChange}
        />
        {errors.email && touched.email && (
          <p className="error">{errors.email}</p>
        )}
        <Form.Control
          value={values.password}
          id="password"
          type="password"
          onBlur={handleBlur}
          placeholder="Please, enter your password"
          onChange={handleChange}
        />
        {errors.password && touched.password && (
          <p className="error">{errors.password}</p>
        )}
        <a className="a" href="#">
          Forgot your password?
        </a>
        {isError && <p className="error">Incorrect email or password</p>}
        <Button className="button my-3" variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
};

export default LoginComponent;
