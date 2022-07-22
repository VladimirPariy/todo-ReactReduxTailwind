import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    isUpdatingActiveTaskCreator,
    isUpdatingDoneTaskCreator,
    removeActiveTodoCreator,
    removeDoneTodoCreator,
    switchingActiveTodoCreator,
    switchingDoneTodoCreator,
    updateActiveTodoCreator,
    updateDoneTodoCreator
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
    const {isValid: isTaskValid} = useSelector(state => state.isValid)
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

    const onChangeUpdatingStatusHandler = (id, isUpdating, isDone) => {
        if (isDone) {
            dispatch(isUpdatingDoneTaskCreator(id, isUpdating))
            return
        }
        dispatch(isUpdatingActiveTaskCreator(id, isUpdating))
    }


    const lengthOfFilteredActiveTodos = activeTodos.filter(todo => !todo.isDone).length;
    const lengthOfFilteredDoneTodos = doneTodos.filter(todo => todo.isDone).length;

    const checkingLengthTodos = activeTodos.length === 0 && doneTodos.length === 0


    let isSomeTodoUpdating = !!activeTodos.find(todo => todo.isUpdating) || !!doneTodos.find(todo => todo.isUpdating)

    const activeTask = activeTodos.filter(todo => !todo.isDone)
        .map((todo) =>
            <TodoItem key={todo.id}
                      elem={todo}
                      checked={todo.isDone}
                      onUpdateHandler={onUpdateHandler}
                      onDeleteHandler={onDeleteHandler}
                      onSwitchingHandler={onSwitchingHandler}
                      onChangeUpdatingStatusHandler={onChangeUpdatingStatusHandler}
                      isSomeTodoUpdating={isSomeTodoUpdating}
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
                                  onUpdateHandler={onUpdateHandler}
                                  onDeleteHandler={onDeleteHandler}
                                  onSwitchingHandler={onSwitchingHandler}
                                  onChangeUpdatingStatusHandler={onChangeUpdatingStatusHandler}
                                  isSomeTodoUpdating={isSomeTodoUpdating}
                        />
                    )
            }
        </>


    return (
        <>
            {!isTaskValid && <Alert>Task cannot be empty.</Alert>}
            <TodoActiveCounter activeTodosLength={lengthOfFilteredActiveTodos}/>
            {checkingLengthTodos ? <EmptyTodoList/> : <>{activeTask}{doneTask}</>}
        </>
    )
}

export default TodoList;