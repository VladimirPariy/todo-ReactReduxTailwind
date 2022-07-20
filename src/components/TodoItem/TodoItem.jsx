import React, {useEffect, useRef, useState} from 'react';
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import cl from './TodoItem.module.scss'
import {BsPencil, BsTrashFill} from "react-icons/bs";
import {AiOutlineCheck, AiOutlineClose} from "react-icons/ai";
import {useDispatch, useSelector} from "react-redux";
import {isValidTodoCreator} from "../../store/isValidReducer";

const TodoItem = (props) => {

    const {
        elem,
        onSwitchingHandler,
        onDelete,
        onSubmitHandler,
        checked,
        className,
    } = props

    const {isValid:isTaskValid} = useSelector(state=>state.isValid)
    const dispatch = useDispatch();
    const inputRef = useRef()
    const [taskValue, setTaskValue] = useState(elem.title)
    const [isUpdatingTask, setIsUpdatingTask] = useState(false)

    const onUpdateStartHandler = () => {
        dispatch(isValidTodoCreator(true))
        setIsUpdatingTask(true)
    };

    const onUpdateFinishHandler = (e) => {
        if (e.key === 'Enter' && taskValue.trim().length > 0) {
            onSubmitHandler(e, elem.id, taskValue, elem.isDone)
            setIsUpdatingTask(false)
            dispatch(isValidTodoCreator(true))
            return
        }
        if (e.key === 'Enter' && taskValue.trim().length === 0) {
            dispatch(isValidTodoCreator(false))
        }
    }

    const onSaveUpdateHandler = (e) => {
        e.preventDefault()
        if (taskValue.trim().length === 0) {
            inputRef.current.focus()
            dispatch(isValidTodoCreator(false))
            return;
        } else {
            onSubmitHandler(e, elem.id, taskValue, elem.isDone)
            setIsUpdatingTask(false)
            dispatch(isValidTodoCreator(true))
        }
    }

    const onClearUpdateHandler = (e) => {
        e.preventDefault()
        setTaskValue(elem.title)
        setIsUpdatingTask(false)
        dispatch(isValidTodoCreator(true))
    }

    useEffect(() => {
        if (isUpdatingTask) {
            inputRef.current.focus()
        }
    }, [isUpdatingTask])


    useEffect(() => {
        if (isUpdatingTask && taskValue.length === 0 && !isTaskValid) {
            dispatch(isValidTodoCreator(false))
        } else if (isUpdatingTask && taskValue.length > 0 && !isTaskValid) {
            dispatch(isValidTodoCreator(true))

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
                       onBlur={onSaveUpdateHandler}
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