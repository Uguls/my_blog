import "./Editor.css";
import EmotionItem from "./EmotionItem.jsx";
import Button from "./Button.jsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const emotionList = [
  {
    emotionId: 1,
    emotionName: "완전 좋음",
  },
  {
    emotionId: 2,
    emotionName: "좋음",
  },
  {
    emotionId: 3,
    emotionName: "그럭저럭",
  },
  {
    emotionId: 4,
    emotionName: "나쁨",
  },
  {
    emotionId: 5,
    emotionName: "끔찍함",
  },
];

const getStringedDate = (targetDate) => {
  // 날짜 -> String(YY-MM-DD)
  let year = targetDate.getFullYear();
  let month = targetDate.getMonth() + 1;
  let date = targetDate.getDate();

  if (month < 10) {
    month = `0${month}`;
  }
  if (date < 10) {
    date = `0${date}`;
  }

  return `${year}-${month}-${date}`;
};

// new 페이지 컴포넌트에서는 Create함수를 받고
// edit 페이지 컴포넌트에서는 update함수를 받게 하기 위해
// Editor 컴포넌트는 new, Edit 에서 공통으로 사용하는 컴포넌트 이기 때문에
// 그렇게 하지 않고 Create 나 update함수를 고정적으로 받게 되면 다른 페이지에서 사용할때
// 곤란한 상황이 생길 수 있다
// ex) Create함수로 받게 되면 Edit 페이지에서는 update를 해야하는데 create를 하게 됨
const Editor = ({ initData, onSubmit }) => {
  // 사용자가 입력한 날짜, emotionId, content를 state로 저장
  const [input, setInput] = useState({
    createdDate: new Date(),
    emotionId: 3,
    content: "",
  });

  const nav = useNavigate();

  useEffect(() => {
    if (initData) {
      setInput({
        ...initData,
        createdDate: new Date(Number(initData.createdDate)),
        // Edit컴포넌트에서 timestamp형식으로 createdDate객체를 저장하기때문에 new Date로 바꿔줘야함,
      });
    }
  }, [initData]);

  const onChangeInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "createdDate") {
      value = new Date(value);
    }

    setInput({
      ...input,
      [name]: value,
    });
  };

  // onSubmitButtonClick함수는 New.jsx컴포넌트로 부터 props로 전달된 함수 onSubmit을 호출
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
          value={getStringedDate(input.createdDate)}
          type={"date"}
        />
      </section>
      <section className={"emotion_section"}>
        <h4>오늘의 감정</h4>
        <div className={"emotion_list_wrapper"}>
          {emotionList.map((item) => (
            <EmotionItem // 컴포넌트이기 때문에 이벤트 객체가 자동으로 전달 X
              // 별도의 이벤트 객체 생성
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
        {/*정리*/}
        {/*버튼을 클릭하면 onSubmitButtonClick함수가 호출됨*/}
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
