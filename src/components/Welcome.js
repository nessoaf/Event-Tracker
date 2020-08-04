import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Welcome(props) {
    return (
    <div className="row">
        <div className="col-lg-8 offset-lg-2">
        <div className="jumbotron my-3">
            <h1 className="display-3">EVENT TRACKER</h1>
            <p className="lead">Events anywhere and everywhere! Event Tracker allows you to save the ones that pique your interest and find it on a map.</p>
            <hr className="my-2" />
            <p>Never suffer from FOMO again!</p>
            {
            props.isAuthenticated ?
                <NavLink className="btn btn-dark btn-lg" to="/profile" role="button">Get Profile</NavLink>
                :
                <NavLink className="btn btn-dark btn-lg" to="/register" role="button">Sign Up!</NavLink>
            }
        </div>
        </div>
    </div>
    )
}