import React, {useEffect, useRef, useState} from 'react';
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import cl from './TodoItem.module.scss'
import {BsPencil, BsTrashFill} from "react-icons/bs";
import {AiOutlineCheck, AiOutlineClose} from "react-icons/ai";
import {useDispatch, useSelector} from "react-redux";
import {isValidTodoCreator} from "../../store/isValidReducer";
import Alert from "../Alert/Alert";

const TodoItem = (props) => {

    const {
        elem: {id, isDone, isUpdating, title},
        checked,
        className,
        onDeleteHandler,
        onUpdateHandler,
        onSwitchingHandler,
        onChangeUpdatingStatusHandler,
        isSomeTodoUpdating
    } = props

    const {isValid: isTaskValid} = useSelector(state => state.isValid)
    const dispatch = useDispatch();
    const inputRef = useRef()
    const [taskValue, setTaskValue] = useState(title)
    const [isShowAlert, setIsShowAlert] = useState(isSomeTodoUpdating)

    const onStartUpdateHandler = () => {
        if (isSomeTodoUpdating) {
            setIsShowAlert(true)
            return false
        }
        dispatch(isValidTodoCreator(true))
        onChangeUpdatingStatusHandler(id, true, isDone)
    };

    const onFinishedUpdateHandler = (e) => {
        if (e.key === 'Enter' && taskValue.trim().length > 0) {
            onUpdateHandler(e, id, taskValue, isDone)
            onChangeUpdatingStatusHandler(id, false, isDone)
            dispatch(isValidTodoCreator(true))
        } else if (e.key === 'Enter' && taskValue.trim().length === 0) {
            dispatch(isValidTodoCreator(false))
        }
    }

    const onSaveUpdateHandler = (e) => {
        e.preventDefault()
        if (taskValue.trim().length === 0) {
            inputRef.current.focus()
            dispatch(isValidTodoCreator(false))
            onChangeUpdatingStatusHandler(id, true, isDone)
            return false;
        } else {
            onUpdateHandler(e, id, taskValue, isDone)
            onChangeUpdatingStatusHandler(id, false, isDone)
            dispatch(isValidTodoCreator(true))
        }
    }

    const onClearUpdateHandler = (e) => {
        e.preventDefault()
        setTaskValue(title)
        dispatch(isValidTodoCreator(true))
        onChangeUpdatingStatusHandler(id, false, isDone)
    }


    useEffect(() => {
        if (isUpdating) inputRef.current.focus()
    }, [isUpdating])


    useEffect(() => {
        const timeout = setTimeout(() => {
            if (isShowAlert) setIsShowAlert(false)
        }, 2000)
        return () => clearTimeout(timeout)
    }, [isShowAlert])

    useEffect(() => {
        if (isUpdating && taskValue.length === 0 && !isTaskValid) {
            dispatch(isValidTodoCreator(false))
        } else if (isUpdating && taskValue.length > 0 && !isTaskValid) {
            dispatch(isValidTodoCreator(true))
        }
    }, [isUpdating, taskValue, isTaskValid, dispatch])


    return (
        <>{isShowAlert && <Alert>Please finish editing the task before trying to edit another task.</Alert>}
            <div key={id}
                 className={className ? `${cl.taskItem} ${cl[className]}` : cl.taskItem}>
                <Input type={'checkbox'}
                       className={'checkbox'}
                       onChange={(e) => onSwitchingHandler(e, id, isDone)}
                       checked={checked}/>

                <div className={isUpdating ? cl.none : cl.title}>
                    {title}
                </div>

                <form onKeyDown={onFinishedUpdateHandler}
                      className={!isUpdating ? cl.none : cl.form}>

                    <Input type="text"
                           className={!isUpdating ? 'none' : 'textUpdate'}
                           value={taskValue}
                           onChange={(e) => setTaskValue(e.target.value)}
                           ref={inputRef}
                           onBlur={() => inputRef.current.focus()}/>

                    <Button onClick={onSaveUpdateHandler}
                            className={'save'}>
                        <AiOutlineCheck/>
                    </Button>

                    <Button onClick={onClearUpdateHandler}
                            className={'clear'}>
                        <AiOutlineClose/>
                    </Button>

                </form>

                <Button onClick={onStartUpdateHandler}
                        className={'btnForUpdateTask'}>
                    <BsPencil/>
                </Button>

                <Button onClick={() => onDeleteHandler(id, isDone)}
                        className={'btnForDeleteTask'}>
                    <BsTrashFill/>
                </Button>

            </div>
        </>
    );
};

export default TodoItem;