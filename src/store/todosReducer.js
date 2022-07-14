const ADD_TODO = 'ADD_TODO',
    REMOVE_TODO = 'REMOVE_TODO',
    TODO_DONE = 'TODO_DONE'


const initialState = {
    todos: [],
    done: []
}


export const todosReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TODO:
            return {
                ...state,
                todos: [action.payload, ...state.todos]
            }
        case REMOVE_TODO:
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== action.payload)
            }
        case TODO_DONE:
            return {
                ...state,
                done: [...state.todos
                    .filter(todo => todo.id === action.payload)
                    .map(elem => ({...elem, done: true})),
                    ...state.done
                ],
                todos: state.todos.filter(todo => todo.id !== action.payload)
            }
        default:
            return state
    }
}

export const addTodoCreator = (todo) => ({type: ADD_TODO, payload: todo})
export const removeTodoCreator = (id) => ({type: REMOVE_TODO, payload: id})
export const todoDoneCreator = (id) => ({type: TODO_DONE, payload: id})