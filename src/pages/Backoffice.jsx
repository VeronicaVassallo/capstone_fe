import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allDays, getDaysFromApi } from "../reducers/dayReducers";
import CardDay from "../components/CardDay";
import { Row, Container } from "react-bootstrap";
import ModalAddDay from "../components/ModalAddDay";
const Backoffice = () => {
	let completeDays = useSelector(allDays);
	//const [dataDays, setDataDays] = useState(completeDays);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getDaysFromApi());
	}, []);

	return (
		<div>
			<div className="d-flex">
				<h1>Backoffice</h1>
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
