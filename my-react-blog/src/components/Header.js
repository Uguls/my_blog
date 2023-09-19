import React from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";

const Headerwrap = styled.div`
	height: 100px;
  margin: 50px 0px;
`
const Container = styled.div`
	width: 1050px; margin: 0 auto;
`
const Row = styled.div``

const Logo = styled.h1`line-height: 100px; display: inline-block;`
const Createlink = styled(Link)`margin-left: 20px;`
const Header = () => {
	return (
		<Headerwrap>
			<Container>
				<Row>
					<Logo>
						<Link to='/'>BLOG</Link>
					</Logo>
					<Createlink to='/create'>글쓰기</Createlink>
				</Row>
			</Container>
		</Headerwrap>
	);
}

export default Header;