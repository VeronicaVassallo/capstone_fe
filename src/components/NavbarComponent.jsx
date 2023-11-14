import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import ButtonBackoffice from "./ButtonBackoffice";
import { Link } from "react-router-dom";
import "../style.css";

const NavbarComponent = (prop) => {
	return (
		<Container fluid>
			<Row>
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
								className="me-auto my-lg-0"
								style={{ maxHeight: "100px" }}
								navbarScroll
							>
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
			</Row>
		</Container>
	);
};

export default NavbarComponent;
