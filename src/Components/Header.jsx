import React from "react";

import clear from "../assets/clear.svg";
import settings from "../assets/settings.svg";

export default function Header(props) {
  return (
    <header>
      <span className="settings" onClick={() => props.showSettings()}>
        <img src={settings} alt="settings" />
      </span>
      <h1 className="title">Todo List</h1>
      <span className="clear" onClick={() => props.clearTodoList()}>
        <img src={clear} alt="clear" />
      </span>
    </header>
  );
}
