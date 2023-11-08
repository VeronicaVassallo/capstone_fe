import React from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import ButtonBackoffice from "./ButtonBackoffice";
import { Link } from "react-router-dom";
import "../style.css";

const NavbarComponent = (prop) => {
	return (
		<Navbar expand="lg">
			<Container fluid className="bgKeyper">
				<div className="d-flex align-items-center my-2 mx-4">
					<div>
						<h3 className="myk">K</h3>
					</div>
					<div className="myEyper">
						<span>eyper</span>
					</div>
					<div className="keyTooth"></div>
				</div>

				<Navbar.Toggle aria-controls="navbarScroll" />
				<Navbar.Collapse id="navbarScroll">
					<Nav
						className="me-auto my-2 my-lg-0"
						style={{ maxHeight: "100px" }}
						navbarScroll
					>
						<Nav.Link></Nav.Link>
						<button className="myButton mt-2">
							<span className="myButton-content">
								<Link className="text-decoration-none text-light" to={"/"}>
									Torna al login
								</Link>
							</span>
						</button>
						{prop.referent ? <ButtonBackoffice /> : ""}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default NavbarComponent;
