import React from "react";
import { useForm } from "react-hook-form";
import FETCH_URL from '../utils.js';
import "../App.css";

function Register() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        fetch("http://localhost:8080/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: data.name,
            email: data.email,
            password: data.password,
        }),
    })
      .then((res) => res.json())
      .then((resData) => {
        if (resData.token) {
          localStorage.setItem("token", resData.token);
          console.log(data.name + " has been successfully registered");
        } else {
          console.log(resData);
        }
      })
    };

    return (
        <>
            <h2>Registration Form</h2>
            <form className="App" onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="text"
                    {...register("name", { required: true })}
                    placeholder="Name"
                />
                {errors.name && <span style={{ color: "red" }}>*Name* is mandatory</span>}

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

export default Register;