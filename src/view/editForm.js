// import node moules here
import { useState , useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

// import packages here
import Navbar from "../partials/navbar";

// import CSS files here
import "../CSS/navbar.css";
import "../CSS/event_create.css";

const EditEvent = ()=>{

    const { id } = useParams();
    // let [admin,setAdmin] = useState("");
    let [event,setEvent] = useState("");
    let date="";
    let [time, setTime] = useState("");
    let [venue, setVenue] = useState("");
    let [phone, setPhone] = useState("");
    let [eventType, setEventType] = useState("");
    let [eventName, setEventName] = useState("");
    let [description, setDescription] = useState("");

    console.log(id)

    useEffect(()=>{

      axios
      .get("/auth/admin/verify", { withCredentials: true })
      .then((data) => {
        console.log(data.data.admin);
        if (data.data.admin === true) {
          console.log("hello admin");
        } else {
          window.location.assign("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });

        if(id)
        {
            axios.get(`/event/${id}`)
                .then((data)=>{
                    console.log(data.data);
                    setEvent(data.data);
                    setVenue(data.data.venue);
                    setPhone(data.data.contactNum);
                    setEventType(data.data.eventType);
                    setDescription(data.data.description);
                    setEventName(data.data.name);
                })
                .catch((err)=>{
                    console.log(err);
                })
        }else{
          window.location.assign("/");
        }
    },[]);

    function handleSubmit(event)
    {
        event.preventDefault();
        const dateComp = document.getElementById("date");
        console.log(dateComp.value && time && venue && phone && eventType && eventName && description)

        if(dateComp.value && time && venue && phone && eventType && eventName && description)
        {
            axios.put(`/event/${id}/edit`,{
              name: eventName,
              type: eventType,
              description,
              time,
              date: dateComp.value,
              phone,
              venue,
             },{ withCredentials: true })
             .then((data)=>{
              console.log(data);
              window.location.assign(`/event/${id}`);
             })
             .catch((err)=>{
              console.log(err);
             })
        }

    }

    function handleChange(event) {
    if (event.target.id === "event-name") {
      setEventName(event.target.value);
    }

    if (event.target.id === "event-details") {
      setDescription(event.target.value);
    }

    if (event.target.id === "venue") {
      setVenue(event.target.value);
    }

    if (event.target.id === "date") {
      date = event.target.value;
      console.log(date);
      console.log(event.target.value);
    }

    if (event.target.id === "time") {
      setTime(event.target.value);
    }

    if (event.target.id === "event-type") {
      setEventType(event.target.value);
    }

    if (event.target.id === "phone-1") {
      setPhone(event.target.value);
    }
  }

    return(
        <>
            <Navbar/>
            <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h1>Create Event</h1>
          <div className="field-container event-name">
            <input onChange={handleChange} value={eventName} type="text" name="event-name" id="event-name"/>
          </div>
          <div className="field-container details-field">
            <textarea onChange={handleChange} value={description}  name="event-details" id="event-details" cols="30" rows="5"
            ></textarea>
          </div>
          <div className="field-container venue">
            <input onChange={handleChange} value={venue}  type="text" name="venue" id="venue"
            />
          </div>
          <div className="field-container row-fields">
            <div>
              <input onChange={handleChange} type="date" name="date" id="date"
              />
            </div>
            <div>
              <input onChange={handleChange} value={time} type="time" name="time" id="time"/>
            </div>
          </div>
          <div className="field-container event-type">
            <select name="event-type" id="event-type" onChange={handleChange} value={eventType}>
              <option value="cultural">cultural</option>
              <option value="co-curricular">co-curricular</option>
              <option value="Hackathon">Hackathon</option>
              <option value="technical">technical</option>
            </select>
          </div>
          <div id="phone-field-container" className="field-container phone">
            <section>
              <h4>Add contact numbers</h4>
            </section>
            <input onChange={handleChange} value={phone} type="number" name="phone-1" id="phone-1" />
          </div>
          <button className="form-btn">Create Event</button>
        </form>
      </div>
        </>
    )
}

export default EditEvent;
