import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Table from "react-bootstrap/Table";
import ModalAddKepeer from "../components/ModalAddKepeer";
import "../style.css";
import { FaFlagUsa, FaFireExtinguisher, FaFirstAid } from "react-icons/fa";
import { Link } from "react-router-dom";
import GeneratorWorkshif from "../components/GeneratorWorkshift";

const WorkshiftPage = () => {
	const { idDay } = useParams(); //id turno
	const [dataWorkshifts, setDataWorkshifts] = useState([]);

	const getWorkshift = async () => {
		const response = await fetch(
			`${process.env.REACT_APP_SERVER_BASE_URL}/workshift/${idDay}`
		);

		const data = await response.json();
		setDataWorkshifts(data.workshift);
	};

	useEffect(() => {
		getWorkshift();
	}, [idDay]);
	return (
		<div className="myBg-Keyper mysize bgKeyper">
			<div className="d-flex align-items-center flex-wrap bgKeyper">
				<div className="d-flex align-items-center my-2 mx-4">
					<div>
						<h3 className="myk">K</h3>
					</div>
					<div className="myEyper">
						<span>eyper</span>
					</div>
					<div className="keyTooth"></div>
				</div>
				<h1 className="mx-3">
					Data: {dataWorkshifts[0] && dataWorkshifts[0].day.singleDay}
				</h1>

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
						<GeneratorWorkshif />
					</div>
				</div>
			</div>
			<Table striped bordered hover className="myBorder-home">
				<thead>
					<tr>
						<th>Sala </th>
						<th>requisiti </th>
						<th>Custode</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{dataWorkshifts &&
						dataWorkshifts?.map((workshift) => {
							return (
								<tr key={workshift._id}>
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
		</div>
	);
};
export default WorkshiftPage;
