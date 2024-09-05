import React, { useEffect, useState } from "react";

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
            <h2>Your To-Dos</h2>
            <form onSubmit={handleSaveTodo}>
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder={editingTodo ? "Edit To-Do" : "Add a new To-Do"}
                />
                <button type="submit">{editingTodo ? "Save" : "Add"}</button>
                {error && <p style={{ color: "red" }}>{error}</p>}
            </form>

            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        <span
                            style={{
                                textDecoration: todo.completed ? "line-through" : "none",
                            }}
                        >
                            {todo.task}
                        </span>
                        <button onClick={() => toggleTodo(todo.id)}>
                            {todo.completed ? "Undo" : "Done"}
                        </button>
                        <button onClick={() => editTodo(todo)}>Edit</button>
                        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </>
    )
}
export default TodoList;