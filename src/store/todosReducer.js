const ADD_TODO = 'ADD_TODO',
    REMOVE_ACTIVE_TODO = 'REMOVE_ACTIVE_TODO',
    REMOVE_DONE_TODO = 'REMOVE_DONE_TODO',
    SWITCHING_ACTIVE_TODO = 'SWITCHING_ACTIVE_TODO',
    SWITCHING_DONE_TODO = 'SWITCHING_DONE_TODO',
    UPDATE_ACTIVE_TODO = 'UPDATE_ACTIVE_TODO'

const initialState = {
    activeTodos: [],
    doneTodos: []
}

export const todosReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TODO:
            return {
                ...state,
                activeTodos: [action.payload, ...state.activeTodos]
            }

        case REMOVE_ACTIVE_TODO:
            return {
                ...state,
                activeTodos: state.activeTodos.filter(todo => todo.id !== action.payload)
            }

        case REMOVE_DONE_TODO:
            return {
                ...state,
                doneTodos: state.doneTodos.filter(todo => todo.id !== action.payload)
            }

        case SWITCHING_ACTIVE_TODO:
            return {
                ...state,
                doneTodos: [
                    ...state.activeTodos.filter(todo => todo.id === action.payload)
                        .map(todo => ({...todo, isDone: !todo.isDone})),
                    ...state.doneTodos,
                ],
                activeTodos: state.activeTodos.filter(todo => todo.id !== action.payload)
            }

        case SWITCHING_DONE_TODO:
            return {
                ...state,
                activeTodos: [
                    ...state.doneTodos.filter(todo => todo.id === action.payload)
                        .map(todo => ({...todo, isDone: !todo.isDone})),
                    ...state.activeTodos,
                ],
                doneTodos: state.doneTodos.filter(todo => todo.id !== action.payload)
            }
        case UPDATE_ACTIVE_TODO:
            return {
                ...state,
                activeTodos: [
                    ...state.activeTodos.map(todo => {
                        if (todo.id === action.payload.id) {
                            return {...todo, title: action.payload.title}
                        }
                        return todo
                    })
                ]
            }
        default:
            return state
    }
}

export const addTodoCreator = (todo) => ({type: ADD_TODO, payload: todo})
export const removeActiveTodoCreator = (id) => ({type: REMOVE_ACTIVE_TODO, payload: id})
export const removeDoneTodoCreator = (id) => ({type: REMOVE_DONE_TODO, payload: id})
export const switchingActiveTodoCreator = (id) => ({type: SWITCHING_ACTIVE_TODO, payload: id})
export const switchingDoneTodoCreator = (id) => ({type: SWITCHING_DONE_TODO, payload: id})
export const updateActiveTodoCreator = (id, title) => ({type: UPDATE_ACTIVE_TODO, payload: {id, title}})