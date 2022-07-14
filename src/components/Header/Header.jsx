import React from 'react';
import cl from './Header.module.scss'
import {SiTodoist} from "react-icons/si"

const Header = () => {
    return (
        <div className={cl.header}>
            <SiTodoist/>
            <span className={cl.to}>to</span>
            <span className={cl.do}>DO</span>
        </div>
    );
};

export default Header;