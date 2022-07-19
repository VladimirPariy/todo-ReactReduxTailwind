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
        isTaskValid,
        setIsTaskValid,
    } = props


    const inputRef = useRef()
    const [taskValue, setTaskValue] = useState(elem.title)
    const [isUpdatingTask, setIsUpdatingTask] = useState(false)

    const onUpdateStartHandler = () => {
        setIsUpdatingTask(true)
    };

    const onUpdateFinishHandler = (e) => {
        if (e.key === 'Enter' && taskValue.trim().length > 0) {
            onSubmitHandler(e, elem.id, taskValue, elem.isDone)
            setIsUpdatingTask(false)
            setIsTaskValid(true)
            return
        }
        if (e.key === 'Enter' && taskValue.trim().length === 0) {
            setIsTaskValid(false)
        }
    }

    const onSaveUpdateHandler = (e) => {
        e.preventDefault()
        if (taskValue.trim().length === 0) {
            inputRef.current.focus()
            setIsTaskValid(false)
            return;
        } else {
            onSubmitHandler(e, elem.id, taskValue, elem.isDone)
            setIsUpdatingTask(false)
            setIsTaskValid(true)
        }
    }

    const onClearUpdateHandler = (e) => {
        e.preventDefault()
        setTaskValue(elem.title)
        setIsUpdatingTask(false)
        setIsTaskValid(true)
    }

    useEffect(() => {
        if (isUpdatingTask) {
            inputRef.current.focus()
        }
    }, [isUpdatingTask])


    useEffect(() => {
        if (isUpdatingTask && taskValue.length === 0 && !isTaskValid) {
            setIsTaskValid(false)
        } else if (isUpdatingTask && taskValue.length > 0 && !isTaskValid) {
            setIsTaskValid(true)
        }
    }, [isUpdatingTask, taskValue, isTaskValid])

    return (
        <div key={elem.id}
             className={className ? `${cl.taskItem} ${cl[className]}` : cl.taskItem}>

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
                       onBlur={() => inputRef.current.focus()}
                       value={taskValue}
                       onChange={(e) => setTaskValue(e.target.value)}/>
                <Button onClick={onSaveUpdateHandler} className={'save'}>
                    <AiOutlineCheck/>
                </Button>
                <Button onClick={onClearUpdateHandler} className={'clear'}>
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