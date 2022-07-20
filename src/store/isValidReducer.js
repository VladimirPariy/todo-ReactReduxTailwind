const IS_VALID_TODO = 'IS_VALID_TODO'

const initialState = {
    isValid:true
}

export const isValidReducer = (state = initialState, action) => {
    switch (action.type) {
        case IS_VALID_TODO:
            return {
                ...state,
                isValid: action.payload
            }
        default:
            return state
    }
}

export const isValidTodoCreator = (isValid) => ({type: IS_VALID_TODO, payload: isValid})