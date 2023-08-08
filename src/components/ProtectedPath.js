import React, {useEffect} from 'react';
import {useHistory} from "react-router-dom";
import axios from "axios";
import {PATH_NAME} from "../utils/utils";

function ProtectedPath({children, props}) {

    const history = useHistory();

    useEffect(() => {
        const isOk = localStorage.getItem('isOk');
        if (!isOk) {
            localStorage.clear();
            history.push('/login')
        }
    });

    return children;
}

export default ProtectedPath;