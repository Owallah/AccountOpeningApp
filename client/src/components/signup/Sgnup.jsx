import React, { useState } from 'react'
import './Signup.css'
import { useNavigate } from 'react-router-dom';

function Signup() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
      });

      const handleChange = (e) => {
        setFormData((prevData) => ({
          ...prevData,
          [e.target.name]: e.target.value,
        }));
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        

        fetch('http://127.0.0.1:3000/users', {
            method: 'POST',
            headers: {
                "content-type": 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then((res) => {
            if (res.ok) {
                res.json().then((user) => {
                    alert(`${user}: Signed up successfully`)
                    navigate('/auth/login')
                });
            } else{
                alert('Error:', res.status)
            }
        }).catch((error) => {
            console.log(formData);
            alert("Error:", error);
           
          });
        console.log('Form data submitted:', formData);
        // Reset form fields after submission
        setFormData({
          name: '',
          email: '',
          password: '',
          password_confirmation: '',
        });
      };
  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="usernameInput">Username</label>
        <input
          type="text"
          id="usernameInput"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
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
        <label htmlFor="passwordConfirmationInput">Confirm Password</label>
        <input
          type="password"
          id="passwordConfirmationInput"
          name="password_confirmation"
          value={formData.password_confirmation}
          onChange={handleChange}
        />
        <button type="submit" className="submit-button">
          Sign Up
        </button>
      </form>
    </div>
  )
}

export default Signup
