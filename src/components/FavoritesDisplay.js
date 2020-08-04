import React from "react"
import axios from 'axios'


const FavoritesDisplay = (props) => {
    // iterates over array of object (Calendar.js)
    let favoritesList = props.favorites.map((event, i) => {

        console.log(Object.keys(process.env))
        console.log(process.env.REACT_APP_SERVER_URL)

        let desc = ""
        if (event.description) {
            desc = event.description.replace(/(<([^>]+)>)/ig, '');
            desc = desc.replace(/&#39;/g, "'")
            desc = desc.replace(/&quot;/g, '')
        }

        let headerOptions = {
                'accept': 'application/json',
                'accept': 'text/json',
                'accept': 'text/javascript',
                'Content-Type': 'application/json'
            }   

        let handleClick = (e) => {
            // e.preventDefault()
            axios.delete(`${process.env.REACT_APP_SERVER_URL}v1/favorites/deleteFavorite/${event._id}`)
            .then(response => {
                props.handleDelete()
                console.log(event._id)
                if (response.status === 200) {
                    console.log(response.data.message)
                } else {
                    console.log(response.statusText)
                }
            })
            .catch(err => console.log(err.message))
            
        }
        
        return (
            <div class="card border mb-3" styles="max-width: 20rem;">
                <div class="card-header">{event.start_time}</div>
                <div class="card-body">
                    <h4 class="card-title">{event.title}</h4>
                    <p class="card-text">{event.venue_address}</p>
                    <p class="card-text">{desc}</p>
                    <button onClick={handleClick} className={`deleteButton`} id={`${event._id}`}>Remove Event from Favorites</button>
                </div>
            </div>
        )
    })
    console.log(favoritesList)

    return (
        <div className="favoritesDisplay">
            {favoritesList}
        </div>
    );
}

export default FavoritesDisplay