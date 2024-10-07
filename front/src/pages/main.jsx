import React from "react";
import "../styles/Main/Main.css"

import Header from "../components/Main/Header";
import TechStack from "../components/Main/TechStack";
import Projects from "../components/Main/Projects";
import AboutMe from "../components/Main/AboutMe";

import { useNavigate } from "react-router-dom";

const Main = () => {
  const nav = useNavigate();

  return (
    <>
      <Header />
      <AboutMe />
      <TechStack />
      <Projects />
    </>
  );
};

export default Main;
