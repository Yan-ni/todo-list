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
            style={{
              backgroundColor: i.done ? props.colors[1] : props.colors[0],
              borderRadius: props.shape === "rounded" ? "26px" : 0,
              marginBottom: props.shape === "rounded" ? "5px" : 0,
            }}
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
