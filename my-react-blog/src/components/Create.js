import React, {useState} from 'react';
import styled from 'styled-components';
import axios from "axios";

const Createwrap = styled.div``
const Container = styled.div`
    width: 1050px; 
    margin: 0 auto;
`;
const Row = styled.div``;

const Inputtitle = styled.input`
    display: block; 
    width: 100%; 
    box-sizing: border-box; 
    padding: 10px 20px; 
    margin-bottom: 20px; 
    border: none; 
    border-bottom: 1px solid #dbdbdb;
`
const Inputcontent = styled.textarea`
    display: block; 
    width: 100%; 
    min-height: 200px; 
    box-sizing: border-box; 
    padding: 10px 20px; 
    resize: none; 
    border: none;
`
const SubmitBtn = styled.button`
    display: block; 
    width: 200px; 
    height: 50px; 
    font-size: 16px; 
    font-weight: bold; 
    padding: 5px; 
    margin: 0 auto; 
    background: #f4f4f4; 
    border: 2px solid #dbdbdb;
`

const Create = () => {
	const [newpost, setNewpost] = useState({
		title: '',
		content: '',
		id: '123',
	});
	const getvalue = (e) => {
		const {name, value} = e.target;
		setNewpost({
			...newpost,
			[name]: value,
		});
		console.log(newpost);
	}

	const submit = () => {
		const {title, content} = newpost;
		axios.post('http://localhost:8081/posts/create', {
			title: title,
			content: content,
		}).then(() => {
			alert('글이 작성되었습니다.');
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

export default Create;
