import React, {useEffect} from 'react';
import {useHistory} from "react-router-dom";


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