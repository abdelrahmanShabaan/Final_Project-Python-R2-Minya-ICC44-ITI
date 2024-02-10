import React, { useEffect, useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import LoginSchema from "../../schemas/loginSchema";
import ValidSchema from "../../schemas/regSchema";
import { useFormik } from "formik";

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

      onSubmit: (values) => {
        if (findAccount(values.email, values.password)) {
          sessionStorage.setItem("login", JSON.stringify(values));
          setIsError(false);
          navigate("/");
        } else {
          setIsError(true);
        }
      },
    });

  useEffect(() => {
    if (sessionStorage.getItem("login") !== null) {
      navigate("/");
    }
  }, [navigate]);

  let locally = JSON.parse(localStorage.getItem("Account Storage") || "[]");

  let findAccount = (email, password) => {
    return locally.some(
      (item) => item.email === email && item.password === password
    );
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
          type="password"
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
        {isError && (
          <Alert variant="danger">
            <Alert.Heading>Error</Alert.Heading>
            <p>Invalid email or password.</p>
          </Alert>
        )}
      </Form>
    </div>
  );
};

function RegisterComponent() {
  const [isSuccess, setIsSuccess] = useState(false);
  let accounts = JSON.parse(localStorage.getItem("Account Storage") || "[]");

  const { values, errors, handleChange, handleSubmit, touched, handleBlur } =
    useFormik({
      initialValues: {
        email: "",
        name: "",
        password: "",
      },
      validationSchema: ValidSchema,

      onSubmit: (values, { resetForm }) => {
        if (!accounts.some((item) => item.email === values.email)) {
          accounts.push(values);
          localStorage.setItem("Account Storage", JSON.stringify(accounts));
          setIsSuccess(true);
          resetForm();
        }
      },
    });

  return (
    <div className="form-containerx sign-up-containerx">
      <Form className="form" onSubmit={handleSubmit}>
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
          className={errors.name && touched.name ? "input-error" : ""}
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
          className={errors.email && touched.email ? "input-error" : ""}
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
          className={errors.password && touched.password ? "input-error" : ""}
        />
        {errors.password && touched.password && (
          <p className="error">{errors.password}</p>
        )}
        <button type="submit" className="button">
          Register
        </button>

        {isSuccess && (
          <Alert variant="success">
            <Alert.Heading>Success</Alert.Heading>
            <p>Account created successfully!</p>
          </Alert>
        )}
      </Form>
    </div>
  );
}

const UserComponent = () => {
  const [type, setType] = useState("signIn");

  const handleOnClick = (text) => {
    if (text !== type) {
      setType(text);
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
              <p>To keep connected with us, please login with your personal info</p>
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
};

export default UserComponent;