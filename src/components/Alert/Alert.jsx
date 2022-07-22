import React from 'react';
import cl from './Alert.module.scss'

const Alert = ({children}) => {
    return (
        <div className={cl.alert}
             role="alert">
            {children}
        </div>
    );
};

export default Alert;