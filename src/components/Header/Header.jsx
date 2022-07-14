import React from 'react';
import cl from './Header.module.scss'
import {SiTodoist} from "react-icons/si"

const Header = () => {
    return (
        <div className={cl.header}>
            <SiTodoist/>
            <span className={cl.to}>To</span>
            <span className={cl.do}>Do</span>
        </div>
    );
};

export default Header;