import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";
import axios from "axios";
import {PATH_NAME} from "../../utils/utils";
import {connect} from "react-redux";
import Cookies from "js-cookie";

function Login(props) {
    const [showPassword, setShowPassword] = useState(false);
    const [disabledBtn, setDisabledBtn] = useState(false);
    let date = new Date();
    let currDay = date.toISOString().slice(0, 10);

    useEffect(() => {
        document.cookie.split(";").forEach((c) => {
            document.cookie = c
                .replace(/^ +/, "")
                .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
        });
    }, []);

    function signUp(e) {
        localStorage.setItem('day',currDay)
        e.preventDefault();
        setDisabledBtn(true)
        let username = e.target.username.value;
        let password = e.target.password.value;
        let userInfo = {
            username,
            password,
        };
        props.loginFunction(userInfo);

        axios.post(
            `${PATH_NAME}api/v1/auth/login`,
            {
                username,
                password,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": Cookies.get("csrftoken"),
                },
                withCredentials: true,
            }
        )
            .then((response) => {
                setDisabledBtn(false)
                localStorage.setItem("language", "ru");
                if (response.data.token) {
                    localStorage.setItem("token", response.data.token);
                    localStorage.setItem("expires", response.data.expires);
                    localStorage.setItem("user_id", response.data?.user?.id);

                    if (response.data.token_status === true) {
                        axios
                            .get(
                                `${PATH_NAME}api/v1/accounts/users/${response.data?.user?.id}`,
                                {
                                    headers: {
                                        Authorization: `Bearer ${response.data.token}`,
                                    },
                                }
                            )
                            .then((res) => {
                                localStorage.setItem("permissions", JSON.stringify(res.data));
                                props.history.push("/");
                            })
                            .catch((e) => {
                                toast.error(e.message);
                            });
                    }
                }

                if (response.data.token_status === false) {
                    props.history.push("/verification");
                } else {
                    toast.success("Muvaffaqqiyatli ro'yhatdan o'tdingiz");
                    props.history.push("/");
                }
            })
            .catch((e) => {
                console.log(e)
                setDisabledBtn(false)
                toast.error("Login yoki parol xato");
            });
    }

    function resetPassword(e) {
        e.preventDefault();
        let phone_or_username = e.target.phone_or_username?.value;
        console.log(phone_or_username)

        axios
            .post(`${PATH_NAME}api/v1/auth/checkuser`, {
                phone_or_username,
            })
            .then((response) => {
                localStorage.setItem("token", response.data.token);
                props.history.push("/reset-password");
            })
            .catch((e) => {
                toast.error("Login yoki parol xato");
            });
    }

    return (
        <div className="login-page">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xl-6">
                        <div className="row">
                            <div className="col-xl-8 offset-2">
                                <a href="#" className="brand">
                                    <img src="assets/navbar/brand.png" alt=""/>
                                </a>
                                <div className="box">
                                    <b>Войдите в свою учетную запись, чтобы продолжить</b>
                                    <div className="card">
                                        <form onSubmit={signUp}>
                                            <input
                                                placeholder={"Имя пользователя"}
                                                required={true}
                                                className="form-control mt-2 mb-3"
                                                name={"username"}
                                                id={"username"}
                                                type="text"
                                            />

                                            <div className="password">
                                                <input
                                                    placeholder={"Пароль"}
                                                    required={true}
                                                    className="form-control mt-2 mb-3"
                                                    name={"password"}
                                                    id={"password"}
                                                    type={!showPassword ? "password" : "text"}
                                                />
                                                <img
                                                    onClick={() => setShowPassword((prev) => !prev)}
                                                    src="assets/password.png"
                                                    alt=""
                                                />
                                            </div>

                                            <div className="d-flex justify-content-between mt-4">
                                                <div className="form-check ps-0">
                                                    <input
                                                        style={{transform: "scale(1.5)"}}
                                                        className=" ms-1 form-check-input"
                                                        name={"check"}
                                                        id={"check"}
                                                        type="checkbox"
                                                    />
                                                    <label htmlFor="check" className="ms-3">
                                                        Запомнить
                                                    </label>
                                                </div>

                                                <button
                                                    type={"button"}
                                                    className="reset-password"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#myModal"
                                                >
                                                    Восстановление пароля
                                                </button>
                                            </div>

                                            <button type={"submit"} className="send-btn">
                                                {disabledBtn ? <span className="spinner-border spinner-border-sm"/>:''}
                                                Войти
                                            </button>
                                        </form>

                                        <div className="d-flex mt-4 footer-card">
                                            <span>У вас нет аккаунта? </span>
                                            <Link to={"/register"}>
                                                {" "}
                                                Зарегистрироваться в системе
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6">
                        <div className="row">
                            <div className="col-xl-8 offset-2">
                                <h1 className="title">Risk Assessment System</h1>
                                <img src="assets/Illustration.png" alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id={"myModal"}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <form onSubmit={resetPassword}>
                            <div className="modal-header bg-dark">
                                <b className="text-white">Сменить пароль</b>
                                <button
                                    type="button"
                                    className="btn-close btn-close-white"
                                    data-bs-dismiss="modal"
                                />
                            </div>
                            <div className="modal-body">
                                <label htmlFor="phone_or_username">Введите имя пользователя или номер телефона</label>
                                <input
                                    style={{fontSize: '14px'}}
                                    placeholder={"формат номера: 998901234567"}
                                    name={"phone_or_username"}
                                    id={"phone_or_username"}
                                    className="form-control"
                                    type="text"
                                />
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-light btn-sm"
                                    data-bs-dismiss="modal"
                                >
                                    Закрыть
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary btn-sm"
                                    data-bs-dismiss="modal"
                                >
                                    Сменить
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

function mapDispatchToProps(dispatch) {
    return {
        loginFunction: (info) => {
            dispatch({
                type: "SAVE_USER_INFO",
                payload: info,
            });
        },
    };
}

const a = connect(null, mapDispatchToProps);
export default a(Login);
