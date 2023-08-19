import axios from 'axios';
import React, { useState } from 'react';
import { Link, Router, useNavigate } from 'react-router-dom';
// import './App.css';

function Signup() {
    const navigate = useNavigate();
    let blankObj = {
        username: '',
        email: '',
        password: '',
        referperson: ''
    }
    const [obj, setobj] = useState({ ...blankObj })


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setobj((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        if (obj.username !== "" && obj.email !== "" && obj.password !== "" && obj.referperson !== "") {

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(obj)
            };
            let response = await fetch('http://localhost:4000/api/auth/signup', requestOptions)
            .then((res)=> res.json())
            if (response.status == true) {
                navigate('/login');
            } else {
                alert(response.message)
            }
        } else {
            alert("something went wrong")
        }

        setobj({ ...blankObj })
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h2>Sign Up</h2>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="username"
                    value={obj.username}
                    onChange={handleInputChange}
                    required
                />

                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={obj.email}
                    onChange={handleInputChange}
                    required
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={obj.password}
                    onChange={handleInputChange}
                    required
                />

                <label htmlFor="referperson">Referral Person:</label>
                <input
                    type="text"
                    id="referperson"
                    name="referperson"
                    value={obj.referperson}
                    onChange={handleInputChange}
                />

                <button type="submit">Sign Up</button>
                <p className="forgot-password text-right mt-2">
                    Go to  <Link to="/login">Login Page</Link>
                </p>
            </form>
        </div>
    );
}

export default Signup;
