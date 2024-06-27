import Button from "./Button.jsx";
import "./DiaryList.css";
import DiaryItem from "./DiaryItem.jsx";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const DiaryList = ({ data }) => {
  const nav = useNavigate();
  const [sortType, setSortType] = useState("latest");

  const onChangeSortType = (e) => {
    setSortType(e.target.value);
  };

  const getSortedData = () => {
    // toSorted, sort함수는 인자로 정렬 기준을 나타내는 콜백함수를 받는다.
    // 이 대소비교를 위한 함수에는 2개의 인자가 넘어오면 다음과 같은 규칙을 따른다.
    // 1. 첫 번째 인자가 두 번째 인자보다 작으면 음수를 반환
    // 2. 첫 번째 인자가 두 번째 인자보다 크면 양수를 반환
    // 3. 첫번째 인자가 두 번째 인자와 같으면 0을 반환
    return data.toSorted((a, b) => {
      if (sortType === "oldest") {
        // 오름차순으로 정렬하기 위해 첫번째인자(a)에서 두번째 인자(b)를 뺌
        return Number(a.createdDate) - Number(b.createdDate);
      } else {
        // 내림차 순으로 정렬하기 위해 두번째인자(b)에서 첫번째 인자(a)를 뺌
        return Number(b.createdDate) - Number(a.createdDate);
      }
    });
  };

  // 컴포넌트가 다시 렌더링 될 때 마다 getSortedData 호출
  const sortedData = getSortedData();

  return (
    <div className={"DiaryList"}>
      <div className={"menu_bar"}>
        <select onChange={onChangeSortType}>
          <option value={"latest"}>최신순</option>
          <option value={"oldest"}>오래된 순</option>
        </select>
        <Button
          onClick={() => nav("/diary/new")}
          text={"새 일기 쓰기"}
          type={"POSITIVE"}
        />
      </div>
      <div className={"list_wrapper"}>
        {/*map은 배열의 각 요소에 대해 주어진 함수를 호출하고, 그 결과로 새로운 배열을 생성*/}
        {/*sortedData 배열의 각 요소(item)에 대해 DiaryItem 컴포넌트를 생성하는 함수를 호출*/}
        {/*item을 인자로 바아 Diaryitem 컴포넌트를 반환한다.*/}
        {sortedData.map((item) => (
          <DiaryItem key={item.id} {...item} /> // key 반드시 필요 안그럼 에러남
        ))}
      </div>
    </div>
  );
};

export default DiaryList;
