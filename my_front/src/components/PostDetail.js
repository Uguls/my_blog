import React, {useEffect, useState} from "react";
import styled from "styled-components";
import axios from "axios";
import {useParams} from "react-router-dom";

const Postwrap = styled.div``
const Container = styled.div`
	width: 1050px;
	margin: 0 auto;
`
const Row = styled.div``

const Title = styled.p`
	padding: 10px 20px;
	margin-bottom: 20px;
	border-bottom: 1px solid #dbdbdb;
	`
const Content = styled.p`
	padding: 10px 20px;
	`

const PostDetail = () => {
	const {postId} = useParams();
	const [postDetail, setPostDetail] = useState([]);

	useEffect(() => {
		axios.get(`http://localhost:3000/posts/detail/${postId}`, {
			withCredentials: true
		})
			.then((res) => {
				setPostDetail(res.data);
				console.log(setPostDetail)
			})
			.catch(() => {
				console.log('게시글 세부 내용 불러오기 실패')
			});
	}, [postId]);
	return (
		<Postwrap>
			<Container>
				<Row>
					<div>
						<Title><h1>제목: {postDetail.title}</h1></Title>
					</div>
					<div>
						<Content>내용: {postDetail.content}</Content>
					</div>
				</Row>
			</Container>
		</Postwrap>
	);
}

export default PostDetail;