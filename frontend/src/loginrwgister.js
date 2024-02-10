import React, { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import LoginSchema from "../../schemas/loginSchema";
import { useFormik } from "formik";
import { useState } from "react";
import ValidSchema from "../../schemas/regSchema";
import Alert from "react-bootstrap/Alert";
import "./stylex.css";

const LoginComponent = () => {
  const navigate = useNavigate();
  let locally = JSON.parse(localStorage.getItem("Account Storage") || "[]");
  let sessionLogin = JSON.parse(sessionStorage.getItem("login") || "[]");
  const [isError, setIsError] = useState(false);
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [type, setType] = useState("signIn");

  const { handleSubmit, values, errors, handleBlur, touched, handleChange } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: LoginSchema,

      onSubmit: (event) => {
        if (findAccount(values.email, values.password)) {
          sessionStorage.setItem("login", JSON.stringify(values));
          setIsError(false);
          handleRefresh();
          navigate("/");
        } else {
          console.log("ERROR");
          setIsError(true);
        }
      },
    });

    useEffect(() => {
      if (sessionStorage.getItem("login")!=null) {
        navigate("/");
      }
    }, [navigate]);

  useEffect(() => {
    let showUserPanel = () => {
      if (sessionLogin.length > 0) {
        setIsLoggedin(true);
        setShowForm(false);
      } else {
        setIsLoggedin(false);
        setShowForm(true);
      }
    };

    showUserPanel();
  }, []);

  let findAccount = (email, password) => {
    let found = locally.find(
      (item) => item.email === email && item.password === password
    );
    return found ? true : false;
  };

  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey((prevKey) => prevKey + 1);
    let showUserPanel = () => {
      if (sessionLogin.length > 0) {
        setIsLoggedin(true);
        setShowForm(false);
      } else {
        setIsLoggedin(false);
        setShowForm(true);
      }
    };

    showUserPanel();
  };
  const logoutFun = () => {
    sessionLogin.pop();
    sessionStorage.setItem("login", JSON.stringify(sessionLogin));
    handleRefresh();
    console.log(sessionLogin);
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
        <span>or use your email for registeration</span>
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
        <Button className="my-3" variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
};

function RegisterComponent() {
  let accounts = JSON.parse(localStorage.getItem("Account Storage") || "[]");
  const [isSucess, setIsSucess] = useState(false);

  const { values, errors, handleChange, handleSubmit, touched, handleBlur } =
    useFormik({
      initialValues: {
        email: "",
        name: "",
        password: "",
      },
      validationSchema: ValidSchema,

      onSubmit: (values, { resetForm }) => {
        if (isValidEmail(values.email)) {
          accounts.push(values);
          localStorage.setItem("Account Storage", JSON.stringify(accounts));
          resetForm();
        } else {
          setIsSucess(true);
        }
      },
    });

  const isValidEmail = (email) => {
    const found = accounts.find((item) => item.email === email);
    return !found;
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
            type="password"
            className="input"
            name="password"
            value={values.password}
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Please, enter your password"
            class={errors.password && touched.password ? "input-error" : ""}
          />
          {errors.password && touched.password && (
            <p className="error">{errors.password}</p>
          )}
          <button type="submit" className="button">
            Register
          </button>

          {isSucess && (
            <>
              <div class="fluid pt-3">
                <div className="fluid">
                  <Alert
                    variant="danger"
                    style={{ width: "200px", height: "100px" }}
                    className="fluid"
                  >
                    <Alert.Heading>Whoa not so fast</Alert.Heading>
                    <p>Account Already Registered</p>
                  </Alert>
                </div>
              </div>
            </>
          )}
        </form>
      </div>
    </>
  );
}


const UserComponent = () => {
  const [type, setType] = useState("signIn");
  const handleOnClick = text => {
    if (text !== type) {
      setType(text);
      return;
    }
  };
  const containerxClass =
    "containerx " + (type === "signUp" ? "right-panel-active" : "");
  return (
    <div className="ghost body">
      <div className={containerxClass} id="containerx">
        <RegisterComponent />
        <LoginComponent />
        <div className="overlay-containerx">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
              To keep connected with us, please login with your personal info
              </p>
              <button
                className="ghost button"
                id="signIn"
                onClick={() => handleOnClick("signIn")}
              >
                Login
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start the journey with us</p>
              <button
                className="ghost button"
                id="signUp"
                onClick={() => handleOnClick("signUp")}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserComponent;