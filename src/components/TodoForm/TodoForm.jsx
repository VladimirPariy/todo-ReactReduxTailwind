import React from 'react';
import {useRef} from "react";
import {addTodoCreator} from "../../store/todosReducer";
import {useDispatch} from "react-redux";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import {AiOutlinePlusCircle} from "react-icons/ai"
import cl from './TodoForm.module.scss'

const TodoForm = () => {
    const dispatch = useDispatch()
    const refInput = useRef()

    const submitHandler = (e) => {
        e.preventDefault()
        if (refInput.current.value.length > 0) {
            const todo = {
                title: refInput.current.value,
                id: Math.random(),
                done: false
            }
            dispatch(addTodoCreator(todo))
            refInput.current.value = ''
            refInput.current.focus()
        }
        refInput.current.focus()
    }

    return (
        <form onSubmit={submitHandler}
              className={cl.form}>
            <Input type={'text'}
                   ref={refInput}
                   className='btnForForm'/>
            <Button className='btnForForm'>
                Create
                <AiOutlinePlusCircle/>
            </Button>
        </form>
    );
};

export default TodoForm;