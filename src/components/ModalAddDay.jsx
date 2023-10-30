import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

function ModalAddDay() {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const [formData, setFormData] = useState("");
	const [roomsData, setroomsData] = useState([]);
	const [idDay, setIdDay] = useState("");

	const submitPostData = async () => {
		debugger;
		if (formData) {
			try {
				const response = await fetch(
					`${process.env.REACT_APP_SERVER_BASE_URL}/day/create`,
					{
						headers: {
							"Content-Type": "application/json",
						},
						method: "POST",
						body: JSON.stringify(formData),
					}
				);
				//await getIdDay();
				await sendAllRoomsToWorkshift();

				//Prendo tutte le postazioni
				//Foreach postazione -> chiamata post per creare turno senza keeper

				alert("Data aggiunta con successo");
				handleClose();
				window.location.reload();
			} catch (error) {
				console.log(error);
			}
		}
	};

	const getIdDay = async () => {
		debugger;
		const responceDay = await fetch(
			`${process.env.REACT_APP_SERVER_BASE_URL}/day/${formData.singleDay}`
		);
		const dataDay = await responceDay.json();
		setIdDay(dataDay.daySpecific[0]._id);
	};

	const sendAllRoomsToWorkshift = async () => {
		debugger;
		//get day
		const responceDay = await fetch(
			`${process.env.REACT_APP_SERVER_BASE_URL}/day/${formData.singleDay}`
		);
		const dataDay = await responceDay.json();
		setIdDay(dataDay.daySpecific[0]._id);

		//create workshift
		const res = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/rooms`);
		const data = await res.json();
		setroomsData(data.rooms);
		debugger;

		try {
			data.rooms.forEach(async (singleRoom) => {
				const postWorkshift = await fetch(
					`${process.env.REACT_APP_SERVER_BASE_URL}/workshift/create`,
					{
						headers: {
							"Content-Type": "application/json",
						},
						method: "POST",
						body: JSON.stringify({
							day: dataDay.daySpecific[0]._id,
							room: singleRoom._id,
							keeper: "",
						}),
					}
				);
				const res = await postWorkshift.json();
			});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<Button variant="primary" className="mx-5 my-2" onClick={handleShow}>
				+
			</Button>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Crea un nuovo turno</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					Scegli una data:
					<Form noValidate>
						<Row className="mb-3">
							<Form.Group bas={Col} md="4" controlId="validationCustom02">
								<Form.Control
									required
									type="date"
									placeholder=" 1 gennaio 2023"
									name="singleDay"
									onChange={(e) =>
										setFormData({
											...formData,
											singleDay: e.target.value,
										})
									}
								/>
							</Form.Group>
						</Row>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Chiudi
					</Button>
					<Button onClick={submitPostData} variant="primary">
						Aggiungi data
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default ModalAddDay;
