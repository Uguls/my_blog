import React, {useState} from 'react';
import Button from 'react-bootstrap/Button'
import axios from "axios";

const Create = () => {
	const [newpost, setNewpost] = useState({
		title: '',
		content: '',
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
		
		// 제목이나 내용이 비어있는지 확인
		if (!title.trim() || !content.trim()) {
			alert('제목과 내용을 입력해주세요.');
			return;
		}

		axios.post('http://localhost:8080/api/posts/create', {
			title: title,
			content: content,
		}, {
			withCredentials: true
		}).then((res) => {
			if (res.status === 200){
				alert('글이 작성되었습니다.');
				window.location ="/";
			}
		}).catch(error => {
			console.log(error);
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
