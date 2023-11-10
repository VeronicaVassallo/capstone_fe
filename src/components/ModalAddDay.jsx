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

	const postDay = async () => {
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
				const data = await response.json();

				if (data.statusCode === 200) {
					alert("Data già esistente");
				}

				window.location.reload();
			} catch (error) {
				console.log(error);
				alert("Errore nella chiamata. Contattare l'assistenza");
			}
		}
	};

	return (
		<>
			<Button variant="primary" className="my-2" onClick={handleShow}>
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
					<Button onClick={postDay} variant="primary">
						Aggiungi data
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default ModalAddDay;
