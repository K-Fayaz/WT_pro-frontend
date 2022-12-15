// import packages

// import components here
import Navbar from "../partials/navbar"
import ConfirmEmail from "../components/confirm_email_pop_up";

// import CSS files here
import "../CSS/register.css";

const ConfirmEmailContainer = ()=>{

  return(
    <>
    <Navbar/>
      <div className="login-field-container">
        <div className="image-contaienr">
        
        </div>
        <ConfirmEmail />
      </div>
    </>
  )
}


export default ConfirmEmailContainer;
