import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Table from "react-bootstrap/Table";
import ModalAddKepeer from "../components/ModalAddKepeer";
import "../style.css";
import { FaFlagUsa, FaFireExtinguisher, FaFirstAid } from "react-icons/fa";
import { Link } from "react-router-dom";

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
		<div className="bgKeyper mysize">
			<div className="d-flex align-items-center flex-wrap">
				<div className="d-flex align-items-center my-2 mx-4">
					<div>
						<h3 className="myk">K</h3>
					</div>
					<div className="myEyper">
						<span>eyper</span>
					</div>
					<div className="keyTooth"></div>
				</div>
				<h1>
					Data turno: {dataWorkshifts[0] && dataWorkshifts[0].day.singleDay}
				</h1>

				<div>
					<div>
						<p>
							<Link
								className="text-decoration-none text-dark linkhover p-2 mx-5"
								to={"/backoffice"}
							>
								Torna indietro
							</Link>{" "}
						</p>
					</div>
				</div>
			</div>
			<hr />
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
