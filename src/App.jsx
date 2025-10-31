import React from "react";
import "./App.css";
import TodoList from "./Components/TodoList";
import { v4 as uuidv4 } from "uuid";
import { ToastProvider } from "./Contexts/ToastContext";
import TodosProvider from "./Contexts/TodoContext";

const todo = [
  {
    id: uuidv4(),
    title: "Create a React",
    content: "Create a React Project On This Week",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "Create a React",
    content: "Create a React Project On This Week",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "Create a React",
    content: "Create a React Project On This Week",
    isCompleted: false,
  },
];

function App() {
  return (
    <div className="App">
      <ToastProvider>
        <TodosProvider>
          <TodoList />
        </TodosProvider>
      </ToastProvider>
    </div>
  );
}

export default App;
