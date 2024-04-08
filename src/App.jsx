import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setshowFinished] = useState(true);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const toggleFinished = (e) => {
    setshowFinished(!showFinished);
  };

  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  };

  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    saveToLS();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS();
  };

  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-10 rounded-xl p-8 bg-[#e4fafa] min-h-[80vh] md:w-[40%] shadow-lg">
        <h1 className="font-bold text-center text-4xl mb-8 text-[#4B5563]">
          iTask - Manage Your Todos
        </h1>
        <div className="addTodo my-8 flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-[#4B5563]">Add a Todo</h2>
          <div className="flex items-center">
            <input
              onChange={handleChange}
              value={todo}
              type="text"
              className="w-full rounded-full px-6 py-3 focus:outline-none focus:ring-2 focus:ring-[#805AD5] focus:border-transparent bg-[#E9D8FD] text-[#4B5563] placeholder-[#9CA3AF]::placeholder"
              placeholder="Enter your todo"
            />
            <button
              onClick={handleAdd}
              disabled={todo.length <= 3}
              className="bg-[#805AD5] mx-4 rounded-full hover:bg-[#6B46C1] disabled:bg-[#C084FC] px-6 py-3 text-sm font-bold text-white"
            >
              Save
            </button>
          </div>
        </div>
        <div className="flex items-center mb-6">
          <input
            className="mr-2 rounded-full bg-[#805AD5] focus:outline-none focus:ring-2 focus:ring-[#805AD5]"
            id="show"
            onChange={toggleFinished}
            type="checkbox"
            checked={showFinished}
          />
          <label className="text-lg font-medium text-[#4B5563]" htmlFor="show">
            Show Finished
          </label>
        </div>
        <div className="h-[1px] bg-[#070707] opacity-50 w-[90%] mx-auto my-4"></div>
        <h2 className="text-2xl font-bold mb-6 text-[#4B5563]">Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && (
            <div className="m-5 text-lg font-medium text-[#64748B]">
              No Todos to display
            </div>
          )}
          {todos.map((item) => {
            return (
              (showFinished || !item.isCompleted) && (
                <div
                  key={item.id}
                  className="todo flex justify-between items-center my-4 px-6 py-4 rounded-lg shadow-md bg-white"
                >
                  <div className="flex items-center gap-5">
                    <input
                      name={item.id}
                      onChange={handleCheckbox}
                      type="checkbox"
                      checked={item.isCompleted}
                      id=""
                      className="w-5 h-5 rounded-full bg-[#805AD5] focus:outline-none focus:ring-2 focus:ring-[#805AD5]"
                    />
                    <div
                      className={
                        item.isCompleted
                          ? "line-through text-[#64748B]"
                          : "text-[#4B5563]"
                      }
                    >
                      {item.todo}
                    </div>
                  </div>
                  <div className="buttons flex items-center">
                    <button
                      onClick={(e) => handleEdit(e, item.id)}
                      className="bg-[#805AD5] hover:bg-[#6B46C1] p-2 py-1 text-sm font-bold text-white rounded-md mx-2"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={(e) => {
                        handleDelete(e, item.id);
                      }}
                      className="bg-[#805AD5] hover:bg-[#6B46C1] p-2 py-1 text-sm font-bold text-white rounded-md mx-2"
                    >
                      <AiFillDelete />
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
