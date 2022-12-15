import { useState, useEffect } from "react";
import "../CSS/navbar.css";

import axios from "axios";

function isLoggedIn(user) {
  function handleClick() {
    axios
      .post("/logout", { withCredentails: true })
      .then((data) => {
        console.log(data);
        window.location.assign("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  if (!user) {
    return (
      <>
        <li>
          <a href="/login">login</a>
        </li>
        <li>
          <a href="/signup">register</a>
        </li>
      </>
    );
  } else {
    return (
      <li>
        <p onClick={handleClick}>Logout</p>
      </li>
    );
  }
}

function isAdmin(admin) {
  if (admin) {
    return <li><a href="/create/event/">add event</a></li>;
  }
}

const Navbar = () => {
  const [user, setUser] = useState("");
  const [admin, setAdmin] = useState(false);
  useEffect(() => {
    axios
      .get("/auth/get/user", { withCredentails: true })
      .then((data) => {
        // console.log(data);
        setUser(data.data.user);
        // console.log("Hi");
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("/auth/admin/verify", { withCredentials: true })
      .then((data) => {
        setAdmin(data.data.admin);
        console.log(data.data.admin);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <nav class="nav-container">
        <div class="main-logo">
          <a href="/">
            <img src="../../download.jpg" alt="Logo" />
          </a>
          <h1 id="hamburger-menu" class="hamburger-menu">
            &#9776;
          </h1>
        </div>
        <div class="nav-links-container">
          <ul id="nav-links">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/all/events/">events</a>
            </li>
            {isLoggedIn(user)}
            {isAdmin(admin)}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
