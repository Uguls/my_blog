import React from "react";
import styled from "styled-components";

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

const Post = () => {
	return (
		<Postwrap>
			<Container>
				<Row>
					<div>
						<Title>제목</Title>
					</div>
					<div>
						<Content>내용</Content>
					</div>
				</Row>
			</Container>
		</Postwrap>
	);
}

export default Post;