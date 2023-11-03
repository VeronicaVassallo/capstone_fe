import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Table from "react-bootstrap/Table";
import ModalAddKepeer from "../components/ModalAddKepeer";
import "../style.css";
import { FaFlagUsa, FaFireExtinguisher, FaFirstAid } from "react-icons/fa";

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
		<div>
			<div className="bgKeyper p-4">
				<h1>Data : {dataWorkshifts[0] && dataWorkshifts[0].day.singleDay}</h1>
				<p> </p>
			</div>

			<Table striped bordered hover className="border-dark">
				<thead>
					<tr>
						<th>Sala </th>
						<th>requisiti </th>
						<th>kepeer</th>
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
