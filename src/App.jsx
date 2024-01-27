import { useEffect, useState } from "react";
import "./App.css";
import { TodoProvider } from "./contexts";
import { TodoForm, TodoItem } from "./components";

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };
  const updatedTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo))
    );
  };
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };
  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((preValue) =>
        preValue.id === id
          ? { ...preValue, completed: !preValue.completed }
          : preValue
      )
    );
  };

  useEffect(() => {
    let todoStorage = JSON.parse(localStorage.getItem("todoLocal"));
    if (todoStorage && todoStorage.length > 0) {
      setTodos(todoStorage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todoLocal", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider
      value={{ todos, addTodo, updatedTodo, deleteTodo, toggleTodo }}
    >
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full text-2xl text-center max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          ADD TODO
          <hr />
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
            <hr className="mt-2" />
          </h1>
          <div className="mb-4">
            {/* Todo form goes here */} <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {todos.map((todo) => (
              <div key={todo.id}>
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
