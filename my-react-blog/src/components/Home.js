import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const Homewrap = styled.div``
const Container = styled.div`width: 1050px; margin: 0 auto;`
const Row = styled.div``

const Postli = styled.li`padding: 5px 10px; border-bottom: 1px solid #dbdbdb;`

const Home = () => {
	const [postlist, setPostlist] = useState([]);
	useEffect(() => {
		axios.get('/posts/lists', {
			withCredentials: true
		})
			.then((res) => {
				setPostlist(postlist.concat(res.data.posts));
				console.log(setPostlist)
			})
			.catch(() => {
				console.log('글 목록 불러오기 실패')
		});
}, []);

	return (
		<div className={'Home'}>
			<Homewrap>
				<Container>
					<Row>
						<ul>
							{postlist.map(post => (
								<Postli key={post.id}>
									<Link to={`/post/${post.id}`}>{post.title}</Link>
								</Postli>
							))}
						</ul>
					</Row>
				</Container>
			</Homewrap>
		</div>
	);
}

export default Home;