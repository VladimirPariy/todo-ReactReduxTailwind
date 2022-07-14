import TodoForm from "./components/TodoForm/TodoForm";
import TodoList from "./components/TodoList/TodoList";
import Header from "./components/Header/Header";
import cl from './app.module.scss'


const App = () => {

    return (
        <>
            <Header/>
            <div className={cl.container}>
                <TodoForm/>
                <TodoList/>
            </div>

        </>
    );
}

export default App;
