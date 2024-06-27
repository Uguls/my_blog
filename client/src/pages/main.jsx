import { useNavigate } from "react-router-dom";

const Main = () => {
  const nav = useNavigate();

  return (
    <>
      <button
        onClick={() => {
          nav("/todo");
        }}
      >
        TodoList
      </button>
      <button
        onClick={() => {
          nav("/diary");
        }}
      >
        Diary
      </button>
      <button
        onClick={() => {
          nav("/login");
        }}
      >
        로그인
      </button>
      <button
        onClick={() => {
          nav("/register");
        }}
      >
        회원가입
      </button>
    </>
  );
};

export default Main;
