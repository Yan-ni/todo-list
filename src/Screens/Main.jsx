import React, { useState, useEffect } from "react";
import { observer, inject } from "mobx-react";

import Header from "../Components/Header";
import List from "../Components/List";
import AddTodoInput from "../Components/AddTodoInput";
import Settings from "../Components/Settings";

import defaultColors from "../defaultColors.json";
import TodoListStore from "../Store/TodoListStore";

function Main() {
  const [InputField, setInputField] = useState("");
  const [ColorSettings, setColorSettings] = useState(
    localStorage.getItem("Colors")
      ? JSON.parse(localStorage.getItem("Colors"))
      : defaultColors
  );
  const [ShowSettings, setShowSettings] = useState(false);
  const [TodosShape, setTodosShape] = useState(
    localStorage.getItem("shape") ? localStorage.getItem("shape") : "squared"
  );

  useEffect(() => {
    applyColors(ColorSettings);
    TodoListStore.loadList();
  }, [ColorSettings]);

  const applyColors = (colors) => {
    document.querySelector(
      ".App"
    ).style.background = `linear-gradient(120deg, ${colors.background[0]}, ${colors.background[1]}`;
  };

  return (
    <div className="App">
      <Header
        unhideSettings={() => setShowSettings(true)}
        clearTodoList={() => TodoListStore.clearList()}
      />
      <List
        TodoList={TodoListStore.List}
        toggleDone={(key) => TodoListStore.toggleItemDone(key)}
        deleteTodo={(key) => TodoListStore.removeItem(key)}
        colors={ColorSettings}
        shape={TodosShape}
      />
      <AddTodoInput
        addTodo={(text) => {
          TodoListStore.addItem(text);
          setInputField("");
        }}
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

export default inject("TodoListStore")(observer(Main));
