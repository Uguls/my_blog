import "./../../styles/Todo/Todo.css";
import {
  useCallback,
  useReducer,
  useRef,
  createContext,
  useMemo,
  useEffect,
} from "react";
import Header from "../../components/Todo/Header";
import Editor from "../../components/Todo/Editor";
import List from "../../components/Todo/List";

function reducer(state, action) {
  let nextState;

  switch (action.type) {
    case "INIT":
      return action.data;
    case "CREATE": {
      nextState = [action.newItem, ...state];
      break;
    }
    case "UPDATE": {
      nextState = state.map((it) =>
        it.id === action.targetId
          ? {
              ...it,
              isDone: !it.isDone,
            }
          : it,
      );
      break;
    }
    case "DELETE": {
      nextState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    default:
      return state;
  }

  localStorage.setItem("Todo", JSON.stringify(nextState));
  return nextState;
}

export const TodoStateContext = createContext();
export const TodoDispatchContext = createContext();

function Todo() {
  const [isLoading, setIsLoading] = useState(true);
  const [todos, dispatch] = useReducer(reducer, []);
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

    dispatch({
      type: "INIT",
      data: parsedData,
    });

    setIsLoading(false);
  }, []);

  const onCreate = (content) => {
    dispatch({
      type: "CREATE",
      newItem: {
        id: idRef.current,
        content,
        isDone: false,
        createdDate: new Date().getTime(),
      },
    });
    idRef.current += 1;
  };

  const onUpdate = useCallback((targetId) => {
    dispatch({
      type: "UPDATE",
      targetId,
    });
  }, []);

  const onDelete = useCallback((targetId) => {
    dispatch({
      type: "DELETE",
      targetId,
    });
  }, []);

  const memoizedDispatch = useMemo(() => {
    return {
      onCreate,
      onUpdate,
      onDelete,
    };
  }, []);

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
