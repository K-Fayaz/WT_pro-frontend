// import packages here
import $ from "jquery";
import { useState , useEffect } from "react";

// import components here
import Navbar from "../partials/navbar";
// import EventCard from "../components/event_card";
import IsUser from "../JS/loginAuth";

// import CSS files here
import "../CSS/indx.css";
import "../CSS/home.css";
import "../CSS/event_card.css";
import Card from "../components/home_card";

const Home = ()=>{

  let [eventData,setEventData] = useState([]);

  useEffect(()=>{
    IsUser();
    $.ajax({
      method:"GET",
      url:"http://localhost:8080/get/events"
    })
    .then((data)=>{
      setEventData(data.slice(0,5));
      console.log(data);
    })
    .catch((err)=>{
      console.log(err);
    })
  },[])

  return(
    <>
      <Navbar/>
        <h1 style={{textAlign: "center", margin: "20px 0"}}>Computer Science Department Activity Management</h1>
      <div className="hero-image">
      </div>
      <div className="recent-events-head">
        <h1>Recent Events</h1>
        <div className="events-container">
          {
            eventData.map((data,index)=>{

                return(
                  <Card key={index} Id={data._id} Name={data.name} Date={data.date} Time={data.time} Venue={data.venue} />
                )
            })
          }
          {
            eventData.length > 5 ? (<a href="/all/events">See More...</a>) : (<p></p>)
          }
        </div>
      </div>
    </>
  )
}

export default Home;
