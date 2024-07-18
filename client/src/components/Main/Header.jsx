import React from "react";

const Header = () => {
	return (
		<>
			<section className={"intro"}>
				<div className={"intro__dark"}>
					<div className={"intro__type"}>
						<div><span aria-hidden={true}>😎</span> 억울한</div>
						<div>Uguls<span className={"underscore"}>_</span></div>
					</div>
				</div>
				<div className={"intro__tilt"}></div>
				<div className={"intro__tilt--flip"}></div>
			</section>
		</>
	);
}

export default Header