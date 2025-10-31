import { v4 as uuidv4 } from "uuid";

export default function reducer(currentTodos, action) {
  switch (action.type) {
    case "added": {
      const newTodo = {
        id: uuidv4(),
        title: action.payload.newTitle,
        content: "Write Content Here",
        isCompleted: false,
      };
      const updatedTodos = [...currentTodos, newTodo];
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }
    case "deleted": {
      const updatedTodos = currentTodos.filter(
        (t) => action.payload.id !== t.id
      );
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }
    case "updated": {
      const newTodos = currentTodos.map((t) => {
        if (action.payload.id === t.id) {
          return {
            ...t,
            title: action.payload.title,
            content: action.payload.content,
          };
        } else {
          return t;
        }
      });
      localStorage.setItem("todos", JSON.stringify(newTodos));
      return newTodos;
    }
    case "checked": {
      const updatedTodos = currentTodos.map((t) => {
        if (t.id == action.payload.id) {
          const updatedTodo = { ...t, isCompleted: !t.isCompleted };
          return updatedTodo;
        }
        return t;
      });
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }
    case "get": {
      const StorageTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
      return StorageTodos;
    }
    default: {
      throw Error("Unknow Action !!!!" + action.type);
    }
  }
}
