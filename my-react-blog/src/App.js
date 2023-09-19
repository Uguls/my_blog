import './App.css';
import Home from './components/Home';
import React from "react";
import Header from "./components/Header";
import {createGlobalStyle} from "styled-components";
import {Route, Routes} from "react-router-dom";
import Create from "./components/Create";

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
        </Routes>
      </div>
    </>
  );
}

export default App;
