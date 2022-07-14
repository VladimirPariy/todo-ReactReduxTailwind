import React, {forwardRef} from 'react';

const Input = forwardRef(({type, ...props}, ref) => {
    return (
        <input type={type}
               ref={ref}
               {...props}/>
    );
});

export default Input;