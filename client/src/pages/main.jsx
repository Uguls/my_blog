import React from "react";
import "../styles/Main/Main.css"

import Header from "../components/Main/Header";
import TechStack from "../components/Main/TechStack";
import Projects from "../components/Main/Projects";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@chakra-ui/react";
import {logout} from "../store/store";
import axiosInstance from "../util/axiosInstance";

const Main = () => {
  const nav = useNavigate();

  return (
    <>
      <Header />
      <TechStack />
      <Projects />
    </>
  );
};

export default Main;
