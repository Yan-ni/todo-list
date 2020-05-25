import React, { useState } from "react";

import defaultSettings from "../Utils/defaultSettings.json";

export default function Settings({
  Colors,
  Shape,
  SettingsShown,
  hideSettings,
  updateSettings,
  applyColors,
}) {
  const [BackgroundC1, setBackgroundC1] = useState(Colors.background[0]);
  const [BackgroundC2, setBackgroundC2] = useState(Colors.background[1]);
  const [TodoItemC1, setTodoItemC1] = useState(Colors.todoItem[0]);
  const [TodoItemC2, setTodoItemC2] = useState(Colors.todoItem[1]);
  const [TodoShape, setTodoShape] = useState(Shape);

  const update = () => {
    setBackgroundC1(Colors.background[0]);
    setBackgroundC2(Colors.background[1]);
    setTodoItemC1(Colors.todoItem[0]);
    setTodoItemC2(Colors.todoItem[1]);
    setTodoShape(Shape);
  };

  return (
    <div
      className="modal-bg"
      style={SettingsShown ? { display: "flex" } : { display: "none" }}
    >
      <div className="settings-modal">
        <h3 className="settings-title">Settings</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const sets = {
              Colors: {
                background: [BackgroundC1, BackgroundC2],
                todoItem: [TodoItemC1, TodoItemC2],
              },
              Shape: TodoShape,
            };
            updateSettings(sets);
            applyColors(sets.Colors);
            hideSettings();
          }}
        >
          <h3>Theme</h3>
          <div className="color-input">
            <legend>background</legend>
            <input
              type="color"
              value={BackgroundC1}
              onChange={(e) => {
                setBackgroundC1(e.target.value);
              }}
            />
            <input
              type="color"
              value={BackgroundC2}
              onChange={(e) => {
                setBackgroundC2(e.target.value);
              }}
            />
          </div>
          <div className="color-input">
            <legend>todo items</legend>
            <input
              type="color"
              value={TodoItemC1}
              onChange={(e) => setTodoItemC1(e.target.value)}
            />
            <input
              type="color"
              value={TodoItemC2}
              onChange={(e) => setTodoItemC2(e.target.value)}
            />
          </div>
          <div className="todos-shape">
            <legend>todo's shape</legend>
            <div className="input-container">
              <div className="radio-input">
                <input
                  type="radio"
                  name="shape"
                  id="squared"
                  value="squared"
                  checked={TodoShape === "squared" ? "checked" : ""}
                  onChange={(e) => setTodoShape(e.target.value)}
                />
                <label htmlFor="squared">squared</label>
              </div>
              <div className="radio-input">
                <input
                  type="radio"
                  name="shape"
                  id="rounded"
                  value="rounded"
                  checked={TodoShape === "rounded" ? "checked" : ""}
                  onChange={(e) => setTodoShape(e.target.value)}
                />
                <label htmlFor="rounded">rounded</label>
              </div>
            </div>
          </div>
          <div className="buttons-container">
            <button
              type="reset"
              onClick={() => {
                setBackgroundC1(defaultSettings.Colors.background[0]);
                setBackgroundC2(defaultSettings.Colors.background[1]);
                setTodoItemC1(defaultSettings.Colors.todoItem[0]);
                setTodoItemC2(defaultSettings.Colors.todoItem[1]);
                setTodoShape("squared");
              }}
            >
              Reset
            </button>
            <div className="main-buttons">
              <button
                type="button"
                onClick={() => {
                  hideSettings();
                  update();
                }}
              >
                Cancel
              </button>
              <button type="submit">Save</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
