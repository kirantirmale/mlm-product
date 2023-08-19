import axios from "axios";
import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import swal from 'sweetalert';


function Login() {
const navigate = useNavigate();

  let token = ''

  let TokenHeader = {
    headers: {
      'Authorization': 'Bearer '.concat(token)
    }
  }

  let blankObject = { email: '', password: '' }
  const [obj, setobj] = useState(blankObject);

  const getValue = (e) => {
    setobj({ ...obj, [e.target.name]: e.target.value })
  }

  const save = async (x) => {
    x.preventDefault()
    if (obj.email == '' || obj.password == '') {
      swal({
        title: 'Email or Password is requride'
      })
      setobj({ ...blankObject })
    }
    else {
      getlogin(obj)
    }
  }

  const getlogin = async (obj) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obj)
    };
    let responce = await fetch('http://localhost:4000/api/auth/login', requestOptions).then((res)=>{return res.json()})
    if (responce.status == true) {
      localStorage.setItem('token', responce.token)
      navigate('/product')
    } else {
      alert(responce.message)
    }
  }


  useEffect(() => {
    if (localStorage.getItem('token')) {
        navigate("/product") 
    } else {
        navigate("/login") 
    }
}, []);

  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Login</h3>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              name='email'
              className="form-control mt-1"
              placeholder="Enter email"
              onChange={getValue}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              name='password'
              className="form-control mt-1"
              placeholder="Enter password"
              onChange={getValue}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary" onClick={save}>
              Submit
            </button>
          </div>
          <p className="forgot-password text-right mt-2">
            Forgot <Link to="/signup">Signup Page</Link>
          </p>
        </div>
      </form>
    </div>
  )
}

export default Login