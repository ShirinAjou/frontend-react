import React, { useState } from "react";
import { useForm } from "react-hook-form";
import FETCH_URL from '../utils.js';
import "../App.css";

function Login() {
  const [token, setToken] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    fetch(`http://localhost:8080/login`, {
      method: "POST",
      body: JSON.stringify({ email: data.email, password: data.password }),
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => res.json())
    .then((data) => {
      if (data.token) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        console.log("You Are Successfully Logged In");
      } else {
        console.log("Email or Password is not matching with our record");
      }
    })
  };

  return (
    <>
      <h2>Login Form</h2>
      <form className="App" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          {...register("email", { required: true })}
          placeholder="Email"
        />
        {errors.email && <span style={{ color: "red" }}>*Email* is mandatory</span>}

        <input
          type="password"
          {...register("password", { required: true })}
          placeholder="Password"
        />
        {errors.password && <span style={{ color: "red" }}>*Password* is mandatory</span>}

        <input type="submit" style={{ backgroundColor: "#a1eafb" }} />
      </form>
    </>
  );
}

export default Login;
