import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import styles from '../styles/Pages.module.scss';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState("");
    const [editingTodo, setEditingTodo] = useState(null);
    const [error, setError] = useState("");

    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
        const storedTodos = JSON.parse(localStorage.getItem(`${loggedInUser.email}-todos`)) || [];
        setTodos(storedTodos);
    }, []);

    const handleSaveTodo = (e) => {
        e.preventDefault();
        if (!newTodo) {
            setError("To-Do cannot be empty");
            return;
        }

        let updatedTodos;
        if (editingTodo) {
            updatedTodos = todos.map((todo) =>
                todo.id === editingTodo.id ? { ...todo, task: newTodo } : todo
            );
            setEditingTodo(null);
        } else {
            const newTask = {
                id: Date.now(),
                task: newTodo,
                completed: false,
            };
            updatedTodos = [...todos, newTask];
        }

        setTodos(updatedTodos);
        localStorage.setItem(`${loggedInUser.email}-todos`, JSON.stringify(updatedTodos));
        setNewTodo("");
        setError("");
    };

    const editTodo = (todo) => {
        setEditingTodo(todo);
        setNewTodo(todo.task);
    };

    const deleteTodo = (id) => {
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
        localStorage.setItem(`${loggedInUser.email}-todos`, JSON.stringify(updatedTodos));
    }

    const toggleTodo = (id) => {
        const updatedTodos = todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        setTodos(updatedTodos);
        localStorage.setItem(`${loggedInUser.email}-todos`, JSON.stringify(updatedTodos));
    };

    return (
        <>
            <div className={styles.todo_main}>
                <h2 className="poppins-semibold">Your To-Dos</h2>
                <form onSubmit={handleSaveTodo} className={styles.add_todo_form}>
                    <input
                        type="text"
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                        placeholder={editingTodo ? "Edit To-Do" : "Add a new To-Do"}
                    />
                    <button type="submit" className="common_btn">{editingTodo ? "Save" : "Add"}</button>
                </form>
                {error && <p style={{ color: "red", fontSize: '12px' }}>{error}</p>}

                <ul className={styles.todo_lists}>
                    {todos.map((todo) => (
                        <li key={todo.id} className={styles.todo_lists_item}>
                            <div>
                                <span
                                      className={`poppins-regular ${styles.todo_lists_item_text} ${todo.completed ? styles.completed : ''}`}
                                >
                                    {todo.task}
                                </span>
                            </div>
                            <div>
                                <button onClick={() => toggleTodo(todo.id)}
                                    className={styles.complete_btn}>
                                    {todo.completed ? "Undo" : "Done"}
                                </button>
                                <button
                                    onClick={() => editTodo(todo)}
                                    className={styles.edit_delete_btn}>
                                    <FaEdit style={{ fontSize: '16px' }}
                                    />
                                </button>
                                <button
                                    onClick={() => deleteTodo(todo.id)}
                                    className={styles.edit_delete_btn}
                                >
                                    <MdDelete style={{ fontSize: '16px' }} />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}
export default TodoList;