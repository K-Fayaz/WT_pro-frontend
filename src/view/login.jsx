// import dependencies here
import { useState } from "react";
import axios from "axios";

// import components here
import Navbar from "../partials/navbar";

const Login  = ()=>{
  const regX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const [email,setEmail] = useState("");
  const [passErr,setPassErr] = useState("");
  const [password,setPassword] = useState("");

  function disableBtn()
  {
    let btn = document.getElementById("login-btn");
    btn.setAttribute("disabled",true);
    btn.style.cursor = "not-allowed";
    btn.style.background = "rgba(240,28,56,.44)";
  }

  function enableBtn()
  {
    let btn = document.getElementById("login-btn");
    btn.removeAttribute("disabled");
    btn.style.background = "red";
    btn.style.cursor = "pointer";
  }

  function handleChange(event)
  {
    if(event.target.id === "email")
    {
      setEmail(event.target.value);
    }

    if(event.target.id === "password")
    {
      setPassword(event.target.value);
    }

    // if(password.length >= 8 && regX.test(email))
    // {
    //   enableBtn();
    //   setPassErr("");
    // }else{
    //   disableBtn();
    // }

    if(password.length >= 8 && email.includes("@kletech.ac.in") && regX.test(email))
    {
      enableBtn();
      setPassErr("");
    }else{
      disableBtn();
    }

  }

  function handleSubmit(event)
  {
    event.preventDefault();
    let data = {
      email: email,
      password: password,
    }

    axios.post("/login",{ email , password },{ withCredentails: true })
      .then((data)=>{
        console.log(data);
        window.location.assign("/");
        setEmail("");
        setPassword("");
      })
      .catch((err)=>{
        setEmail("");
        setPassword("");
        console.log(err.response);
        if(err.response.status == "403")
        {
          alert(err.response.data);
        }
        else if(err.response.status == "400")
        {
          setPassErr(err.response.data);
        }else{
          alert("something went wrong try again!");
        }
      })


  }

  // disable the button on window load
  window.addEventListener("load",()=>{
    disableBtn();
  })

  return(
    <>
      <Navbar />
      <div className="login-field-container">
      <div className="image-contaienr">
        
      </div>
      <div className="confirm-form-container">
        <div className="form">
        <h3>Login to  Department Activity management</h3>
          <form onSubmit={handleSubmit}>
            <div className="field-container email-field">
              <input onChange={handleChange} value={email} type="email" name="email" id="email"/>
            </div>
            <div className="field-container password-field">
              <input onChange={handleChange} value={password} type="password" name="password" id="password"/>
              <p style={{color: "red"}}>{passErr}</p>
            </div>
            <button id="login-btn">login</button>
          </form>
        </div>
      </div>
      </div>
    </>
  )
}

export default Login;
