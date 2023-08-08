import React, {useEffect} from 'react';
import {useHistory} from "react-router-dom";
import axios from "axios";
import {PATH_NAME} from "../utils/utils";
import Cookies from "js-cookie";
import {useDispatch} from "react-redux";

function ProtectedPath({children, props}) {

    const history = useHistory();
    const dishpatch = useDispatch()

    useEffect(() => {
        const token = localStorage.getItem('token');
        let date = new Date().getTime();
        let expires = localStorage.getItem('expires');
        expires = new Date(expires).getTime();
        if (date>expires || !expires || !token) {
            localStorage.clear();
            Cookies.get('csrftoken')
            Cookies.get('sessionid')
            history.push('/login')
        } else {
            axios.post(`${PATH_NAME}api/v1/auth/checkactivity`, {
                token
            }).then((response) => {
                localStorage.setItem('username', response.data.username);
                if (response.token_status === false) {
                    localStorage.clear();
                    Cookies.get('csrftoken')
                    Cookies.get('sessionid')
                    history.push('/login')
                }
            }).catch((e) => {
                localStorage.clear();
                Cookies.get('csrftoken')
                Cookies.get('sessionid')
                history.push('/login')
            });
        }


        axios.get(`${PATH_NAME}api/v1/iabs/operation_days/last_day`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((res) => {
            dishpatch({type: 'CHANGE_IMPORTANT_DAY', payload: res.data})
        }).catch((e) => {
            console.log(e)
        })
    });

    return children;
}

export default ProtectedPath;