import React, {useState} from 'react';
import axios from "axios";
import Button from "react-bootstrap/Button";
import {useNavigate} from "react-router-dom";

const Login = () => {
	const navigate = useNavigate();
	const [userinfo, setuserinfo] = useState({
		email: '',
		password: '',
	});

	const getvalue = (e) => {
		const {name, value} = e.target;
		setuserinfo({
			...userinfo,
			[name]: value,
		});
	}

	const login = () => {
		const {email, password} = userinfo;
		axios.post('http://localhost:8080/api/auth/login', {
			email: email,
			password: password,
		},{
			withCredentials: true
		}).then((res) => {
			if (res.status === 200) {
				alert('로그인이 완료되었습니다.');
				setIsLoggedIn(true);
				navigate('/');
			} else {
				alert('로그인이 실패하였습니다.')
			}
		});
	};

	return (
		<div>
			<div>
				<input type='text' className="inputTitle" placeholder="Email" name='email' onChange={getvalue} />
			</div>
			<div>
				<input className="inputTitle" placeholder="password" name='password' onChange={getvalue} />
			</div>
			<div>
				<Button variant="secondary" onClick={()=>login()}>로그인</Button>
			</div>
		</div>
	)
}

export default Login;