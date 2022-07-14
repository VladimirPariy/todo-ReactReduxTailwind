import {combineReducers, createStore} from "redux";
import {todosReducer} from "./todosReducer";
import { devToolsEnhancer } from '@redux-devtools/extension';

const rootReducer = combineReducers({
todos: todosReducer,
})

export const store = createStore(rootReducer, devToolsEnhancer())