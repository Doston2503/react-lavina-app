import React from 'react';
import axios from 'axios';
import md5 from 'md5';
import {toast} from 'react-toastify';
import {PATH_NAME} from "../../utils/utils";

export const sendRequest = async (method, url, data, userSecret) => {

    const concatenatedString = `${method}/${url}${JSON.stringify(data)}${userSecret}`;
    const concatenatedStringGETANDPATCH = `${method}/${url}${userSecret}`;

    const md5Hash = md5(data !== null ? concatenatedString : concatenatedStringGETANDPATCH);

    const headers = {
        'Content-Type': 'application/json',
        'Sign': md5Hash,
        'Key': userSecret
    };

    try {

        const response = data !== null ? await axios({
                method: method,
                url: `${PATH_NAME}${url}`,
                data: data,
                headers: headers
            }) :
            await axios({
                method: method,
                url: `${PATH_NAME}${url}`,
                headers: headers
            })
        ;

        return response.data;
    } catch (error) {
        console.error('Error:', error);
        toast.error('Error');
        throw error;
    }
};