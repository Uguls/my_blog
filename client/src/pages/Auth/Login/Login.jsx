import React, {useEffect, useState} from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Stack,
  Link as ChakraLink,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import axiosInstance from "../../../util/axiosInstance";
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setLogin} from "../../../store/store";

const Login = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated } = useSelector((state) => state.login);
  const nav = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      nav('/',{replace:true})
    }
  }, []);


  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axiosInstance.post('/auth/login', {
        email: id,
        password: password
      });
      if (response.status === 200) {
        const user = response.data.user;
        const isAdmin = user.role === "admin";
        dispatch(setLogin(user, isAdmin));
        nav("/");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          window.alert("로그인에 실패하였습니다. 이메일 또는 비밀번호를 확인하세요.");
        } else {
          window.alert(`로그인에 실패하였습니다. 상태 코드: ${error.response.status}`);
        }
      } else {
        window.alert("로그인 중 문제가 발생했습니다. 다시 시도해주세요.");
      }
    }
  };

  return (
    <Box
      rounded={"lg"}
      bg={useColorModeValue("white", "gray.700")}
      boxShadow={"lg"}
      p={8}
      minW={"lg"}
    >
      <Stack spacing={4}>
        <Heading
          lineHeight={1.1}
          fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
        >
          로그인
        </Heading>
        <FormControl id="email">
          <FormLabel>Email address</FormLabel>
          <Input
            type="email"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </FormControl>
        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Stack spacing={10}>
          <Button
            bg={"blue.400"}
            color={"white"}
            _hover={{
              bg: "blue.500",
            }}
            onClick={handleSubmit}
          >
            로그인
          </Button>
        </Stack>
        <ChakraLink as={RouterLink} to="/register" color={"blue.400"}>
          회원가입
        </ChakraLink>
      </Stack>
    </Box>
  );
};

export default Login;
