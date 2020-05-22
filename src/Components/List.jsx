import React from "react";

import remove from "../assets/remove.svg";

export default function List(props) {
  return (
    <ul className="List">
      {props.TodoList.length ? (
        props.TodoList.map((i) => (
          <li
            key={i.id}
            className={i.done ? "list-item done" : "list-item"}
            style={
              i.done
                ? { backgroundColor: props.colors.todoItem[1] }
                : { backgroundColor: props.colors.todoItem[0] }
            }
          >
            <p onClick={() => props.toggleDone(i.id)}>{i.content}</p>
            <span
              className="remove"
              onClick={() => {
                props.deleteTodo(i.id);
              }}
            >
              <img src={remove} alt="remove" />
            </span>
          </li>
        ))
      ) : (
        <span className="emplty-list-message">
          C'mon add some todo's and call it a productive day !
        </span>
      )}
    </ul>
  );
}
