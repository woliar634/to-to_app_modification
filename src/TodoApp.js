// Main TodoApp Enhancements
const TodoApp = () => {
    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useState("all");
    const [sortBy, setSortBy] = useState("creation");
  
    useEffect(() => {
      fetch("https://github.com/selen0phile/todo-app/todos")
        .then((res) => res.json())
        .then((data) => setTodos(data));
    }, []);
  
    // Update Todo as Completed
    const completeTodo = (id) => {
      fetch(`https://github.com/selen0phile/todo-app/todos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: true }),
      })
        .then((res) => res.json())
        .then((updatedTodo) => {
          setTodos((prev) =>
            prev.map((todo) => (todo.id === id ? updatedTodo : todo))
          );
        });
    };
  
    // Filter Todos
    const filteredTodos = todos.filter((todo) =>
      filter === "all" ? true : todo.priority === filter
    );
  
    // Sort Todos
    const sortedTodos = [...filteredTodos].sort((a, b) => {
      if (sortBy === "creation") return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortBy === "deadline") return new Date(a.deadline) - new Date(b.deadline);
      if (sortBy === "priority") return a.priority - b.priority;
      return 0;
    });
  
    return (
      <div>
        <h1>Todo App</h1>
        <div>
          <label>Filter by Priority: </label>
          <select onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
        <div>
          <label>Sort by: </label>
          <select onChange={(e) => setSortBy(e.target.value)}>
            <option value="creation">Creation Time</option>
            <option value="deadline">Deadline</option>
            <option value="priority">Priority</option>
          </select>
        </div>
        {sortedTodos.map((todo) => (
          <div key={todo.id}>
            <p>{todo.task} - {todo.deadline} - Priority: {todo.priority}</p>
            <button onClick={() => completeTodo(todo.id)}>
              {todo.completed ? "Completed" : "Mark as Done"}
            </button>
          </div>
        ))}
        <Stopwatch />
      </div>
    );
  };
  
  export default TodoApp;
  