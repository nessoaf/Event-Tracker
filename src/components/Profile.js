import React from 'react';
import { Link } from 'react-router-dom';

const Profile = (props) => {
    let userData = props.user
        ? <div class="jumbotron my-3">
            <h2 class="py-auto">Hello, {props.user.name}!</h2>
            <hr class="my-4" />
            <p class="lead"><strong>Email:</strong> {props.user.email}</p>
            <p class="lead"><strong>ZIP Code:</strong> {props.user.zipcode}</p>
            <p class="lead"><strong>Registered:</strong> {props.user.createdAt}</p>
        </div>
        : <h4>Loading...</h4>

    let errorDiv = () => {
        return (
            <div className="text-center pt-4"><h3>Please <Link to='/login'>login</Link> to view this page</h3></div>
        )
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {props.user ? userData : errorDiv()}
                </div>
            </div>
        </div>
    )
}

export default Profile;