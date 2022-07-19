import React from 'react';
import cl from './Alert.module.scss'

const Alert = () => {
    return (
        <div className={cl.alert}
             role="alert">
            Change a few things up and try submitting again.
        </div>
    );
};

export default Alert;