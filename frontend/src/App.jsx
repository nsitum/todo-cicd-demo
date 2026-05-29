import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  async function fetchTodos() {
    const response = await axios.get(
      "/todos"
    );

    setTodos(response.data);
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  async function addTodo() {
    if (!text.trim()) return;

    await axios.post(
      "/todos",
      {
        text,
      }
    );

    setText("");

    fetchTodos();
  }

  async function deleteTodo(id) {
    await axios.delete(
      `/todos/${id}`
    );

    fetchTodos();
  }

  return (
    <div
      style={{
        maxWidth: 500,
        margin: "40px auto",
        fontFamily: "Arial",
      }}
    >
      <h1>Todo CI/CD Demo</h1>

      <div
        style={{
          display: "flex",
          gap: 10,
          marginBottom: 20,
        }}
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Unesi task"
          style={{
            flex: 1,
            padding: 10,
          }}
        />

        <button onClick={addTodo}>
          Add
        </button>
      </div>

      {todos.map((todo) => (
        <div
          key={todo.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: 10,
            border: "1px solid #ccc",
            marginBottom: 10,
          }}
        >
          <span>{todo.text}</span>

          <button
            onClick={() =>
              deleteTodo(todo.id)
            }
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;