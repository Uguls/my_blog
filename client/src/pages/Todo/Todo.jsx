import "./../../styles/Todo/Todo.css";
import {
  useCallback,
  useReducer,
  useRef,
  createContext,
  useMemo,
  useEffect,
  useState,
} from "react";
import {
  initTodo,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../../store/store";
import Header from "../../components/Todo/Header";
import Editor from "../../components/Todo/Editor";
import List from "../../components/Todo/List";
import { useDispatch, useSelector } from "react-redux";

export const TodoStateContext = createContext();
export const TodoDispatchContext = createContext();

function Todo() {
  const [isLoading, setIsLoading] = useState(true);
  const todos = useSelector((state) => state.todo);
  const dispatch = useDispatch();
  const idRef = useRef(0);

  useEffect(() => {
    const storedData = localStorage.getItem("Todo");
    if (!storedData) {
      setIsLoading(false);
      return;
    }

    const parsedData = JSON.parse(storedData);
    if (!Array.isArray(parsedData)) {
      setIsLoading(false);
      return;
    }

    let maxId = 0;
    parsedData.forEach((item) => {
      if (Number(item.id) > maxId) {
        maxId = Number(item.id);
      }
    });

    idRef.current = maxId + 1;

    dispatch(initTodo(parsedData));

    setIsLoading(false);
  }, []);

  const onCreate = (content) => {
    dispatch(
      createTodo({
        id: idRef.current,
        content,
        isDone: false,
        createdDate: new Date().getTime(),
      }),
      (idRef.current += 1),
    );
  };

  const onUpdate = (id) => {
    dispatch(updateTodo(id));
  };

  const onDelete = (id) => {
    dispatch(deleteTodo(id));
  };
  if (isLoading) {
    return <div>데이터 로딩중 ...</div>;
  }

  return (
    <div className="Todo">
      <Header />
      <TodoStateContext.Provider value={todos}>
        <TodoDispatchContext.Provider value={{ onCreate, onUpdate, onDelete }}>
          <Editor />
          <List />
        </TodoDispatchContext.Provider>
      </TodoStateContext.Provider>
    </div>
  );
}

export default Todo;
