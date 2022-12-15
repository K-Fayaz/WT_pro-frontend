// import packages
import $ from "jquery";
import axios from "axios";
import { useState } from "react";

const ConfirmEmail = ()=>{

  let regX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  let [confirmEmail,setConfirmEmail] = useState("");

  function enableBtn()
  {
    let btn = document.getElementById("confirm-btn");
    btn.removeAttribute("disabled");
    btn.style.background = "red";
    btn.style.cursor = "pointer";
  }

  function disableBtn()
  {
    let btn = document.getElementById("confirm-btn");
    btn.setAttribute("disabled",true);
    btn.style.cursor = "not-allowed";
    btn.style.background = "rgba(240,28,56,.44)";
  }

  window.addEventListener("load",()=>{
    disableBtn();
  })

  function handleChange(event)
  {
    if(event.target.id == "confirm-email")
    {
      setConfirmEmail(event.target.value);
      if(regX.test(event.target.value) && event.target.value.includes("@kletech.ac.in"))
      {
        enableBtn();
      }else{
        disableBtn();
      }
    }
  }

  function handleConfirmSubmit(event)
  {
    event.preventDefault();
    console.log(regX.test(confirmEmail));
    if(regX.test(confirmEmail))
    {

      axios.post("/confirm/email/",
        { email: confirmEmail },{ withCredentails: true } )
        .then((data)=>{
          console.log(data);
          setConfirmEmail("");
        })
        .catch((err)=>{
          console.log(err.response.data.message);
          setConfirmEmail("");
          alert(err.response.data.message || "something went wrong !");
        });

    /*  $.ajax({
        method:"POST",
        url:"http://localhost:8080/confirm/email/",
        data:{
          email: confirmEmail
        }
      })
      .then((data)=>{
        console.log(data);
      })
      .catch((err)=>{
        console.log(err);
      })
    */
    }
  }

  return(
    <>
      <div className="confirm-form-container" id="confirm-form-container">
        <div className="form">
          <form onSubmit={handleConfirmSubmit}>
            <h2>Enter email</h2>
            <div className="field-container email-field">
              <input onChange={handleChange} value={confirmEmail} type="email" name="email" id="confirm-email" />
            </div>
            <button id="confirm-btn" className="confirm-btn">Send Email <span className="loader"></span> </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default ConfirmEmail;
