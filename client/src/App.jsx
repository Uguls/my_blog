import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLogin, logout } from "./store/store";
import {jwtDecode} from 'jwt-decode';
import axiosInstance from "./util/axiosInstance";

// 컴포넌트 임포트
import Navbar from "./components/Navbar";
import DiaryRoutes from "./components/Diary/DiaryRoutes";
// 페이지 임포트
import Main from "./pages/main";
import Todo from "./pages/Todo/Todo";
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";
import Notfound from "./pages/Diary/Notfound";
import EditProfile from "./pages/EditProfile/EditProfile";
import Web3home from "./components/web3/Web3home";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axiosInstance.get('/auth/validate-token');
        if (response.status === 200) {
          const user = response.data.user;
          const isAdmin = user.role === "admin" ? true : false;
          dispatch(setLogin(isAdmin));
        } else {
          throw new Error("토큰 인증 실패");
        }
      } catch (error) {
        try {
          const refreshResponse = await axiosInstance.get("/auth/token");
          if (refreshResponse.status === 200) {
            const newTokenValidateReponse = await axiosInstance.get('/auth/validate-token');
            if (newTokenValidateReponse.status === 200) {
              const user = newTokenValidateReponse.data.user;
              const isAdmin = user.role === "admin" ? true : false;
              dispatch(setLogin(isAdmin));
            } else {
              throw new Error("토큰 발급 에러1");
            }
          } else {
            throw new Error("토큰 발급 에러2");
          }
        } catch (refreshError) {
          dispatch(logout());
          throw new Error("토큰 발급 에러3");
        }
      }
    };

    checkAuth();
  }, [dispatch]);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/diary/*" element={<DiaryRoutes />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/web3" element={<Web3home/>} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </div>
  );
}

export default App;
