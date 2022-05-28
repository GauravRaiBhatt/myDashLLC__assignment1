import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bg from "../images/bg.png";
import "./login.css";

function Login() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userConfirmPassword, setUserConfirmPassword] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [isChecked, setIsChecked] = useState(true);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    userName: "",
    userPhone: "",
    tnc: "",
  });

  const handleCreateUser = () => {
    let e = {
      email: "",
      password: "",
      confirmPassword: "",
      userName: "",
      userPhone: "",
      tnc: "",
    };

    // validation logic
    let isValid = true;
    if (userEmail.length == 0) {
      isValid = false;
      e.email = "must not be empty";
    } else if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail)
    ) {
      isValid = false;
      e.email = "wrong email address";
    }

    if (userPassword.length == 0) {
      isValid = false;
      e.password = "must not be empty.";
    }
    if (userConfirmPassword.length == 0) {
      isValid = false;

      e.confirmPassword = "must not be empty.";
    } else {
      if (userPassword != userConfirmPassword) {
        isValid = false;
        e.confirmPassword = "confirm password must be same as password.";
      }
    }
    if (userName.length == 0) {
      isValid = false;
      e.userName = "must not be empty.";
    }
    if (userPhone.length == 0) {
      isValid = false;
      e.userPhone = "must not be empty.";
    } else {
      if (userPhone.length != 10) {
        isValid = false;
        e.userPhone = "invalid phone number";
      }
    }

    if (!isChecked) {
      isValid = false;
      e.tnc = "accept the terms and conditions";
    }

    setErrors(e);
    if (isValid) {
      localStorage.setItem("userName", userName);
      navigate("/home");
    }
  };

  useEffect(() => {
    localStorage.removeItem("userName");
  }, []);

  return (
    <div id="Login__Container">
      <div id="Login__Left">
        <img src={bg} alt="bg" />
        <div id="toi">
          <h2>Choose a date range</h2>
          <span>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat
            asperiores aliquid iste placeat eaque vel provident.
          </span>
        </div>
      </div>
      <div id="Login__Right">
        <h1>Create an account</h1>

        <div className="Login__FormContainer">
          <div className="container">
            <label htmlFor="userEmail">
              <strong>Your email address</strong>
            </label>
            <input
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              name="userEmail"
              required
            />
            <span className="error" id="error__email">
              {errors.email}
            </span>
          </div>

          <div className="container">
            <label htmlFor="userPassword">
              <strong>Your password</strong>
            </label>
            <input
              type="password"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              name="userPassword"
              required
            />
            <span className="error" id="error__password">
              {errors.password}
            </span>
          </div>

          <div className="container">
            <label htmlFor="userConfirmPassword">
              <strong>Confirm your password</strong>
            </label>
            <input
              type="password"
              value={userConfirmPassword}
              onChange={(e) => setUserConfirmPassword(e.target.value)}
              name="userConfirmPassword"
              required
            />
            <span className="error" id="error__conformPassword">
              {errors.confirmPassword}
            </span>
          </div>

          <div className="container">
            <label htmlFor="userName">
              <strong>Your full name</strong>
            </label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              name="userName"
              required
            />
            <span className="error" id="error__userName">
              {errors.userName}
            </span>
          </div>

          <div className="container">
            <label htmlFor="userPhone">
              <strong>Your phone number</strong>
            </label>
            <input
              type="number"
              value={userPhone}
              onChange={(e) => setUserPhone(e.target.value)}
              name="userPhone"
              required
              placeholder="exclude country code"
            />
            <span className="error" id="error__phone">
              {errors.userPhone}
            </span>
          </div>
          <div className="container">
          <label id="tnc">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => {
                setIsChecked(!isChecked);
              }}
              name="tnc"
            />
            I read and agree Terms and Conditions
          </label>
          <span className="error" id="error__tnc">
            {errors.tnc}
          </span>
          </div>
          <button id="submit" type="submit" onClick={() => handleCreateUser()}>
            Create account
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
