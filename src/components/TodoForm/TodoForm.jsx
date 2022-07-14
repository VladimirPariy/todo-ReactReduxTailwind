import React from 'react';
import {useRef} from "react";
import {addTodoCreator} from "../../store/todosReducer";
import {useDispatch} from "react-redux";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";

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
        <form onSubmit={submitHandler}>
            <Input type={'text'} ref={refInput}/>
            <Button>+</Button>
        </form>
    );
};

export default TodoForm;