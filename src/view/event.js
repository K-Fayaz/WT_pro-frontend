import { useState , useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Navbar from "../partials/navbar";
import IsUser from "../JS/loginAuth";
import ShowUsers from "../components/showUsers";


import "../CSS/event.css";


// function renderData(arr)
// {
//     arr.map((item,index)=>{
//         return(
//             <div className="user">
//                 <p className="username">{item.user}</p>
//                 <p className="user-email">{item.email}</p>
//             </div>
//         )
//     })
// }

// function isAdmin(admin,id)
// {
//     if(admin)
//     {
//         axios.get(`/event/users/${id}`,{ withCredentials: true })
//             .then((data)=>{
//                 renderData(data.data);
//             })
//             .catch((err)=>{
//                 console.log(err);
//             })
//     }
// }

const Event = ()=>{
    const { id } = useParams();
    let [event,setEvent] = useState("");
    const [admin, setAdmin] = useState(false);
    let [isRegistered,setIsRegistered] = useState(false);
    let [users,setUsers] = useState([]);

    useEffect(()=>{

        axios.get(`/event/users/${id}`,{ withCredentials: true })
        .then((data)=>{
            setUsers(data.data);
            // console.log("Number of Users are",users)
        })
        .catch((err)=>{
            console.log(err);
        })

        axios
        .get("/auth/admin/verify", { withCredentials: true })
        .then((data) => {
            setAdmin(data.data.admin);
            // console.log(data.data.admin);
        })
        .catch((err) => {
            console.log(err);
        });

        axios.get(`/user/is/registerd/${id}`,{ withCredentials: true })
            .then((data)=>{
                // console.log("Hi")
                console.log(data.data);
                if(data.data.registed)
                {
                    setIsRegistered(true);
                }else{
                    setIsRegistered(false);
                }
                console.log("I am register",isRegistered);
                // if(data.data.registed)
            })
            .catch((err)=>{
                console.log(err);
            })
        IsUser();
        axios.get(`/event/${id}`)
            .then((data)=>{
                console.log(data.data);
                setEvent(data.data)
            })
            .catch((err)=>{
                console.log(err);
            })
    },[]);

    function handleClick()
    {
        axios.post(`/event/register/${id}`,{ withCredentails: true })
            .then((data)=>{
                console.log(data);
                window.location.reload();
            })
            .catch((err)=>{
                console.log(err);
            })
    }

    return(
        <>
            <Navbar/>
            <div className="event-container">
                <div class="event">
                    <div className="img-container">
                        <img src={event.image} alt="poster"></img>
                    </div>
                    <p>Category: <span>technical</span> </p>
                    <div className="event-details">
                        <h1>{event.name}</h1>
                        <p>{event.description}</p>
                        <div className="event-time">
                            <p>Date: {event.date}</p>
                            <p>Time: {event.time}</p>
                        </div>
                        <h3>{event.venue}</h3>
                        <h3>Contact Number: <span>{event.contactNum}</span> </h3>
                        {
                                isRegistered === false && admin === false  ? (<button id="register-btn" onClick={handleClick} className="register-btn">Register</button>) :(<p></p>)
                        }
                        {
                                isRegistered == true && admin === false ? (<button id="register-btn"  className="register-btn">Registered</button>): (<p></p>)
                        }
                    </div>
                </div>
                        {
                            admin && event.registeredUser.length > 0 ? (<h1>List of registed users </h1>) : (<h1>There are no users registed for this event!</h1>)
                        }
                        {
                            admin ? (event.registeredUser.map((data,index)=>{
                                return(
                                    <div className="registered-user-container">
                                        <h4>{data.username}</h4>
                                        <h4>{data.email}</h4>
                                    </div>
                                )
                            })): (<p></p>)
                        }
            </div>
        </>
    )
};


export default Event;