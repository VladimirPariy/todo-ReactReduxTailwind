import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    removeActiveTodoCreator,
    removeDoneTodoCreator,
    switchingActiveTodoCreator,
    switchingDoneTodoCreator,
    updateActiveTodoCreator, updateDoneTodoCreator
} from "../../store/todosReducer";
import TodoItem from "../TodoItem/TodoItem";
import EmptyTodoList from "../EmptyTodoList/EmptyTodoList";
import TodoActiveCounter from "../TodoCounter/TodoActiveCounter";
import cl from './TodoList.module.scss'
import {AiOutlineArrowDown, AiOutlineArrowUp} from "react-icons/ai";
import TodoCompletedCounter from "../TodoCounter/TodoCompletedCounter";
import Alert from "../Alert/Alert";
import {isValidTodoCreator} from "../../store/isValidReducer";

const TodoList = () => {

    const {activeTodos, doneTodos} = useSelector(state => state.todos);
    const {isValid:isTaskValid} = useSelector(state=>state.isValid)
    const dispatch = useDispatch();

    const [isVisibleDoneTask, setIsVisibleDoneTask] = useState(true)


    const visibleDoneTaskHandler = () => {
        setIsVisibleDoneTask(prev => !prev)
    }


    const onDeleteHandler = (id, isDone) => {
        dispatch(isValidTodoCreator(true))
        if (isDone) {
            dispatch(removeDoneTodoCreator(id))
            return
        }
        dispatch(removeActiveTodoCreator(id))
    };

    const onSwitchingHandler = (e, id, isDone) => {
        dispatch(isValidTodoCreator(true))
        if (isDone) {
            dispatch(switchingDoneTodoCreator(id))
            return
        }
        dispatch(switchingActiveTodoCreator(id))
    };

    const onUpdateHandler = (e, id, title, isDone) => {
        e.stopPropagation()
        if (isDone) {
            dispatch(updateDoneTodoCreator(id, title))
            return
        }
        dispatch(updateActiveTodoCreator(id, title))
    }


    const lengthOfFilteredActiveTodos = activeTodos.filter(todo => !todo.isDone).length;
    const lengthOfFilteredDoneTodos = doneTodos.filter(todo => todo.isDone).length;

    const checkingLengthTodos = activeTodos.length === 0 && doneTodos.length === 0

    const activeTask = activeTodos.filter(todo => !todo.isDone)
        .map((todo) =>
            <TodoItem key={todo.id}
                      elem={todo}
                      checked={todo.isDone}
                      onSubmitHandler={onUpdateHandler}
                      onDelete={onDeleteHandler}
                      onSwitchingHandler={onSwitchingHandler}

            />
        );

    const doneTask = doneTodos.length > 0 &&
        <>
            <div className={cl.done}
                 onClick={visibleDoneTaskHandler}>
                <TodoCompletedCounter activeTodosLength={lengthOfFilteredActiveTodos}
                                      doneTodosLength={lengthOfFilteredDoneTodos}/>
                {isVisibleDoneTask ? <AiOutlineArrowDown/> : <AiOutlineArrowUp/>}
            </div>
            {isVisibleDoneTask &&
                doneTodos.filter(todo => todo.isDone)
                    .map((todo) =>
                        <TodoItem key={todo.id}
                                  elem={todo}
                                  checked={todo.isDone}
                                  className={"done"}
                                  onSubmitHandler={onUpdateHandler}
                                  onDelete={onDeleteHandler}
                                  onSwitchingHandler={onSwitchingHandler}/>
                    )
            }
        </>


    return (
        <>
            {!isTaskValid && <Alert/>}
            <TodoActiveCounter activeTodosLength={lengthOfFilteredActiveTodos}/>
            {checkingLengthTodos ? <EmptyTodoList/> : <>{activeTask}{doneTask}</>}
        </>
    )
}

export default TodoList;