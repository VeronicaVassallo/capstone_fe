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
		<div className="myBg-Keyper mysize">
			<div className="d-flex align-items-center bgKeyper pb-4 py-2">
				<h1>Backoffice</h1>
				<div className="px-4">
					<button className="myButton mx-2">
						<span className="myButton-content">
							<Link className="text-decoration-none text-light" to={"/home"}>
								Torna indietro
							</Link>
						</span>
					</button>
				</div>
				<ModalAddDay />
			</div>

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
