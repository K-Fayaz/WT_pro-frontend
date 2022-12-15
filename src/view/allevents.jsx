// import node modules here
import { useState, useEffect } from "react";
import axios from "axios";

// import components here
import Navbar from "../partials/navbar";
import EventCard from "../components/event_card";
import IsUser from "../JS/loginAuth";


// import css
import "../CSS/indx.css";
import "../CSS/event_card.css";

const AllEVents = () => {
  let [events, setEvents] = useState([]);

  useEffect(() => {
    IsUser();
    axios
      .get("/get/events", { withCredentials: true })
      .then((data) => {
        console.log(data.data);
        setEvents(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className="events-container">
        {events.map((data, index) => {
          return (
            <EventCard key={data._id} Id={data._id} Name={data.name} Description={data.description} Date={data.date} Time={data.time} Venue={data.venue}
            />
          );
        })}
      </div>
    </>
  );
};

export default AllEVents;