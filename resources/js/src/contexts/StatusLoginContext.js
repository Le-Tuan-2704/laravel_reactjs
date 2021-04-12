import React, { createContext, useState } from 'react';

export const StatusLoginContext = createContext();

function StatusLoginProvider({ children }) {

    const [statusLogin, setStatusLogin] = useState();

    const changeStatusLogin = (token) => {
        setStatusLogin(token);
    }

    const statusLoginData = {
        statusLogin,
        changeStatusLogin,
    }

    return (
        <StatusLoginContext.Provider value={statusLoginData}>
            {children}
        </StatusLoginContext.Provider>
    );
}

export default StatusLoginProvider;