import React from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import ButtonBackoffice from "./ButtonBackoffice";
import { Link } from "react-router-dom";

const NavbarComponent = (prop) => {
	return (
		<Navbar expand="lg" className="bg-body-tertiary">
			<Container fluid>
				<Navbar.Brand>Keyper</Navbar.Brand>
				<Navbar.Toggle aria-controls="navbarScroll" />
				<Navbar.Collapse id="navbarScroll">
					<Nav
						className="me-auto my-2 my-lg-0"
						style={{ maxHeight: "100px" }}
						navbarScroll
					>
						<Nav.Link>
							<Link
								className="text-decoration-none text-dark linkhover p-2"
								to={"/"}
							>
								Torna al login
							</Link>
						</Nav.Link>
						{prop.referent ? <ButtonBackoffice /> : ""}
					</Nav>
					<Form></Form>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default NavbarComponent;
