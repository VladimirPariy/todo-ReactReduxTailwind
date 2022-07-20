import {combineReducers, createStore} from "redux";
import {todosReducer} from "./todosReducer";
import {devToolsEnhancer} from '@redux-devtools/extension';
import {isValidReducer} from "./isValidReducer";

function saveToLocalStorage(state) {
    try {
        const serialisedState = JSON.stringify(state);
        localStorage.setItem("persistentState", serialisedState);
    } catch (e) {
        console.warn(e);
    }
}

function loadFromLocalStorage() {
    try {
        const serialisedState = localStorage.getItem("persistentState");
        if (serialisedState === null) return undefined;
        return JSON.parse(serialisedState);
    } catch (e) {
        console.warn(e);
        return undefined;
    }
}


const rootReducer = combineReducers({
    todos: todosReducer,
    isValid: isValidReducer
})

export const store = createStore(rootReducer, loadFromLocalStorage(), devToolsEnhancer())

store.subscribe(() => saveToLocalStorage(store.getState()));