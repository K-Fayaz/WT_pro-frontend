import { useState, useEffect } from "react";
import $ from "jquery";
import axios from "axios";

import Navbar from "../partials/navbar";

import "../CSS/register.css";

const Register = () => {
  let [auth, setAuth] = useState("");
  let [user, setUser] = useState("");
  let [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post(
        "/user/register/",
        { user, email: auth, password },
        { withCredentails: true }
      )
      .then((data) => {
        console.log(data.data);
        // let { user } = data.data;
        window.location.assign("/all/events");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function enableBtn() {
    let btn = document.getElementById("confirm-btn");
    btn.removeAttribute("disabled");
    btn.style.background = "red";
    btn.style.cursor = "pointer";
  }

  function disableBtn() {
    let btn = document.getElementById("confirm-btn");
    btn.setAttribute("disabled", true);
    btn.style.cursor = "not-allowed";
    btn.style.background = "rgba(240,28,56,.44)";
  }

  function handleChange(event) {
    if (event.target.id === "username") {
      setUser(event.target.value);
    }

    if (event.target.id === "password") {
      setPassword(event.target.value);
    }
    console.log(password, user);
    if (password.length >= 8 && user.length >= 3) {
      enableBtn();
    } else {
      disableBtn();
    }
  }

  window.addEventListener("load", () => {
    disableBtn();
  });

  useEffect(() => {
    axios
      .get("/get/cookie/email/confirm", { withCredentails: true })
      .then((data) => {
        console.log(data.data);
        // console.log();
        let { isConfirmed } = data.data;
        if (isConfirmed) {
          setAuth(data.data.email_session);
        } else {
          window.location.assign("/confirm/email/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <>
      <Navbar />
      <div className="login-field-container">
        <div className="image-contaienr">
        
        </div>
        <div className="confirm-form-container">
          <div className="form">
            <form onSubmit={handleSubmit}>
              <div className="field-container user-field">
                <input
                  onChange={handleChange}
                  type="text"
                  name="username"
                  id="username"
                  value={user}
                />
              </div>
              <div className="field-container email-field">
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={auth}
                  readOnly
                />
              </div>
              <div className="field-container password-field">
                <input
                  onChange={handleChange}
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                />
              </div>
              <button id="confirm-btn">Register</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
