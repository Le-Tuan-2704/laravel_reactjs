
import { isEmpty } from 'lodash';
import { useState } from 'react';

export default function useToken() {
    const getToken = () => {
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        // console.log("abc: " + userToken);
        return userToken ? true : false;
    };

    // console.log("csn: " + getToken());
    const [token, setToken] = useState(getToken());

    const saveToken = userToken => {
        // console.log("userToken: " + isEmpty(userToken));
        if (isEmpty(userToken)) {
            sessionStorage.removeItem('token');
            setToken(false);
        } else {
            sessionStorage.setItem('token', JSON.stringify(userToken));
            setToken(true);
        }

    };

    return {
        setToken: saveToken,
        token
    }
}