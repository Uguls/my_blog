import React, {useEffect, useState} from 'react';
import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Input,
	Stack,
	Heading,
	useToast,
	Container,
} from '@chakra-ui/react';
import axiosInstance from "../../util/axiosInstance";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const EditProfile = () => {
	const {isAuthenticated} = useSelector((state) => state.login);
	const nav = useNavigate()
	const [formData, setFormData] = useState({
		username: '',
		email: '',
	});
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (!isAuthenticated) {
			nav("/", {replace: true})
		}
	}, []);

	useEffect(() => {
		const userInfo = async () => {
			try {
				const res = await axiosInstance.get("/auth/userinfo");
				if (res.status === 200) {
					setFormData(() => ({
						username: res.data.nick,
						email: res.data.email
					}));
					setIsLoading(false);
				}
			} catch (error) {
				console.error("Error fetching user info:", error);
			}
		};

		userInfo();
	}, []);

	const toast = useToast();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		toast({
			title: 'Profile updated.',
			description: "프로필이 수정되었습니다.",
			status: 'success',
			duration: 1000,
			isClosable: true,
		});
	};

	if (isLoading) {
		<div>Loading...</div>
	}

	return (
		<Container maxW="md" centerContent>
			<Box p={8} mt={8} borderWidth={1} borderRadius="lg" w="100%">
				<Heading as="h2" size="xl" mb={6} textAlign="center">
					Edit Profile
				</Heading>
				<form onSubmit={handleSubmit}>
					<Stack spacing={4}>
						<FormControl id="username">
							<FormLabel>Username</FormLabel>
							<Input
								type="text"
								name="username"
								value={formData.username}
								onChange={handleChange}
							/>
						</FormControl>
						<FormControl id="email">
							<FormLabel>Email</FormLabel>
							<Input
								type="text"
								name="email"
								value={formData.email}
								readOnly={true}
								bg="gray.100"
								cursor="not-allowed"
							/>
						</FormControl>
						<Button type="submit" colorScheme="teal" size="lg" mt={4}>
							수정
						</Button>
						<Button type="submit" colorScheme="red" size="lg" mt={4}>
							회원탈퇴
						</Button>
					</Stack>
				</form>
			</Box>
		</Container>
	);
};

export default EditProfile;