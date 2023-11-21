import React, {useState} from 'react';
import Button from 'react-bootstrap/Button'
import styles from './Create.css'
import axios from "axios";

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
		axios.post('http://localhost:3000/api/posts/create', {
			title: title,
			content: content,
		}, {
			withCredentials: true
		}).then(() => {
			alert('글이 작성되었습니다.');
			window.location ="/";
		});
	};

	return (
				<div>
					<div>
						<input type='text' className="inputTitle" placeholder="제목을 입력해주세요" name='title' onChange={getvalue} />
					</div>
					<div>
						<input className="inputcontent" placeholder="내용을 입력해주세요" name='content' onChange={getvalue} />
					</div>
					<div>
						<Button variant="secondary" onClick={()=>submit()}>글작성</Button>
					</div>
				</div>
	)
}

export default Create;
