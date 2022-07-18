import React, {useEffect, useRef, useState} from 'react';
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import cl from './TodoItem.module.scss'
import {BsPencil, BsTrashFill} from "react-icons/bs";
import {AiOutlineCheck, AiOutlineClose} from "react-icons/ai";

const TodoItem = (props) => {

    const {
        elem,
        onSwitchingHandler,
        onDelete,
        onSubmitHandler,
        checked,
        className,
    } = props


    const inputRef = useRef()
    const [isUpdatingTask, setIsUpdatingTask] = useState(false)

    useEffect(() => {
        if (isUpdatingTask) {
            inputRef.current.focus()
        }
    }, [isUpdatingTask])

    const onUpdateStartHandler = () => {
        setIsUpdatingTask(true)
        inputRef.current.value = elem.title
    };

    const onUpdateFinishHandler = (e) => {
        if (e.key === 'Enter' && inputRef.current.value.length > 0) {
            onSubmitHandler(e, elem.id, inputRef.current.value, elem.isDone)
            setIsUpdatingTask(false)
        }
    }


    const onSaveUpdateHandler = (e) => {
        e.preventDefault()
        if (inputRef.current.value.length === 0) {
            inputRef.current.focus()
            return
        }
        onSubmitHandler(e, elem.id, inputRef.current.value, elem.isDone)
        setIsUpdatingTask(false)
    }

    const onClearUpdateHandler = (e) => {
        e.preventDefault()
        inputRef.current.value = elem.title
        setIsUpdatingTask(false)
    }

    return (
        <div key={elem.id}
             className={className ?
                 `${cl.taskItem} ${cl[className]}` :
                 cl.taskItem}>

            <Input type={'checkbox'}
                   className={'checkbox'}
                   onChange={(e) => onSwitchingHandler(e, elem.id, elem.isDone)}
                   checked={checked}/>

            <div className={isUpdatingTask ? cl.none : cl.title}>
                {elem.title}
            </div>

            <form onKeyDown={onUpdateFinishHandler}
                  className={!isUpdatingTask ? cl.none : cl.form}>

                <Input type="text"
                       className={!isUpdatingTask ? 'none' : 'textUpdate'}
                       ref={inputRef}
                       onBlur={onSaveUpdateHandler}
                />

                <Button onClick={onSaveUpdateHandler}>
                    <AiOutlineCheck/>
                </Button>

                <Button onClick={onClearUpdateHandler}>
                    <AiOutlineClose/>
                </Button>

            </form>

            <Button onClick={onUpdateStartHandler}
                    className={'btnForUpdateTask'}>
                <BsPencil/>
            </Button>

            <Button onClick={() => onDelete(elem.id, elem.isDone)}
                    className={'btnForDeleteTask'}>
                <BsTrashFill/>
            </Button>

        </div>
    );
};

export default TodoItem;