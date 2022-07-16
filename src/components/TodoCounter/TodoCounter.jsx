import React from 'react';
import cl from "./TodoCounter.module.scss";

const TodoCounter = (props) => {

    const {activeTodosLength, doneTodosLength } = props;

    return (
        <div className={cl.task}>
            <div className={cl.activeTask}>
                Active task
                <span className={cl.counter}>
                    {activeTodosLength}
                </span>
            </div>
            <div className={cl.doneTask}>
                Done task
                <span className={cl.counter}>
                    {doneTodosLength} of {activeTodosLength + doneTodosLength}
                </span>
            </div>
        </div>
    );
};

export default TodoCounter;