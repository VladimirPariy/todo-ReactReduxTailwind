import React from 'react';
import cl from './Alert.module.scss'

const Alert = () => {
    return (
        <div className={cl.alert}
             role="alert">
            Task cannot be empty.
        </div>
    );
};

export default Alert;