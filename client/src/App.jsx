import "./App.css";
import Header from "./components/Header";
import TodoEditor from "./components/TodoEditor";
import TodoList from "./components/TodoList";
import {useRef, useState} from "react";
import Navbar from "./components/Navbar";

const mockTodo = [
  {
    id: 0,
    isDone: false,
    content: "React 공부하기",
    createDate: new Date().getTime(),
  },
  {
    id: 1,
    isDone: false,
    content: "빨래 널기",
    createDate: new Date().getTime(),
  },
  {
    id: 2,
    isDone: false,
    content: "노래 연습하기",
    createDate: new Date().getTime(),
  }
]

function App() {
  const idRef = useRef(3);
  const [todo, setTodo] = useState([]);

  const onCreate = (content) => {
    const newItem = {
      id: idRef.current,
      content,
      isDone: false,
      createDate: new Date().getTime(),
    };
    setTodo([newItem, ...todo]);
    idRef.current += 1;
  };

  return (
    <div className="App">
      <Navbar />
      <Header />
      <TodoEditor onCreate={onCreate}/>
      <TodoList />
    </div>
  );
}

export default App;