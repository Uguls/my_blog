import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DiaryStateContext } from "../components/Diary/DiaryProvider";

const useDiary = (id) => {
  const data = useContext(DiaryStateContext);
  const [currentDiaryItem, setCurrentDiaryItem] = useState();
  const nav = useNavigate();

  useEffect(() => {
    const currenDiaryItem = data.find((item) => String(item.id) === String(id));

    if (!currenDiaryItem) {
      window.alert("존재하지 않는 일기입니다.");
      nav("/diary", { replace: true });
    }

    setCurrentDiaryItem(currenDiaryItem);
  }, [id, data]);

  return currentDiaryItem;
};

export default useDiary;
