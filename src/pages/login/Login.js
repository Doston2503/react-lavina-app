import React from "react";
import {toast} from "react-toastify";
import axios from "axios";
import {PATH_NAME} from "../../utils/utils";
import TextField from "@mui/material/TextField";

function Login(props) {

    const signUp = (e) => {
        e.preventDefault();

        let userInfo = {
            name: e.target.name.value,
            key: e.target.key.value,
            secret: e.target.secret.value,
            email: e.target.email.value
        };

        axios.post(
            `${PATH_NAME}signup`, userInfo, {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        ).then((response) => {
            if (response.data?.isOk) {
                localStorage.setItem("isOk", response.data?.isOk);
                localStorage.setItem("key", response.data?.data?.key);
                props.history.push('/book');
                toast.success("Registered !!!");
            }
        })
            .catch((e) => {
                console.log(e);
                toast.error("Error");
            });
    };


    return (
        <div className="login-page">

            <div className="box">
                <div className="login-img">
                    <img src="/images/login.svg" alt="Login img"/>
                </div>

                <div className="login-form">
                    <div className="brand">
                        <img src="/images/logo.png" alt="brand" className="img-fluid"/>
                    </div>


                    <form onSubmit={signUp}>

                        <TextField className="w-100 mb-4" label="Enter name" variant="outlined" name="name"
                                   type='text'/>
                        <TextField className="w-100 mb-4" label="Enter email" variant="outlined" name="email"
                                   type='email'/>
                        <TextField className="w-100 mb-4" label="Enter key" variant="outlined" name="key"
                                   type='password'/>
                        <TextField className="w-100 mb-4" label="Enter secret" variant="outlined" name="secret"
                                   type='password'/>


                        <button type={"submit"} className="btn btn-primary w-100 py-3 fw-bold">
                            Register
                        </button>
                    </form>
                </div>

            </div>

        </div>
    );
}


export default Login;
