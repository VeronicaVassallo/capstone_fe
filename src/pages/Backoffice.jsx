import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allDays, getDaysFromApi } from "../reducers/dayReducers";
import CardDay from "../components/CardDay";
import { Row, Container } from "react-bootstrap";
import ModalAddDay from "../components/ModalAddDay";
const Backoffice = () => {
	const [dataDays, setDataDays] = useState([]);
	const completeDays = useSelector(allDays); //allDays.days[array].propietadeloggetto
	const dispatch = useDispatch();

	console.log("giorni:", completeDays);

	useEffect(() => {
		dispatch(getDaysFromApi());
		setDataDays(completeDays.days);
	}, [dispatch, completeDays.days]);
	return (
		<div>
			<div className="d-flex">
				<h1>Backoffice</h1>
				<ModalAddDay />
			</div>

			<hr />
			<Container>
				<Row>
					{dataDays &&
						dataDays?.map((day) => {
							return <CardDay id={day._id} singleDay={day.singleDay} />;
						})}
				</Row>
			</Container>
		</div>
	);
};

export default Backoffice;
