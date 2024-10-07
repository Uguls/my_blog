import "../../styles/Diary/Editor.css";
import EmotionItem from "./EmotionItem.jsx";
import Button from "./Button.jsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getStringedDate } from "../../util/get-stringed-date";
import { emotionList } from "../../util/constants";

const Editor = ({ initData, onSubmit }) => {
  const [input, setInput] = useState({
    createdDate: new Date().getTime(), // timestamp 형식으로 저장
    emotionId: 3,
    content: "",
  });

  const nav = useNavigate();

  useEffect(() => {
    if (initData) {
      setInput({
        ...initData,
        createdDate: Number(initData.createdDate), // timestamp 형식으로 변환
      });
    }
  }, [initData]);

  const onChangeInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "createdDate") {
      value = new Date(value).getTime(); // timestamp 형식으로 변환
    }

    setInput({
      ...input,
      [name]: value,
    });
  };

  const onSubmitButtonClick = () => {
    onSubmit(input); // onSubmit 함수를 호출하면서 인수로 input state값을 전달
  };

  return (
    <div className={"Editor"}>
      <section className={"date_section"}>
        <h4>오늘의 날짜</h4>
        <input
          name={"createdDate"}
          onChange={onChangeInput}
          value={getStringedDate(new Date(input.createdDate))} // Date 객체로 변환하여 문자열로 표시
          type={"date"}
        />
      </section>
      <section className={"emotion_section"}>
        <h4>오늘의 감정</h4>
        <div className={"emotion_list_wrapper"}>
          {emotionList.map((item) => (
            <EmotionItem
              onClick={() =>
                onChangeInput({
                  target: {
                    name: "emotionId",
                    value: item.emotionId,
                  },
                })
              }
              key={item.emotionId}
              {...item}
              isSelected={item.emotionId === input.emotionId}
            />
          ))}
        </div>
      </section>
      <section className={"content_section"}>
        <h4>오늘의 일기</h4>
        <textarea
          name={"content"}
          value={input.content}
          onChange={onChangeInput}
          placeholder={"오늘은 어떘나요?"}
        />
      </section>
      <section className={"button_section"}>
        <Button text={"취소하기"} onClick={() => nav(-1)} />
        <Button
          onClick={onSubmitButtonClick}
          text={"작성완료"}
          type={"POSITIVE"}
        />
      </section>
    </div>
  );
};

export default Editor;