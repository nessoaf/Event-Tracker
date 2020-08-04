import React, { useState } from 'react';
import axios from 'axios'
import { Redirect } from 'react-router-dom'
const Signup = () => {
    let [name, setName] = useState('')
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let [city, setCity] = useState('')
    let [address, setAddress] = useState('')
    let [state, setState] = useState('')
    let [zipcode, setZipcode] = useState('')
    let [redirect, setRedirect] = useState(false)

    let handleName = (e) => {
        setName(e.target.value)
    }

    let handleEmail = (e) => {
        setEmail(e.target.value)
    }

    let handleAddress = (e) => {
        setAddress(e.target.value)
    }

    let handleCity = (e) => {
        setCity(e.target.value)
    }

    let handleState = (e) => {
        setState(e.target.value)
    }
    
    let handleZipcode = (e) => {
        setZipcode(e.target.value)
    }

    let handlePassword = (e) => {
        setPassword(e.target.value)
    }

    let handleSubmit = (e) => {
        e.preventDefault()
        const newUser = {
            name: name,
            email: email,
            address: address,
            city: city,
            state: state,
            zipcode: zipcode,
            password: password
        }

        axios.post(`${process.env.REACT_APP_API}/v1/users/register`, newUser)
            .then(res => {
                setRedirect(true)
            })
            .catch(err => {
                console.error(err)
            })
    }
    if (redirect) return <Redirect to='/login' />

    return (
        <div className="row mt-4">
            <div className="col-md-7 offset-md-3 text-light">
                <div className="card card-body bg-dark">
                    <h2 className="py-2">Register</h2>
                    <a class="btn btn-dark btn-lg" href="/login" role="button">Already have an account? Sign in!</a>
                    <form action="/ideas" method="post" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name:</label>
                            <input type="text" name="name" value={name} onChange={handleName} className="form-control" placeholder='Name' required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input type="email" name="email" value={email} onChange={handleEmail} className="form-control" placeholder='Email' required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Address:</label>
                            <input type="text" name="address" value={address} onChange={handleAddress} className="form-control" placeholder='Address' />
                        </div>
                        <div className="form-group">
                            <label htmlFor="city">City:</label>
                            <input type="text" name="city" value={city} onChange={handleCity} className="form-control" placeholder='City' />
                        </div>
                        <div className="form-group">
                            <label htmlFor="state">State:</label>
                            <input type="text" name="state" value={state} onChange={handleState} className="form-control" placeholder='State' />
                        </div>
                        <div className="form-group">
                            <label htmlFor="zipcode">Zipcode:</label>
                            <input type="text" name="zipcode" value={zipcode} onChange={handleZipcode} className="form-control" placeholder='Zipcode' required />
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
    );
};

export default Signup;