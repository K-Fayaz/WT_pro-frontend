// import dependecies here
import $ from "jquery";
import { useState, useEffect } from "react";
import axios from "axios";

// import View components here
import Navbar from "../partials/navbar";

// import CSS files here
import "../CSS/event_create.css";

// import Javascript file here

const CreateEvent = () => {
  var date = "";
  var url = "";
  let [time, setTime] = useState({});
  let [venue, setVenue] = useState("");
  let [phone, setPhone] = useState("");
  let [eventType, setEventType] = useState("cultural");
  let [eventName, setEventName] = useState("");
  let [description, setDescription] = useState("");
  // let [url, setUrl] = useState("");
  let [image, setImage] = useState("");
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    axios
      .get("/auth/admin/verify", { withCredentials: true })
      .then((data) => {
        setAdmin(data.data.admin);
        console.log(data.data.admin);
        if (data.data.admin === true) {
          console.log("hello admin");
        } else {
          window.location.assign("/");
        }
        // if (!admin) {
        // }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [admin]);

  function submitValues()
  {
    let dateComp = document.getElementById("date");
    if (dateComp.value && time && venue && phone && eventType && eventName && description ) {
      $.ajax({
        url: "http://localhost:8080/post/events",
        method: "POST",
        data: {
          phone,
          time: time,
          image: url,
          venue: venue,
          name: eventName,
          type: eventType,
          description: description,
          date: dateComp.value,
        },
      })
        .then((data) => {
          console.log(data);
          window.location.assign("/");
        })
        .catch((err) => {
          dateComp.value = "";
          setTime("");
          setPhone("");
          setVenue("");
          setEventType("");
          setEventName("");
          setDescription("");
        });
    }else{
      alert(dateComp.value && time && venue && phone && eventType && eventName && description && url );
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    if(image)
    {
      let data = new FormData();
      data.append("file",image);
      data.append("upload_preset","voting");
      data.append("cloud_name","dvfpkko1z");

      fetch("https://api.cloudinary.com/v1_1/dvfpkko1z/image/upload", {
          method: "post",
          body: data,
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data.url);
            url = data.url;
            console.log(url);
            submitValues();
          })
          .catch((err) => {
            console.log(err);
          });
    }
  }

  function handleChange(event) {
    if (event.target.id === "event-name") {
      setEventName(event.target.value);
    }

    if (event.target.id === "image") {
      // console.log(event.target.files[0]);
      setImage(event.target.files[0]);
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

  return (
    <>
      <Navbar />
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h1>Create Event</h1>
          <div className="field-container event-name">
            <input
              onChange={handleChange}
              value={eventName}
              type="text"
              name="event-name"
              id="event-name"
            />
          </div>
          <div className="field-container image-field">
            <input
              onChange={handleChange}
              type="file"
              name="image"
              id="image"
            />
          </div>
          <div className="field-container details-field">
            <textarea
              onChange={handleChange}
              value={description}
              name="event-details"
              id="event-details"
              cols="30"
              rows="5"
            ></textarea>
          </div>
          <div className="field-container venue">
            <input
              onChange={handleChange}
              value={venue}
              type="text"
              name="venue"
              id="venue"
            />
          </div>
          <div className="field-container row-fields">
            <div>
              <input
                onChange={handleChange}
                type="date"
                name="date"
                id="date"
              />
            </div>
            <div>
              <input
                onChange={handleChange}
                value={time}
                type="time"
                name="time"
                id="time"
              />
            </div>
          </div>
          <div className="field-container event-type">
            <select
              name="event-type"
              id="event-type"
              value={eventType}
              onChange={handleChange}
            >
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
            <input
              onChange={handleChange}
              value={phone}
              type="number"
              name="phone-1"
              id="phone-1"
            />
          </div>
          <button className="form-btn">Create Event</button>
        </form>
      </div>
    </>
  );
};

export default CreateEvent;
