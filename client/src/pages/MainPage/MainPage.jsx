import React, {useState, useContext, useCallback, useEffect} from 'react';
import './MainPage.scss'
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";

function MainPage() {
    const [text, setText] = useState('')
    const {userId} = useContext(AuthContext)
    const [todos, setTodos] = useState([])

    const getTodo = useCallback(async () => {
        try {
            await axios.get('/api/todo', {
                headers: {
                    'Content-Type': 'application/json'
                },
                params: {userId}
            })
                .then((response) => setTodos(response.data))
        } catch (e) {
            console.log(e)
        }
    }, [userId])
    const creatTodo = useCallback(async () => {
        if(!text) return null
        try {
            await axios.post('/api/todo/add', {text, userId}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then((response) => {
                    setTodos([...todos], response.data)
                    setText('')
                    getTodo()
                })
        } catch (e) {
            console.log(e)
        }
    }, [text, userId, todos, getTodo])
    const removeTodo = useCallback(async (id) => {
        try {
            await axios.delete(`/api/todo/delete/${id}`, {id}, {
                headers: {'Content-Type': 'application/json'}
            }).then(() => getTodo())
        } catch (e) {
            console.log(e)
        }
    }, [getTodo])
    const completedTodo = useCallback(async (id) => {
        try {
            await axios.put(`/api/todo/completed/${id}`, {id}, {
                headers: {'Content-Type': 'application/json'}
            }).then((response) => {
                setTodos([...todos], response.data)
                getTodo()
            })
        } catch (e) {
            console.log(e)
        }
    }, [getTodo, todos])
    const importantTodo = useCallback(async (id) => {
        try {
            await axios.put(`/api/todo/important/${id}`, {id}, {
                headers: {'Content-Type': 'application/json'}
            }).then((response) => {
                setTodos([...todos], response.data)
                getTodo()
            })
        } catch (e) {
            console.log(e)
        }
    }, [getTodo, todos])

    useEffect(() => {
        getTodo()
    }, [getTodo])
    return (
        <div onLoad={getTodo} className="container">
            <div className="main-page">
                <h4>Добавить задачу</h4>
                <form className="form form-login" onSubmit={e => e.preventDefault()}>
                    <div className="row">
                        <div className="input-field col s12">
                            <input
                                type="text"
                                id="text"
                                name="input"
                                className="validate"
                                value={text}
                                onChange={e => setText(e.target.value)}
                            />
                            <label htmlFor="input">Задача:</label>
                        </div>
                    </div>
                    <div className="row">
                        <button onClick={creatTodo} className="waves-effect waves-light btn green">
                            Добавить
                        </button>
                    </div>
                </form>
                <h3>Активные задачи:</h3>
                <div className="todos">
                    {
                        todos.map((todo, index) => {
                            let cls = ['row flex todos-item']
                            if(todo.completed) {
                                cls.push('completed')
                            }
                            if(todo.important) {
                                cls.push('important')
                            }
                            return (
                                <div className={cls.join(' ')} key={index}>
                                    <div className="col todos-num">{index + 1}</div>
                                    <div className="col todos-text">{todo.text}</div>
                                    <div className="col todos-buttons">
                                        <i onClick={() => completedTodo(todo._id)} className="material-icons green-text">check</i>
                                        <i onClick={() => importantTodo(todo._id)} className="material-icons orange-text">warning</i>
                                        <i onClick={() => removeTodo(todo._id)} className="material-icons red-text">delete</i>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default MainPage;