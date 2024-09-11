import "./App.css";
import {BrowserRouter as Router, Route, Routes, useLocation} from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {jwtDecode} from 'jwt-decode';
import ReactGA from 'react-ga4'

// 컴포넌트 임포트
import Navbar from "./components/Navbar";
import DiaryRoutes from "./components/Diary/DiaryRoutes";

// 페이지 임포트
import Main from "./pages/main";
import Todo from "./pages/Todo/Todo";
import Notfound from "./pages/Diary/Notfound";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/diary/*" element={<DiaryRoutes />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </div>
  );
}

export default App;
