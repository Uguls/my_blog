import './App.css';
import Home from './components/Home';
import React, {useState} from "react";
import Header from "./components/Header";
import {createGlobalStyle} from "styled-components";
import {Route, Routes} from "react-router-dom";
import Create from "./components/Create";
import Auth from "./components/Auth";
import Login from "./components/Login";
import PostDetail from "./components/PostDetail";

const GlobalStyle = createGlobalStyle`
* {padding: 0; margin: 0;}

a {text-decoration: none; color: #333};

ul,ol,li {list-style: none;}
`

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 상태 생성

  return (
    <>
      <div className="App" >
        <GlobalStyle />
        <Header isLoggedIn={isLoggedIn} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/post/:postId" element={<PostDetail />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
