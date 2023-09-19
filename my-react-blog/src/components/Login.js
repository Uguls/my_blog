import React, {useState} from 'react';
import styled from 'styled-components';
import axios from "axios";

const Login = () => {
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
		console.log(newpost);
	}

	const submit = () => {
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
		<Createwrap>
			<Container>
				<Row>
					<div>
						<Inputtitle type='text' placeholder="제목을 입력해주세요" name='title' onChange={getvalue} />
					</div>
					<div>
						<Inputcontent placeholder="내용을 입력해주세요" name='content' onChange={getvalue} />
					</div>
					<div>
						<SubmitBtn className="create" onClick={()=>submit()}>글작성</SubmitBtn>
					</div>
				</Row>
			</Container>
		</Createwrap>
	)
}

export default Login;