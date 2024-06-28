import { useReducer, useRef, createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  initDiary,
  createDiary,
  updateDiary,
  deleteDiary,
} from "../../store/store";

export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

export function DiaryProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const data = useSelector((state) => state.diary);
  const dispatch = useDispatch();
  const idRef = useRef(0);

  useEffect(() => {
    const storedData = localStorage.getItem("diary");
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

    dispatch(initDiary(parsedData));
    setIsLoading(false);
  }, []);

  const onCreate = (createdDate, emotionId, content) => {
    dispatch(
      createDiary({
        id: idRef.current++,
        createdDate,
        emotionId,
        content,
      }),
    );
  };

  const onUpdate = (id, createdDate, emotionId, content) => {
    dispatch(
      updateDiary({
        id,
        createdDate,
        emotionId,
        content,
      }),
    );
  };

  const onDelete = (id) => {
    dispatch(deleteDiary(id));
  };

  if (isLoading) {
    return <div>데이터 로딩중 ...</div>;
  }

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{ onCreate, onUpdate, onDelete }}>
        {children}
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}
