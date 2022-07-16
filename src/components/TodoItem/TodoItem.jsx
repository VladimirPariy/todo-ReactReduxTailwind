import React from 'react';
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import cl from './TodoItem.module.scss'
import {BsTrashFill} from "react-icons/bs";

const TodoItem = (props) => {
    const {elem, type, updateHandler, onSwitchingHandler, onDelete, checked, className} = props

    return (
        <div key={elem.id}
             onClick={updateHandler}
             className={cl.taskItem}>

            <Input type={type}
                   onChange={(e) => onSwitchingHandler(e, elem.id, elem.isDone)}
                    checked={checked}
            />
            <div className={cl.title}>{elem.title}</div>
            <Button onClick={() => onDelete(elem.id, elem.isDone)}
                    className={'btnForDeleteTask'}
            >
                <BsTrashFill/>
            </Button>

        </div>
    );
};

export default TodoItem;