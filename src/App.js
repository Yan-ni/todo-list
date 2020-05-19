import React, { useState, useEffect } from "react";
import "./App.css";

import todoItem from "./todoItem";
import add from "./assets/add.svg";
import remove from "./assets/remove.svg";

export default function App() {
  const [TodoList, setTodoList] = useState([]);
  const [InputField, setInputField] = useState("");

  useEffect(() => {
    const List = localStorage.getItem("List");
    if (List !== null) setTodoList(JSON.parse(List));
  }, []);

  const updateLocalStorage = () => {
    localStorage.setItem("List", JSON.stringify(TodoList));
  };

  const addTodo = (text) => {
    text = text.trim();
    if (text !== "") {
      const tmpList = TodoList;
      tmpList.push(new todoItem(text));
      setTodoList(tmpList);
    }
    updateLocalStorage();
    setInputField("");
  };

  const toggleDone = (key) => {
    setTodoList(
      TodoList.map((i) => {
        if (i.id === key) {
          i.done = i.done ? false : true;
        }
        return i;
      })
    );
    updateLocalStorage();
  };

  const deleteTodo = (key) => {
    const tmpList = TodoList.filter((i) => i.id !== key);
    setTodoList(tmpList);
    localStorage.setItem("List", JSON.stringify(tmpList));
  };

  return (
    <div className="App">
      <h1 className="title">Todo List</h1>
      <ul className="List">
        {TodoList.map((i) => (
          <li key={i.id} className={i.done ? "ListItem done" : "ListItem todo"}>
            <p onClick={() => toggleDone(i.id)}>{i.content}</p>
            <span
              className="Delete"
              onClick={() => {
                deleteTodo(i.id);
              }}
            >
              <img src={remove} alt="remove" />
            </span>
          </li>
        ))}
      </ul>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addTodo(InputField);
        }}
      >
        <input
          type="text"
          placeholder="Add a todo"
          value={InputField}
          onChange={(e) => setInputField(e.target.value)}
        />
        <button
          type="submit"
          className="Add"
          onClick={() => addTodo(InputField)}
        >
          <span>
            <img src={add} alt="add" />
          </span>
        </button>
      </form>
    </div>
  );
}
