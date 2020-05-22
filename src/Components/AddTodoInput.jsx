import React from "react";

import add from "../assets/add.svg";

export default function AddTodoInput(props) {
  return (
    <form
      className="addItem"
      onSubmit={(e) => {
        e.preventDefault();
        props.addTodo(props.InputField);
      }}
    >
      <input
        type="text"
        placeholder="Add a todo"
        value={props.InputField}
        onChange={(e) => props.setInputField(e.target.value)}
      />
      <button type="submit" className="add-btn">
        <span>
          <img src={add} alt="add" />
        </span>
      </button>
    </form>
  );
}
