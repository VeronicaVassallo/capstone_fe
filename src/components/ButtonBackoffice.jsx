import React from "react";
import { Link } from "react-router-dom";

const ButtonBackoffice = () => {
	return (
		<button class="myButton m-2">
			<span class="myButton-content">
				<Link className="text-decoration-none text-light" to={"/backoffice"}>
					Backoffice
				</Link>
			</span>
		</button>
	);
};
export default ButtonBackoffice;
