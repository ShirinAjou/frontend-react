import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import "../App.css";

function Signout({ setToken }) {
    const navigate = useNavigate();

    useEffect(()=>{
    localStorage.removeItem('token');
    setToken(null);
    navigate("/");
    },[])

  return (
    <>
      <h2>Sign out</h2>
    </>
  );
}

export default Signout;