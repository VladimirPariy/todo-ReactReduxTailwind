import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    removeActiveTodoCreator,
    removeDoneTodoCreator,
    switchingActiveTodoCreator,
    switchingDoneTodoCreator
} from "../../store/todosReducer";
import TodoItem from "../TodoItem/TodoItem";
import EmptyTodoList from "../EmptyTodoList/EmptyTodoList";
import TodoCounter from "../TodoCounter/TodoCounter";

const TodoList = () => {

    const {activeTodos, doneTodos} = useSelector(state => state.todos);
    const dispatch = useDispatch();

    const onDelete = (id, isDone) => {
        if(isDone){
            dispatch(removeDoneTodoCreator(id))
            return
        }
        dispatch(removeActiveTodoCreator(id))
    };

    const onSwitchingHandler = (e, id, isDone) => {
        if(isDone){
            dispatch(switchingDoneTodoCreator(id))
            return
        }
        dispatch(switchingActiveTodoCreator(id))
    };


    const updateHandler = () => {

    };

    const lengthOfFilteredActiveTodos = activeTodos.filter(todo => !todo.isDone).length;
    const lengthOfFilteredDoneTodos = doneTodos.filter(todo => todo.isDone).length;

    const checkingLengthTodos = activeTodos.length === 0 && doneTodos.length === 0

    const doneTask = doneTodos.filter(todo => todo.isDone)
        .map((todo) =>
            <TodoItem key={todo.id}
                      elem={todo}
                      checked={todo.isDone}
                      type={"checkbox"}
                      updateHandler={updateHandler}
                      onDelete={onDelete}
                      onSwitchingHandler={onSwitchingHandler}/>
        );

    const activeTask = activeTodos.filter(todo => !todo.isDone)
        .map((todo) =>
            <TodoItem key={todo.id}
                      elem={todo}
                      checked={todo.isDone}
                      type={"checkbox"}
                      updateHandler={updateHandler}
                      onDelete={onDelete}
                      onSwitchingHandler={onSwitchingHandler}/>
        );


    return (
        <>
            <TodoCounter activeTodosLength={lengthOfFilteredActiveTodos}
                         doneTodosLength={lengthOfFilteredDoneTodos}/>
            {checkingLengthTodos ? <EmptyTodoList/> : <>{activeTask}{doneTask}</>}
        </>
    )
}

export default TodoList;