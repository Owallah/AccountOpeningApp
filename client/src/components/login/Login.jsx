import React, { useState } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        password: '',
      });
    
      const handleChange = (e) => {
        setFormData((prevData) => ({
          ...prevData,
          [e.target.name]: e.target.value,
        }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://127.0.0.1:3000/auth/login', {
            method: 'POST',
            headers: {
                "content-type": 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then((res) => {
            if (res.ok) {
                res.json().then((user) => {
                    alert(`Signed up successfully`)
                    console.log(user);
                    const token = user.token; 
                    localStorage.setItem('token', token);
                    navigate('/')
                });
            } else{
                alert('Error:', res.status)
            }
        }).catch((error) => {
            console.log(formData);
            alert("Error:", error);
           
          });
        setFormData({
          email: '',
          password: '',
        });
      };
    
      return (
        <div className="login-container">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="emailInput">Email</label>
            <input
              type="email"
              name="email"
              id="emailInput"
              value={formData.email}
              onChange={handleChange}
            />
            <label htmlFor="passwordInput">Password</label>
            <input
              type="password"
              id="passwordInput"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <button type="submit" className="submit-button">
              Log In
            </button>
          </form>
        </div>
  )
}

export default Login
