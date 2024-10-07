import { useReducer, useRef, createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  initDiary,
  createDiary,
  updateDiary,
  deleteDiary,
} from "../../store/store";

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
  }, [dispatch]);

  if (isLoading) {
    return <div>데이터 로딩중 ...</div>;
  }

  return <>{children}</>;
}
