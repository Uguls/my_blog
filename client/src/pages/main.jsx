import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@chakra-ui/react";
import {logout} from "../store/store";
import axiosInstance from "../util/axiosInstance";

const Main = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.login);

  const handleLogout = async () => {
    try {
      await axiosInstance.post('/auth/logout');
      dispatch(logout());
      nav("/login");
    } catch (error) {
      console.error("로그아웃 중 문제가 발생했습니다.", error);
    }
  };

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
      {isAuthenticated ? (
        <Button onClick={handleLogout}>
          로그아웃
        </Button>
      ) : (
        <>
          <Button
            onClick={() => {
              nav("/login");
            }}
          >
            로그인
          </Button>
          <Button
            onClick={() => {
              nav("/register");
            }}
          >
            회원가입
          </Button>
        </>
      )}
    </>
  );
};

export default Main;
