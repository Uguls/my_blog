import './App.css';
import Home from './components/Home';
import React from "react";
import Header from "./components/Header";
import {createGlobalStyle} from "styled-components";
import {Route, Routes} from "react-router-dom";
import Create from "./components/Create";
import Auth from "./components/Auth";
import Login from "./components/Login";

const GlobalStyle = createGlobalStyle`
* {padding: 0; margin: 0;}

a {text-decoration: none; color: #333};

ul,ol,li {list-style: none;}
`

function App() {
  return (
    <>
      <div className="App" >
        <GlobalStyle />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/login" element={<Login />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
