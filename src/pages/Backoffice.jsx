import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allDays, getDaysFromApi } from "../reducers/dayReducers";
import CardDay from "../components/CardDay";
import { Row, Container } from "react-bootstrap";
import ModalAddDay from "../components/ModalAddDay";
import { Link } from "react-router-dom";
const Backoffice = () => {
	let completeDays = useSelector(allDays);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getDaysFromApi());
	}, []);

	return (
		<div className="bgKeyper mysize">
			<div className="d-flex align-items-center">
				<h1>Backoffice</h1>
				<div className="px-4">
					<Link
						className="text-decoration-none text-dark linkhover p-2"
						to={"/home"}
					>
						Home
					</Link>
				</div>
				<ModalAddDay />
			</div>

			<hr />
			<Container>
				<Row>
					{completeDays &&
						completeDays.days &&
						completeDays.days?.map((day) => {
							return (
								<CardDay
									key={day._id}
									singleDay={day.singleDay}
									idDay={day._id}
								/>
							);
						})}
				</Row>
			</Container>
		</div>
	);
};

export default Backoffice;
