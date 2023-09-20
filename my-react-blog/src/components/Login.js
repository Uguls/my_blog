import React, {useState} from 'react';
import axios from "axios";
import Button from "react-bootstrap/Button";

const Auth = () => {
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

	const auth = () => {
		const {email, password, nick} = userinfo;
		axios.post('http://localhost:8081/auth/login', {
			email: email,
			password: password,
		}, {
			withCredentials: true
		}).then((res) => {
			if (res.status === 200) {
				alert('로그인이 완료되었습니다.');
				window.location ="/";
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
				<Button variant="secondary" onClick={()=>auth()}>로그인</Button>
			</div>
		</div>
	)
}

export default Auth;