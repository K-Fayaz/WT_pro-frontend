import { useState,useEffect } from "react";

// import packages here
import { BiMap , BiTimeFive } from "react-icons/bi";
import { BsCalendar2DayFill } from "react-icons/bs";
import AdminBtns from "./admin_ud";
import axios from "axios";


// import CSS files

const EventCard = (prop)=>{

  let [admin,setAdmin] = useState(false);

  useEffect(()=>{
    axios
      .get("/auth/admin/verify", { withCredentials: true })
      .then((data) => {
        console.log(data.data.admin);
        setAdmin(data.data.admin);
      })
      .catch((err) => {
        console.log(err);
      });
  },[admin]);


  return(
    <>
        <div className="event" id={"container-" + prop.Id}>
          <h2> <a href={"/event/"+ prop.Id }>{prop.Name}</a> </h2>
          <div className="event-schedule">
            <section className="event-date">
              <BsCalendar2DayFill className="react-icon"/>
              {prop.Date.toString().slice(0,10)}
            </section>
            <section className="time">
              <BiTimeFive className="react-icon"/>
              {prop.Time}
            </section>
            <section className="event-venue">
              <BiMap className="react-icon"/>
              {prop.Venue}
            </section>
            </div>
          <p>{prop.Description}</p>
          <div className="btns-container">
            <AdminBtns Admin={admin} Id={prop.Id} />
          </div>
        </div>
    </>
  );
}

export default EventCard;