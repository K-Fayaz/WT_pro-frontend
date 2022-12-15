


const EventCreateForm = ()=>{
  return(
    <div className="form-container">
      <form>
        <h1>Create Event</h1>
        <div className="field-container event-name">
          <input type="text" name="event-name" id="event-name"/>
        </div>
        <div className="field-container details-field">
          <textarea name="event-details" id="event-details" cols="30" rows="5"></textarea>
        </div>
        <div className="field-container venue">
          <input type="text" name="venue" id="venue"/>
        </div>
        <div className="field-container row-fields">
          <div>
            <input type="date" name="date" id="date"/>
          </div>
          <div>
            <input type="time" name="time" id="time"/>
          </div>
        </div>
        <div className="field-container event-type">
          <select name="event-type" id="event-type">
            <option value="cultural">cultural</option>
            <option value="co-curricular">co-curricular</option>
            <option value="Hackathon">Hackathon</option>
            <option value="technical">technical</option>
          </select>
        </div>
        <div id="phone-field-container" className="field-container phone">
          <section>
            <h4>Add contact numbers</h4>
            <button id="phone-add-btn">+</button>
          </section>
          <input type="number" name="phone-1" id="phone-1"/>
        </div>
        <button className="form-btn">Create Event</button>
      </form>
    </div>
  );
}


export default EventCreateForm;
