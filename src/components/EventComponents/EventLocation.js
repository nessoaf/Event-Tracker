import React from "react"


const EventLocation = (props) => {
    // iterates over array of object (Calendar.js)
    let eventsLocationDetail = props.events.map((event, i) => {
        return (
            <div>
                {event.venue_address}
                <br />
            </div>
        )
    })

    return (
        <div>
            {eventsLocationDetail}
        </div>
    );
}

export default EventLocation