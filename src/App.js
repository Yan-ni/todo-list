import React from "react";
import { Provider } from "mobx-react";
import "./App.min.css";

import Main from "./Screens/Main";
import TodoListStore from "./Store/TodoListStore";

export default function App() {
  return (
    <Provider TodoListStore={TodoListStore}>
      <Main />
    </Provider>
  );
}
