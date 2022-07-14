import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {removeTodoCreator, todoDoneCreator} from "../../store/todosReducer";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";

const TodoList = () => {

    const {todos} = useSelector(state => state.todos)
    const dispatch = useDispatch()

    const onDelete = (id) => {
        dispatch(removeTodoCreator(id))
    }

    const osDisabledHandler = (e, id) => {
        if (e.target.checked) {
            dispatch(todoDoneCreator(id))
        }
    }

    const updateHandler = () => {

    }

    return (
        <>
            {todos && todos.map((todo) =>
                <div key={todo.id}
                     onClick={updateHandler}>
                    <Input type={"checkbox"}
                           onChange={(e) => osDisabledHandler(e, todo.id)}/>
                    <div>{todo.title}</div>
                    <Button onClick={() => onDelete(todo.id)}>
                        delete
                    </Button>
                </div>
            )}
        </>
    );
};

export default TodoList;