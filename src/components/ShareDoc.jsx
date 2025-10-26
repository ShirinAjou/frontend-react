import FETCH_URL from '../utils.js';
import React, { useState } from 'react';
import { useParams } from "react-router";
import { useNavigate } from 'react-router-dom';
import '../App.css'

function ShareDoc() {
    const { id } = useParams();
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const onChange = (event) => { setEmail(event.target.value) };

    const onSubmit  = (event) => { event.preventDefault()
        const token = localStorage.getItem("token"); 
        const headers = { "Content-Type": "application/json" };
        if (token) {
            headers["x-access-token"] = token;
        }
        fetch(`http://localhost:8080/share/${id}`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify({ email }),
        })
        .then((res) => res.json())
        .then((data) => data);
        navigate("/");
    };
  
  return (
    <div>
      <h1>Share document</h1>
        <form className="form-container" onSubmit={onSubmit}>

            <label htmlFor="email">Enter email:</label>
            <input type="email" id="email" name="email" onChange={onChange} required />

            <input className="btn-container" type="submit" value="Share document"/>
      </form>
    </div>
  );
}

export default ShareDoc