import { useState } from "react";
import { Form, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const Registration = () => {
	const [show, setShow] = useState(false);
	const [formData, setFormData] = useState({});

	const handleClose = () => setShow(false);
	const handleShow = () => {
		setFormData({
			referent: false,
			english: false,
			firePrevention: false,
			firstAid: false,
		});

		setShow(true);
	};

	const postFormData = async () => {
		debugger;

		try {
			const response = await fetch(
				`${process.env.REACT_APP_SERVER_BASE_URL}/keeper/create`,
				{
					headers: {
						"Content-Type": "application/json",
					},
					method: "POST",
					body: JSON.stringify(formData),
				}
			);
			alert("Registrazione inviata con successo!");
			window.location.reload();
		} catch (error) {
			console.log(error);
		}
	};

	const convert = (stringValue) => {
		if (stringValue === "true") {
			return true;
		} else {
			return false;
		}
	};

	return (
		<>
			<Button variant="danger" onClick={handleShow}>
				Registrati
			</Button>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Registati</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group as={Col} md="4">
							<label>Nome:</label>
							<input
								type="text"
								name="nameKeeper"
								onChange={(e) =>
									setFormData({
										...formData,
										nameKeeper: e.target.value,
									})
								}
								required
							/>
							<label>Cognome:</label>
							<input
								type="text"
								name="surnameKeeper"
								onChange={(e) =>
									setFormData({
										...formData,
										surnameKeeper: e.target.value,
									})
								}
								required
							/>
							<label>Email:</label>
							<input
								type="email"
								name="email"
								onChange={(e) =>
									setFormData({
										...formData,
										email: e.target.value,
									})
								}
								required
							/>
							<label>Password:</label>
							<input
								type="password"
								name="password"
								onChange={(e) =>
									setFormData({
										...formData,
										password: e.target.value,
									})
								}
								required
							/>
							<br />
							<br />
							<p>Sei il referente?</p>
							<input
								type="checkbox"
								name="referent"
								value={true}
								onChange={(e) => {
									setFormData({
										...formData,
										referent: convert(e.target.value),
									});
								}}
								required
							/>
							<label> Si</label>
							<br />
							<p>Competenze:</p>
							<input
								type="checkbox"
								name="english"
								value={true}
								onChange={(e) =>
									setFormData({
										...formData,
										english: convert(e.target.value),
									})
								}
								required
							/>
							<label> Inglese</label>
							<br />
							<input
								type="checkbox"
								name="firePrevention"
								value={true}
								onChange={(e) =>
									setFormData({
										...formData,
										firePrevention: convert(e.target.value),
									})
								}
								required
							/>
							<label> Anticendio</label>
							<br />
							<input
								type="checkbox"
								name="firstAid"
								value={true}
								onChange={(e) =>
									setFormData({
										...formData,
										firstAid: convert(e.target.value),
									})
								}
								required
							/>
							<label> Primo soccorso</label>

							<label>Avatar</label>
							<input
								type="text"
								name="avatar"
								onChange={(e) =>
									setFormData({
										...formData,
										avatar: e.target.value,
									})
								}
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Chiudi
					</Button>
					<Button variant="primary" onClick={postFormData}>
						Salva
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default Registration;
