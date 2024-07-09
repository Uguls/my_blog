import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLogin, logout } from "./store/store"
import { jwtDecode } from 'jwt-decode';
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
          dispatch(logout())
        }
      } catch (error) {
        // axios는 400번대, 500번대 상태코드는 catch 블록으로 넘어감 따라서 토큰 만료와 같은 경우 서버에서 401상태코드를 반환하여 catch블록 실행
        try {
          // 토큰 재발급 시도
          const refreshResponse = await axiosInstance.get("/auth/token");
          if (refreshResponse.status === 200) {
            // 토큰이 성공적으로 재발급 되었을 경우 다시 검증 후 setLogin 디스패치 호출하여 로그인상태 설정
            const newTokenValidateReponse = await axiosInstance.get('/auth/validate-token');
            if (newTokenValidateReponse.status === 200) {
              const user = newTokenValidateReponse.data.user;
              const isAdmin = user.role === "admin" ? true : false;
              dispatch(setLogin(isAdmin));
            } else {
              throw new Error("토큰 발급 에러1")
            }
          } else {
            throw new Error("토큰 발급 에러2");
          }
        } catch (refreshError){
          dispatch(logout())
          console.error("토큰 발급 에러3");
        }
      }
    };

    checkAuth();
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path={"/"} element={<Main />} />
        <Route path={"/todo"} element={<Todo />} />
        <Route path={"/diary/*"} element={<DiaryRoutes />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/register"} element={<Register />} />
        <Route path="*" element={<Notfound />} />
        <Route path={"/editprofile"} element={<EditProfile/>} />
      </Routes>
    </div>
  );
}

export default App;