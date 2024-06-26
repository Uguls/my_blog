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
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const { isAuthenticated } = useSelector((state) => state.login);

  const nav = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      nav('/', {replace:true})
    }
  }, []);


  const handleSubmit = (event) => {
    event.preventDefault();

    if (password !== passwordCheck) {
      window.alert("비밀번호가 일치하지 않습니다.");
      setPassword("");
      setPasswordCheck("");
    }


  axios.post(`${import.meta.env.VITE_BACK_URL}/auth/join`, {
    nick: name,
    email: email,
    password: password,
  },{
    withCredentials: true,
  }).then(res => {
    if (res.data === '회원가입 완료') {
      window.alert('회원가입이 완료되었습니다!');
      nav("/login");
    } else {
      window.alert("회원가입에 실패하였습니다.")
    }
  }).catch((err)=>{
    console.error('Error:', err)
  })
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
          회원가입
        </Heading>
        <FormControl id="name">
          <FormLabel>Nick</FormLabel>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
        <FormControl id="email">
          <FormLabel>Email address</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <FormControl id="passwordCheck">
          <FormLabel>Password Check</FormLabel>
          <Input
            type="password"
            value={passwordCheck}
            onChange={(e) => setPasswordCheck(e.target.value)}
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
            회원가입
          </Button>
        </Stack>
        <ChakraLink as={RouterLink} to="/login" color={"blue.400"}>
          이미 계정이 있으신가요? 로그인
        </ChakraLink>
      </Stack>
    </Box>
  );
};

export default Register;
