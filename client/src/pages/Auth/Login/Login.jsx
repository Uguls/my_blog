import React, { useState } from "react";
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

const Login = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`ID: ${id}, Password: ${password}`);
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
        {/*<ChakraLink as={RouterLink} to="/forgot-password" color={"blue.400"}>*/}
        {/*  비밀번호를 잊어버리셨나요?*/}
        {/*</ChakraLink>*/}
        <ChakraLink as={RouterLink} to="/register" color={"blue.400"}>
          회원가입
        </ChakraLink>
      </Stack>
    </Box>
  );
};

export default Login;
