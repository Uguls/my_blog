import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./pages/main";
import Todo from "./pages/Todo/Todo";
import DiaryRoutes from "./components/Diary/DiaryRoutes";
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";
import Notfound from "./pages/Diary/Notfound";
import Navbar from "./components/Navbar";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLogin, logout } from "./store/store"
import { jwtDecode } from 'jwt-decode';
import axiosInstance from "./util/axiosInstance";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      console.log("Checking authentication...");
      try {
        const response = await axiosInstance.get('/auth/validate-token');
        console.log("Validation response:", response);

        if (response.status === 200) {
          const user = response.data.user;
          dispatch(setLogin({ id: user.id, email: user.email }, user.role === 'admin'));
        } else {
          dispatch(logout());
        }
      } catch (error) {
        console.error("Error during authentication check:", error);
        dispatch(logout());
      }
    };

    checkAuth();
  }, [dispatch]);

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
      </Routes>
    </div>
  );
}

export default App;