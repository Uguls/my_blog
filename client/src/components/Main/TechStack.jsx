import React from "react";

const TechStack = () => {
	return (
		<main>
			<section id="techstack" className="tech_stack">
				<header className="section__header">
					<strong className="section__title">
						Tech Stack
					</strong>
				</header>
				<div className={"section__type"}>
					<h1 className="section__type--Main">
						<h1 className={"section__type--title"}>
							Used as the main
						</h1>
						<h2 className={"section__type--content"}>
							React, Node js
						</h2>
					</h1>

					<h1 className="section__type--Sub">
						<h1 className={"section__type--title"}>
							Used as the Sub
						</h1>
						<h2 className={"section__type--content"}>
							React, Node js
						</h2>
					</h1>
				</div>
				<section className={"section__type--Once_used"}>
					<h1 className={"section__type--title"}>
						Once I've used
					</h1>
					<h2 className={"section__type--content"}>
						React, Node js
					</h2>
				</section>

			</section>
		</main>
	)
}

export default TechStack