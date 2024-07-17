import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import axiosInstance from "../util/axiosInstance";
import {logout} from "../store/store";

const Links = ["Todo", "Diary"];

const NavLink = ({ children }) => (
  <ChakraLink
    as={RouterLink}
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    to={`${children.toLowerCase()}`}
  >
    {children}
  </ChakraLink>
);

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const nav = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.login);

  const handleLogout = async () => {
    try {
      await axiosInstance.post('/auth/logout')
      window.alert("로그아웃을 하시겠습니까?")
      dispatch(logout())
      nav("/",{replace:true})
    } catch (error){
      console.error("로그아웃 중 문제가 발생했습니다.", error)
    }
  };


  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box>
              <ChakraLink as={RouterLink} to={"/"}>
                Uguls' Blog
              </ChakraLink>
            </Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar size={"sm"} src={"../assets/person.jpg"} />
              </MenuButton>
              <MenuList>
                {isAuthenticated ? (
                  <MenuItem onClick={()=>nav("/editprofile")}>회원정보 수정</MenuItem>
                ) : (<></>)
                }
                <MenuDivider />
                {isAuthenticated ? (
                  <MenuItem onClick={handleLogout}>로그아웃</MenuItem>
                ) : (
                  <>
                    <MenuItem onClick={()=>nav("/login")}>로그인 / 회원가입</MenuItem>
                  </>
                )}
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>

      {/*<Box p={4}>Main Content Here</Box>*/}
    </>
  );
}
