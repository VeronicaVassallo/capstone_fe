import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

const ButtonBackoffice = () => {
	return (
		<Button variant="outline-danger">
			<Link className="text-decoration-none" to={"/backoffice"}>
				Backoffice
			</Link>
		</Button>
	);
};
export default ButtonBackoffice;
