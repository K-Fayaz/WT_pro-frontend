import axios from "axios";



function IsUser()
{
    axios.get("/auth/get/user", { withCredentails: true })
      .then((data) => {
        if(!data.data.user)
        {
            window.location.assign("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
}

export default IsUser;