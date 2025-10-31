import { createContext, useReducer, useContext } from "react";
import todosReducer from "../reducers/todosReducer";

export const TodoContext = createContext([]);

const TodosProvider = ({ children }) => {
  const [todos, todosDispatch] = useReducer(todosReducer, []);

  return (
    <TodoContext.Provider value={{ todos: todos, dispatch: todosDispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => {
  return useContext(TodoContext);
};

export default TodosProvider;
