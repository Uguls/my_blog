import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/Diary/Header";
import Button from "../../components/Diary/Button.jsx";
import Editor from "../../components/Diary/Editor.jsx";
import { useContext, useEffect, useState } from "react";
import {
  DiaryDispatchContext,
  DiaryStateContext,
} from "../../components/Diary/DiaryProvider";

const Edit = () => {
  const params = useParams();
  const nav = useNavigate();
  const data = useContext(DiaryStateContext);
  const { onDelete, onUpdate } = useContext(DiaryDispatchContext);
  const [currentDiaryItem, setCurrentDiaryItem] = useState();

  useEffect(() => {
    const currenDiaryItem = data.find(
      (item) => String(item.id) === String(params.id),
    );

    if (!currenDiaryItem) {
      window.alert("존재하지 않는 일기입니다.");
      nav("/diary", { replace: true });
    }

    setCurrentDiaryItem(currenDiaryItem);
  }, [params.id, data]);

  const onClickDelete = () => {
    if (window.confirm("일기를 정말 삭제할까요? 다시 복구되지 않아요!")) {
      //데이터 삭제 로직
      onDelete(params.id);
      nav("/diary", { replace: true });
    }
  };

  const onSubmit = (input) => {
    if (window.confirm("일기를 정말 수정할까요?")) {
      onUpdate(
        params.id,
        input.createdDate.getTime(),
        input.emotionId,
        input.content,
      );
      nav("/diary", { replace: true });
    }
  };

  return (
    <div>
      <Header
        title={"일기 수정하기"}
        leftChild={<Button onClick={() => nav(-1)} text={"< 뒤로가기"} />}
        rightChild={
          <Button onClick={onClickDelete} text={"삭제하기"} type={"NEGATIVE"} />
        }
      />
      <Editor initData={currentDiaryItem} onSubmit={onSubmit} />
    </div>
  );
};

export default Edit;
