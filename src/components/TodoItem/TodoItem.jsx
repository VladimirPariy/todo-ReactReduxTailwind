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
        elem,
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
    const [taskValue, setTaskValue] = useState(elem.title)
    const [isShowAlert, setIsShowAlert] = useState(isSomeTodoUpdating)

    const onStartUpdateHandler = () => {
        if (isSomeTodoUpdating) {
            setIsShowAlert(true)
            return false
        }
        dispatch(isValidTodoCreator(true))
        onChangeUpdatingStatusHandler(elem.id, true, elem.isDone)
    };

    const onFinishedUpdateHandler = (e) => {
        if (e.key === 'Enter' && taskValue.trim().length > 0) {
            onUpdateHandler(e, elem.id, taskValue, elem.isDone)
            onChangeUpdatingStatusHandler(elem.id, false, elem.isDone)
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
            onChangeUpdatingStatusHandler(elem.id, true, elem.isDone)
            return;
        } else {
            onUpdateHandler(e, elem.id, taskValue, elem.isDone)
            onChangeUpdatingStatusHandler(elem.id, false, elem.isDone)
            dispatch(isValidTodoCreator(true))
        }
    }

    const onClearUpdateHandler = (e) => {
        e.preventDefault()
        setTaskValue(elem.title)
        dispatch(isValidTodoCreator(true))
        onChangeUpdatingStatusHandler(elem.id, false, elem.isDone)
    }


    useEffect(() => {
        if (elem.isUpdating) inputRef.current.focus()
    }, [elem.isUpdating])


    useEffect(() => {
        const timeout = setTimeout(() => {
            if (isShowAlert) setIsShowAlert(false)
        }, 2000)
        return () => clearTimeout(timeout)
    }, [isShowAlert])

    useEffect(() => {
        if (elem.isUpdating && taskValue.length === 0 && !isTaskValid) {
            dispatch(isValidTodoCreator(false))
        } else if (elem.isUpdating && taskValue.length > 0 && !isTaskValid) {
            dispatch(isValidTodoCreator(true))
        }
    }, [elem.isUpdating, taskValue, isTaskValid])


    return (
        <>{isShowAlert && <Alert>Please finish editing the task before trying to edit another task.</Alert>}
            <div key={elem.id}
                 className={className ? `${cl.taskItem} ${cl[className]}` : cl.taskItem}>
                <Input type={'checkbox'}
                       className={'checkbox'}
                       onChange={(e) => onSwitchingHandler(e, elem.id, elem.isDone)}
                       checked={checked}/>

                <div className={elem.isUpdating ? cl.none : cl.title}>
                    {elem.title}
                </div>

                <form onKeyDown={onFinishedUpdateHandler}
                      className={!elem.isUpdating ? cl.none : cl.form}>

                    <Input type="text"
                           className={!elem.isUpdating ? 'none' : 'textUpdate'}
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

                <Button onClick={() => onDeleteHandler(elem.id, elem.isDone)}
                        className={'btnForDeleteTask'}>
                    <BsTrashFill/>
                </Button>

            </div>
        </>
    );
};

export default TodoItem;