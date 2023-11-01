import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Table from "react-bootstrap/Table";
import ModalAddKepeer from "../components/ModalAddKepeer";

const WorkshiftPage = () => {
	const { idDay } = useParams();
	const [dataWorkshifts, setDataWorkshifts] = useState([]);

	const getWorkshift = async () => {
		const response = await fetch(
			`${process.env.REACT_APP_SERVER_BASE_URL}/workshift/${idDay}`
		);

		const data = await response.json();
		setDataWorkshifts(data.workshift);
	};
	console.log("ciao:", dataWorkshifts);

	useEffect(() => {
		getWorkshift();
	}, [idDay]);
	return (
		<div>
			<h1>Workshift</h1>
			<p>id giorno: {idDay}</p>
			<p>data : {dataWorkshifts[0] && dataWorkshifts[0].day.singleDay} </p>
			<hr />

			<Table striped bordered hover>
				<thead>
					<tr>
						<th>#</th>
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
									<td></td>
									<td>{workshift.room.nameRoom}</td>
									<td>Otto</td>
									<td>{workshift.kepeer}</td>
									<td>
										<ModalAddKepeer />
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
