import React, { useEffect, useState } from "react";
import "./UserComponent.css";
import { Link, useNavigate } from "react-router-dom";
import RegisterComponent from "./RegisterComponent";
import LoginComponent from "./LoginComponent";
import { useAuth } from '../context/AuthContext'

const UserComponent = () => {
  const { isLoggedIn, loginContext, logoutContext, roleContext, setRoleCustomer, setRoleSeller } = useAuth();
  const [type, setType] = useState("signIn");
  const navigate = useNavigate();
  const handleOnClick = (text) => {
    if (text !== type) {
      setType(text);
      return;
    }
  };
  useEffect(() => {
    if (sessionStorage.getItem("login") != null) {
      navigate("/");
    }
  }, [navigate]);
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
};

export default UserComponent;
