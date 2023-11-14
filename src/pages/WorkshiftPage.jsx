import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Table from "react-bootstrap/Table";
import ModalAddKepeer from "../components/ModalAddKepeer";
import "../style.css";
import { FaFlagUsa, FaFireExtinguisher, FaFirstAid } from "react-icons/fa";
import { Link } from "react-router-dom";
import GeneratorWorkshif from "../components/GeneratorWorkshift";
import { Container, Row, Col } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Spinner from "../components/Spinner";

const WorkshiftPage = () => {
	const { idDay } = useParams(); //id turno
	const [dataWorkshifts, setDataWorkshifts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const getWorkshift = async () => {
		const response = await fetch(
			`${process.env.REACT_APP_SERVER_BASE_URL}/workshift/${idDay}`
		);

		const data = await response.json();
		setDataWorkshifts(data.workshift);
		setIsLoading(false);
	};

	useEffect(() => {
		getWorkshift();
	}, [idDay]);
	return (
		<Container fluid className="myBg-Keyper bgKeyper m-0">
			<Row>
				<Navbar expand="lg" className="bg-body-tertiary">
					<Container fluid>
						<Navbar.Brand>
							<div className="d-flex align-items-center my-2 ">
								<div>
									<h3 className="myk">K</h3>
								</div>
								<div className="myEyper" style={{ left: "-0.7em" }}>
									<span className="position-relative" style={{ top: "-0.2em" }}>
										eyper
									</span>
								</div>
								<div className="keyTooth" style={{ left: "-1.9em" }}></div>
							</div>
						</Navbar.Brand>
						<Navbar.Toggle aria-controls="navbarScroll" />
						<Navbar.Collapse id="navbarScroll">
							<Nav
								className="me-auto my-2 my-lg-0"
								style={{ maxHeight: "100px" }}
								navbarScroll
							>
								<div className=" d-flex align-items-center ">
									<div>
										<button className="myButton mx-2">
											<span className="myButton-content">
												<Link
													className="text-decoration-none text-light"
													to={"/backoffice"}
												>
													Torna indietro
												</Link>
											</span>
										</button>
									</div>
									<div>
										<GeneratorWorkshif idDay={idDay} />
									</div>
								</div>
							</Nav>
						</Navbar.Collapse>
					</Container>
				</Navbar>

				<div className=" bgKeyper">
					<h1 className="mx-3">
						Data: {dataWorkshifts[0] && dataWorkshifts[0].day.singleDay}
					</h1>
				</div>
			</Row>
			<Row>
				{isLoading && <Spinner />}
				<Table striped bordered hover className="p-0 m-0">
					<thead>
						<tr>
							<th scope="col">Sala </th>
							<th scope="col">requisiti </th>
							<th scope="col">Custode</th>
							<th scope="col"></th>
						</tr>
					</thead>
					<tbody>
						{dataWorkshifts &&
							dataWorkshifts?.map((workshift) => {
								return (
									<tr scope="row" key={workshift._id}>
										<td>{workshift.room.nameRoom}</td>
										<td>
											{workshift.room.english ? <FaFlagUsa /> : ""}{" "}
											{workshift.room.firePrevention ? (
												<FaFireExtinguisher />
											) : (
												""
											)}{" "}
											{workshift.room.firstAid ? <FaFirstAid /> : ""}
										</td>
										<td>
											<p>
												{workshift.keeper && workshift.keeper.nameKeeper}{" "}
												{workshift.keeper && workshift.keeper.surnameKeeper}{" "}
											</p>
										</td>
										<td>
											<ModalAddKepeer
												idWorkshift={workshift._id}
												idRoom={workshift.room._id}
												idDay={idDay}
											/>
										</td>
									</tr>
								);
							})}
					</tbody>
				</Table>
			</Row>
		</Container>
	);
};
export default WorkshiftPage;
