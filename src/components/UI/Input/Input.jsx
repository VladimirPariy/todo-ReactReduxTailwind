import React, {forwardRef} from 'react';
import cl from "./Input.module.scss";

const Input = forwardRef(({className, ...props}, ref) => {
    return (
        <input
            ref={ref}
            className={cl[className]}
            {...props}/>
    );
});

export default Input;