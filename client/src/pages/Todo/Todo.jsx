import "./../../styles/Todo/Todo.css";
import {
  useCallback,
  useRef,
  useEffect,
  useState,
  createContext,
  useMemo,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Todo/Header";
import Editor from "../../components/Todo/Editor";
import List from "../../components/Todo/List";
import { createTodo, updateTodo, deleteTodo } from "./store";

export const TodoStateContext = createContext();
export const TodoDispatchContext = createContext();

function Todo() {
  const todos = useSelector((state) => state.todo.todos);
  const dispatch = useDispatch();
  const idRef = useRef(todos.length);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedData = localStorage.getItem("todos");
    if (!storedData) {
      setIsLoading(false);
      return;
    }

    const parsedData = JSON.parse(storedData);
    if (!Array.isArray(parsedData)) {
      setIsLoading(false);
      return;
    }

    parsedData.forEach((item) => {
      if (Number(item.id) >= idRef.current) {
        idRef.current = Number(item.id) + 1;
      }
    });

    dispatch({
      type: "INIT_TODOS",
      data: parsedData,
    });
    setIsLoading(false);
  }, [dispatch]);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos, isLoading]);

  const onCreate = (content) => {
    dispatch(
      createTodo({
        id: idRef.current,
        content,
        isDone: false,
        createdDate: new Date().getTime(),
      }),
    );
    idRef.current += 1;
  };

  const onUpdate = useCallback(
    (targetId) => {
      dispatch(updateTodo(targetId));
    },
    [dispatch],
  );

  const onDelete = useCallback(
    (targetId) => {
      dispatch(deleteTodo(targetId));
    },
    [dispatch],
  );

  const memoizedDispatch = useMemo(() => {
    return {
      onCreate,
      onUpdate,
      onDelete,
    };
  }, [onCreate, onUpdate, onDelete]);

  if (isLoading) {
    return <div>데이터 로딩중 ...</div>;
  }

  return (
    <div className="Todo">
      <Header />
      <TodoStateContext.Provider value={todos}>
        <TodoDispatchContext.Provider value={memoizedDispatch}>
          <Editor />
          <List />
        </TodoDispatchContext.Provider>
      </TodoStateContext.Provider>
    </div>
  );
}

export default Todo;
