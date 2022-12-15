import axios from "axios";

const AdminBtns = (prop)=>{

    function handleClick(event)
    {
        axios.delete(`/delete/event/${prop.Id}`)
            .then((data)=>{
            console.log(data);
            document.getElementById(`container-${prop.Id}`).style.display = "none";
            })
            .catch((err)=>{
            console.log(err);
            })
    }

    if(prop.Admin === true)
    {
        return(
          <>
            <button id="deleteBtn" onClick={handleClick}>Delete</button>
            <button id="editBtn"><a href={"/event/"+prop.Id+"/edit"}>Edit</a></button>
          </>
        )
    }
}

export default AdminBtns;