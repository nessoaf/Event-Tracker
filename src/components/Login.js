import React, { useState } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { Redirect } from 'react-router-dom'
import setAuthToken from '../utils/setAuthToken'

export default function Login(props) {
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")

    let handleEmail = (e) => {
        setEmail(e.target.value)
    }

    let handlePassword = (e) => {
        setPassword(e.target.value)
    }

    let handleSubmit = (e) => {
        e.preventDefault();
        const userData = {
            email: email,
            password: password,
        }

        axios.post(`${process.env.REACT_APP_API}/v1/users/login/`, userData)
            .then(res => {

                const { token } = res.data
                localStorage.setItem('jwtToken', token)
                setAuthToken(token)
                const decoded = jwt_decode(token)
                props.nowCurrentUser(decoded)
            })
            .catch(err => console.error(err))
    }

    if (props.user) return <Redirect to="/profile" user={props.user} />

    return (
        <div className="row mt-4">
            <div className="col-md-7 offset-md-3 text-light">
                <div className="card card-body bg-dark">
                    <h2 className="py-2">Login</h2>
                    <a class="btn btn-dark btn-lg" href="/register" role="button">Don't have an account? Make one!</a>
                    <form action="/ideas" method="post" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input type="email" name="email" value={email} onChange={handleEmail} className="form-control" placeholder='Email' />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input type="password" name="password" value={password} onChange={handlePassword} className="form-control" placeholder='Password' />
                        </div>
                        <button type="submit" className="btn btn-primary float-right">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}