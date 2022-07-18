import React from 'react';
import cl from "./TodoCounter.module.scss";

const TodoActiveCounter = (props) => {

    const {activeTodosLength} = props;

    return (
        <div className={cl.task}>
            <div className={cl.activeTask}>
                Active task{activeTodosLength > 1 ? 's' : ''}
                <span className={cl.counter}>
                    {activeTodosLength}
                </span>
            </div>
        </div>
    );
};

export default TodoActiveCounter;