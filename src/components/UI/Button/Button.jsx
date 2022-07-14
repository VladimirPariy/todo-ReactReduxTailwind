import React from 'react';
import cl from './Button.module.scss'

const Button = ({children, className, ...props}) => {
    return (
        <button className={cl[className]} {...props}>
            {children}
        </button>
    );
};

export default Button;