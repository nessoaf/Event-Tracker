import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import EventsDisplay from './EventsDisplay'
import axios from 'axios';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

export default function Calendar(props) {
    let user = props.user

    const testEvents = [{
        "url": "http://sandiego.eventful.com/events/lgbt-book-club-/E0-001-134699507-9?utm_source=apis&utm_medium=apim&utm_campaign=apic",
        "id": "E0-001-134699507-9",
        "city_name": "San Diego"
    }]
    let backupCall = user ?
        `https://cors-anywhere.herokuapp.com/http://api.eventful.com/json/events/search?app_key=${process.env.REACT_APP_EVENTFUL_KEY}&location=${user.zipcode}&date=Future`
        :
        `https://cors-anywhere.herokuapp.com/http://api.eventful.com/json/events/search?app_key=${process.env.REACT_APP_EVENTFUL_KEY}&location=Seattle&date=Future`

    //calls API on page render
    useEffect(() => {
        setEvents([{ "title": "Fetching Events, please wait..." }])
        let apiUrl = `http://api.eventful.com/json/events/search?app_key=${process.env.REACT_APP_EVENTFUL_KEY}&keywords=concerts&location=98101&date=Future`
        axios.get(backupCall)
            .then(response => {
                setEvents(response.data.events.event)
            })
            .catch(err => console.log('ERROR IN frontend /components/Calendar.js: ' + err))
    }, [])

    const [events, setEvents] = useState(testEvents)

    return (
        <div className="Calendar">
            <div class="row my-5">
                <div class="col-4 offset-1">
                    <h3 id="calendar-title">Upcoming Events</h3>
                    <div id="events-display-container">
                        <EventsDisplay events={events} user={user} />
                    </div>
                </div>
                <div class="col-6">
                    <FullCalendar
                        plugins={[dayGridPlugin]}
                        initialView="dayGridMonth"
                    />
                </div>
            </div>
        </div>
    )
}
