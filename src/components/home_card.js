import { BiMap , BiTimeFive } from "react-icons/bi";
import { BsCalendar2DayFill } from "react-icons/bs";

const Card = (prop)=>{
    return(
        <>
            <div className="card-container">
                <h1 className="card-title"><a href={"/event/"+prop.Id}>{prop.Name}</a></h1>
                <div className="card-info">
                    <section>
                        <BsCalendar2DayFill className="card-icons"/>
                        {prop.Date}
                    </section>
                    <section>
                        <BiTimeFive className="card-icons"/>
                        {prop.Time}
                    </section>
                    <section>
                        <BiMap className="card-icons"/>
                        {prop.Venue}
                    </section>
                </div>
            </div>
        </>
    )
}

export default Card;