import React, { useState, useEffect } from "react";
import { observer, inject } from "mobx-react";

import Header from "../Components/Header";
import List from "../Components/List";
import AddTodoInput from "../Components/AddTodoInput";
import Settings from "../Components/Settings";

function Main({ TodoListStore, SettingsStore }) {
  const [InputField, setInputField] = useState("");

  useEffect(() => {
    TodoListStore.loadList();
    SettingsStore.loadSettings();

    applyColors(SettingsStore.Settings.Colors);
  }, [TodoListStore, SettingsStore]);

  const applyColors = (colors) => {
    document.querySelector(
      ".App"
    ).style.background = `linear-gradient(120deg, ${colors.background[0]}, ${colors.background[1]}`;
  };

  return (
    <div className="App">
      <Header
        showSettings={() => SettingsStore.showSettings()}
        clearTodoList={() => TodoListStore.clearList()}
      />
      <List
        TodoList={TodoListStore.List}
        toggleDone={(key) => TodoListStore.toggleItemDone(key)}
        deleteTodo={(key) => TodoListStore.removeItem(key)}
        colors={SettingsStore.Settings.Colors.todoItem}
        shape={SettingsStore.Settings.Shape}
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
        Colors={SettingsStore.Settings.Colors}
        Shape={SettingsStore.Settings.Shape}
        SettingsShown={SettingsStore.Shown}
        hideSettings={() => SettingsStore.hideSettings()}
        updateSettings={(sets) => SettingsStore.updateSettings(sets)}
        applyColors={(colors) => applyColors(colors)}
      />
    </div>
  );
}

export default inject("TodoListStore", "SettingsStore")(observer(Main));
