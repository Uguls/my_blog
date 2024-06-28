import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/Diary/Header";
import Button from "../../components/Diary/Button.jsx";
import Editor from "../../components/Diary/Editor.jsx";
import { useContext, useEffect, useState } from "react";
import useDiary from "../../hooks/useDiary";
import { useDispatch } from "react-redux";
import { deleteDiary, updateDiary } from "../../store/store";

const Edit = () => {
  const params = useParams();
  const nav = useNavigate();
  const dispatch = useDispatch();
  const currentDiaryItem = useDiary(params.id);

  const onClickDelete = () => {
    if (window.confirm("일기를 정말 삭제할까요? 다시 복구되지 않아요!")) {
      //데이터 삭제 로직
      dispatch(deleteDiary(params.id));
      nav("/diary", { replace: true });
    }
  };

  const onSubmit = (input) => {
    console.log(input);
    if (window.confirm("일기를 정말 수정할까요?")) {
      dispatch(
        updateDiary(
          params.id,
          input.createdDate.getTime(),
          input.emotionId,
          input.content,
        ),
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
