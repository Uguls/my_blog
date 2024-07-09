import Header from "../../components/Diary/Header";
import Button from "../../components/Diary/Button";
import Editor from "../../components/Diary/Editor";
import {createDiary, store} from "../../store/store";

import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { useDispatch } from "react-redux";

const getHighestId = () => {
  const storedData = localStorage.getItem("state");

  if (!storedData) {
    return 0;
  }

  const parsedData = JSON.parse(storedData);

  const diaryArray = parsedData.diary;

  // if (!Array.isArray(parsedData) || !Array.isArray(diaryArray)) {
  //   return 0;
  // }

  let maxId = 0;

  diaryArray.forEach((item) => {
    if (Number(item.id) > maxId) {
      maxId = Number(item.id);
    }
  });

  return maxId;
};

const New = () => {
  const dispatch = useDispatch();

  // Edit페이지가 아닌 New 페이지이기 때문에 onCreate 함수를 useContext를 사용해서 받아옴

  const nav = useNavigate();

  // 불러온 onCreate함수에 Editor컴포넌트로부터 전달받은 input state를 인자로 받아
  // onCreate함수에 인자로 넣는데 createdDate는 timestamp형식이기 때문에 .getTime()작성
  const onSubmit = (input) => {
    const newId = getHighestId() + 1;
    dispatch(
      createDiary({
        id: newId,
        // createdDate: input.createdDate,
        ...input,
      }),
    );
    nav("/diary", { replace: true });
  };

  return (
    <div>
      <Header
        title={"새 일기 쓰기"}
        leftChild={<Button onClick={() => nav(-1)} text={"< 뒤로 가기"} />}
      />
      {/*New Editor 컴포넌트로 onSubmit이라는 props명으로 onSubmit 함수 전달*/}
      <Editor onSubmit={onSubmit} />
    </div>
  );
};

export default New;
