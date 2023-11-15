import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import ButtonBackoffice from "./ButtonBackoffice";
import { Link } from "react-router-dom";
import ModalAddFileAvatar from "./ModalAddFileAvatar";
import useSession from "../useSession";
import "../style.css";

const NavbarComponent = (prop) => {
	const session = useSession();
	const keeperAvatar = session.avatar;
	return (
		<Container fluid>
			<Row>
				<Navbar expand="lg">
					<Container fluid className="bgKeyper">
						<div className="d-flex align-items-center my-2 mx-2">
							<div>
								<h3 className="myk">K</h3>
							</div>
							<div className="myEyper">
								<span>eyper</span>
							</div>
							<div className="keyTooth"></div>
						</div>

						<ModalAddFileAvatar avatar={keeperAvatar} />

						<Navbar.Toggle aria-controls="navbarScroll" />
						<Navbar.Collapse id="navbarScroll">
							<Nav
								className="me-auto my-lg-0"
								style={{ maxHeight: "100px" }}
								navbarScroll
							>
								<button className="myButton my-2">
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
