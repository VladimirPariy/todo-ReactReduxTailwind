import React from 'react';
import cl from "./TodoCounter.module.scss";

const TodoCompletedCounter = (props) => {
    const {activeTodosLength, doneTodosLength} = props;
    return (
        <div className={cl.task}>
            <div className={cl.doneTask}>
                Completed task{doneTodosLength > 1 ? 's' : ''}
                <span className={cl.counter}>
                    {doneTodosLength} of {activeTodosLength + doneTodosLength}
                </span>
            </div>
        </div>
    );
};

export default TodoCompletedCounter;