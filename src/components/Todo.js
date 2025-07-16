import React, { useState } from 'react';
import './TodoApp.css';

const TodoApp = () => {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (inputValue.trim() === '') return;
        
        const newTodo = {
            id: Date.now(),
            text: inputValue,
            completed: false
        };
        
        setTodos([...todos, newTodo]);
        setInputValue('');
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSubmit(event);
        }
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const toggleTodo = (id) => {
        setTodos(todos.map(todo => 
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const completedCount = todos.filter(todo => todo.completed).length;
    const totalCount = todos.length;

    return (
        <div className="app-container">
            <div className="todo-wrapper">
                <h1 className="app-title">Todo List</h1>
                
                <div className="input-container">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        placeholder="Write a To Do and Press Enter"
                        className="todo-input"
                    />
                </div>

                <ul className="todo-list">
                    {todos.map((todo) => (
                        <li
                            key={todo.id}
                            className={`todo-item ${todo.completed ? 'completed' : ''}`}
                        >
                            <input
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => toggleTodo(todo.id)}
                                className="todo-checkbox"
                            />
                            <span 
                                className={`todo-text ${todo.completed ? 'completed' : ''}`}
                            >
                                {todo.text}
                            </span>
                            <button
                                onClick={() => deleteTodo(todo.id)}
                                className="delete-btn"
                            >
                                ×
                            </button>
                        </li>
                    ))}
                </ul>

                {todos.length === 0 && (
                    <div className="empty-state">
                        <p>할 일이 없습니다. 새로운 할 일을 추가해보세요!</p>
                    </div>
                )}

                <div className="todo-stats">
                    <p>
                        총 {totalCount}개의 할 일 | 완료: {completedCount}개
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TodoApp;