import React, { useState, useEffect } from "react";
import "./App.min.css";

import todoItem from "./todoItem";
import Header from "./Components/Header";
import List from "./Components/List";
import AddTodoInput from "./Components/AddTodoInput";
import Settings from "./Components/Settings";

import defaultColors from "./defaultColors.json";

export default function App() {
  const [TodoList, setTodoList] = useState([]);
  const [InputField, setInputField] = useState("");
  const [ColorSettings, setColorSettings] = useState(
    localStorage.getItem("Colors")
      ? JSON.parse(localStorage.getItem("Colors"))
      : defaultColors
  );
  const [ShowSettings, setShowSettings] = useState(true); //!TEMPORARY
  const [TodosShape, setTodosShape] = useState(
    localStorage.getItem("shape") ? localStorage.getItem("shape") : "squared"
  );

  useEffect(() => {
    applyColors(ColorSettings);

    const List = localStorage.getItem("List");
    if (List !== null) setTodoList(JSON.parse(List));
  }, []);

  const applyColors = (colors) => {
    document.querySelector(
      ".App"
    ).style.background = `linear-gradient(120deg, ${colors.background[0]}, ${colors.background[1]}`;
  };

  const updateLocalStorageList = () => {
    localStorage.setItem("List", JSON.stringify(TodoList));
  };

  const checkForLongWords = (text) => {
    let longWord = false;
    text.split(" ").map((i) => {
      if (i.length >= 20) longWord = true;
      return i;
    });
    return longWord;
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
    updateLocalStorageList();
  };

  const deleteTodo = (key) => {
    const tmpList = TodoList.filter((i) => i.id !== key);
    setTodoList(tmpList);
    localStorage.setItem("List", JSON.stringify(tmpList));
  };

  const clearTodoList = () => {
    if (window.confirm("Are you sure you want to clear all the list ?")) {
      setTodoList([]);
      localStorage.removeItem("List");
    }
  };

  const addTodo = (text) => {
    text = text.trim();
    if (text !== "" && !checkForLongWords(text)) {
      const tmpList = TodoList;
      tmpList.push(new todoItem(text));
      setTodoList(tmpList);
    }
    updateLocalStorageList();
    setInputField("");
  };

  return (
    <div className="App">
      <Header
        unhideSettings={() => setShowSettings(true)}
        clearTodoList={clearTodoList}
      />
      <List
        TodoList={TodoList}
        toggleDone={(key) => toggleDone(key)}
        deleteTodo={(key) => deleteTodo(key)}
        colors={ColorSettings}
        shape={TodosShape}
      />
      <AddTodoInput
        addTodo={(text) => addTodo(text)}
        InputField={InputField}
        setInputField={(text) => setInputField(text)}
      />
      <Settings
        ShowSettings={ShowSettings}
        hideSettings={() => setShowSettings(false)}
        ColorSettings={ColorSettings}
        setColorSettings={(colors) => {
          setColorSettings(colors);
          applyColors(colors);
          localStorage.setItem("Colors", JSON.stringify(colors));
        }}
        shape={TodosShape}
        setShape={(shape) => {
          setTodosShape(shape);
          localStorage.setItem("shape", shape);
        }}
      />
    </div>
  );
}
