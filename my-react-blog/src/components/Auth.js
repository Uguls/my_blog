import React, {useState} from 'react';
import axios from "axios";
import Button from "react-bootstrap/Button";

const Auth = () => {
	const [userinfo, setuserinfo] = useState({
		email: '',
		password: '',
		nick: '',
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
		axios.post('http://localhost:8081/auth/join', {
			email: email,
			password: password,
			nick: nick,
		}).then((res) => {
			alert('회원가입이 완료되었습니다.');
		});
	};

	return (
		<div>
			<div>
				<input type='text' className="inputTitle" placeholder="Email" name='title' onChange={getvalue} />
			</div>
			<div>
				<input className="inputTitle" placeholder="nickname" name='content' onChange={getvalue} />
			</div>
			<div>
				<input className="inputTitle" placeholder="password" name='content' onChange={getvalue} />
			</div>
			<div>
				<Button variant="secondary" onClick={()=>auth()}>회원가입</Button>
			</div>
		</div>
	)
}

export default Auth;