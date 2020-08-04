import React, {useState, useEffect} from 'react'
import EventName from './EventComponents/EventName'
import axios from 'axios';

export default function EventsTemplate(props) {
    const defaultEventsState = [{"title": "Fetching Events, please wait..."}]

    // test array of objects to mimic API response
    const testEvents = [{
        "url": "http://sandiego.eventful.com/events/lgbt-book-club-/E0-001-134699507-9?utm_source=apis&utm_medium=apim&utm_campaign=apic",
        "id": "E0-001-134699507-9",
        "city_name": "San Diego"
    }]

    let backupUrl = `https://cors-anywhere.herokuapp.com/http://api.eventful.com/json/events/get?app_key=NFRS6FwLVhcNKTWD&keywords=concerts&location=Seattle&date=Future`

    let singleEvent = []

    //calls API on page render
    useEffect(() => {
        setEvents(defaultEventsState)
        let apiUrl = `https://api.eventful.com/json/events/search?app_key=NFRS6FwLVhcNKTWD&keywords=concerts&location=Seattle&date=Future`
        axios.get(apiUrl)
        .then(response => {
            singleEvent = []
            let eventfulData = response.data.events.event
            eventfulData.forEach(function(eventInfo) {
                var i = 0
                if (i == singleEvent.length) {
                    singleEvent.push(`${eventInfo.title}`)
                } 
            })
            setEvents(response.data.events.event)
        })
        .catch(err => console.log(err))
    }, [])

    const [events,setEvents] = useState(testEvents)

    return (
        <div className="row margin">
            <div className="col-lg-6 offset-lg-3">
                <h1>Event Details:</h1>
                <EventName events={events} />
            </div>
        </div>
    )
}