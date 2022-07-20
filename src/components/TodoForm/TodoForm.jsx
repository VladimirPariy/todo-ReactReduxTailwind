import React, {useEffect, useState} from 'react';
import {useRef} from "react";
import {addTodoCreator} from "../../store/todosReducer";
import {useDispatch, useSelector} from "react-redux";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import {AiOutlinePlusCircle} from "react-icons/ai"
import cl from './TodoForm.module.scss'
import Alert from "../Alert/Alert";
import {isValidTodoCreator} from "../../store/isValidReducer";

const TodoForm = () => {
    const dispatch = useDispatch()
    const refInput = useRef()
    const [taskValue, setTaskValue] = useState('')
    const {isValid:isTaskValid} = useSelector(state=>state.isValid)

    const submitHandler = (e) => {
        e.preventDefault()
        if (taskValue.trim().length > 0) {
            const todo = {
                title: taskValue,
                id: Math.random(),
                isDone: false
            }
            dispatch(addTodoCreator(todo))
            setTaskValue('')
            refInput.current.focus()
            return
        }
        dispatch(isValidTodoCreator(false))
        setTaskValue('')
        refInput.current.focus()
    }

    useEffect(() => {
        if (!isTaskValid && taskValue.length > 0)
            dispatch(isValidTodoCreator(true))
    }, [isTaskValid, taskValue])

    return (
        <>
            {!isTaskValid && <Alert/>}
            <form onSubmit={submitHandler}
                  className={cl.form}>
                <Input type='text'
                       ref={refInput}
                       className='inputFromForm'
                       placeholder='Add a new Task'
                       value={taskValue}
                       onChange={(e) => setTaskValue(e.target.value)}
                       onBlur={()=> dispatch(isValidTodoCreator(true))}
                />
                <Button className='btnFromForm'>
                    Create
                    <AiOutlinePlusCircle/>
                </Button>
            </form>
        </>
    );
};

export default TodoForm;