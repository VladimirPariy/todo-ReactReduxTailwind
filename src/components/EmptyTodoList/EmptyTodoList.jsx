import React from 'react';
import {BiTaskX} from "react-icons/bi";
import cl from './EmptyTodoList.module.scss'

const EmptyTodoList = () => {
    return (
        <div className={cl.emptyList}>
            <BiTaskX/>
            <div className={cl.title}>You don't have any tasks registered yet.</div>
            <div>Create tasks and organize your to-do items</div>
        </div>
    );
};

export default EmptyTodoList;