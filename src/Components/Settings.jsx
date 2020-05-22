import React, { useState } from "react";

import defaultColors from "../defaultColors.json";

export default function Settings(props) {
  const [BackgroundC1, setBackgroundC1] = useState(
    props.ColorSettings.background[0]
  );
  const [BackgroundC2, setBackgroundC2] = useState(
    props.ColorSettings.background[1]
  );
  const [TodoItemC1, setTodoItemC1] = useState(props.ColorSettings.todoItem[0]);
  const [TodoItemC2, setTodoItemC2] = useState(props.ColorSettings.todoItem[1]);
  return (
    <div
      className="modal-bg"
      style={props.ShowSettings ? { display: "flex" } : { display: "none" }}
    >
      <div className="settings-modal">
        <div className="container">
          <h3 className="settings-title">Settings</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              props.setColorSettings({
                background: [BackgroundC1, BackgroundC2],
                todoItem: [TodoItemC1, TodoItemC2],
              });
            }}
          >
            <h3>Theme</h3>
            <div className="color-input">
              <label htmlFor="theme-background">background</label>
              <input
                type="color"
                name="theme"
                id="theme-background"
                value={BackgroundC1}
                onChange={(e) => {
                  setBackgroundC1(e.target.value);
                }}
              />
              <input
                type="color"
                name="theme"
                id="theme-background"
                value={BackgroundC2}
                onChange={(e) => {
                  setBackgroundC2(e.target.value);
                }}
              />
            </div>
            <div className="color-input">
              <label htmlFor="theme-todo-item">todo items </label>
              <input
                type="color"
                name="todo-item"
                id="theme-todo-item"
                value={TodoItemC1}
                onChange={(e) => setTodoItemC1(e.target.value)}
              />
              <input
                type="color"
                name="todo-item-done"
                id="theme-todo-item"
                value={TodoItemC2}
                onChange={(e) => setTodoItemC2(e.target.value)}
              />
            </div>
            <div className="buttons-container">
              <button
                onClick={() => {
                  setBackgroundC1(defaultColors.background[0]);
                  setBackgroundC2(defaultColors.background[1]);
                  setTodoItemC1(defaultColors.todoItem[0]);
                  setTodoItemC2(defaultColors.todoItem[1]);
                }}
              >
                Reset
              </button>
              <div className="main-buttons">
                <button onClick={() => props.hideSettings()}>Cancel</button>
                <button type="submit">Save</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
