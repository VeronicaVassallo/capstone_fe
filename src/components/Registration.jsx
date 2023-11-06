import { useState } from "react";
import { Form, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const Registration = () => {
	const [show, setShow] = useState(false);
	const [formData, setFormData] = useState({});
	const [fileAvatar, setFileAvatar] = useState(null);

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

	const convert = (stringValue) => {
		if (stringValue === "true") {
			return true;
		} else {
			return false;
		}
	};

	const onChangeSetFile = (e) => {
		setFileAvatar(e.target.files[0]);
	};

	const uploadFileAvatar = async (avatar) => {
		const fileData = new FormData();
		fileData.append("avatar", avatar);

		try {
			const response = await fetch(
				`${process.env.REACT_APP_SERVER_BASE_URL}/keepers/cloudUpload`,
				{
					method: "POST",
					body: fileData,
				}
			);
			return await response.json();
		} catch (error) {
			console.log(error, "Error during  uploadFileAvatar");
		}
	};

	const postFormData = async () => {
		if (fileAvatar) {
			try {
				let uploadAvatar = null;
				if (fileAvatar) {
					uploadAvatar = await uploadFileAvatar(fileAvatar);
				}
				const finalBody = {
					nameKeeper: formData.nameKeeper,
					surnameKeeper: formData.surnameKeeper,
					email: formData.email,
					password: formData.password,
					referent: formData.referent,
					english: formData.english,
					firePrevention: formData.firePrevention,
					firstAid: formData.firstAid,
					avatar: uploadAvatar.avatar,
				};
				const response = await fetch(
					`${process.env.REACT_APP_SERVER_BASE_URL}/keeper/create`,
					{
						headers: {
							"Content-Type": "application/json",
						},
						method: "POST",
						body: JSON.stringify(finalBody),
					}
				);
				alert("Registrazione inviata con successo!");
				window.location.reload();
			} catch (error) {
				console.log(error);
			}
		} else {
			console.error("Per favore seleziona almeno un file");
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
					<Form encType="multipart/form-data">
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
								onChange={(e) => {
									debugger;
									setFormData({
										...formData,
										referent: e.target.checked,
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
								onChange={(e) =>
									setFormData({
										...formData,
										english: e.target.checked,
									})
								}
								required
							/>
							<label> Inglese</label>
							<br />
							<input
								type="checkbox"
								name="firePrevention"
								onChange={(e) =>
									setFormData({
										...formData,
										firePrevention: e.target.checked,
									})
								}
								required
							/>
							<label> Anticendio</label>
							<br />
							<input
								type="checkbox"
								name="firstAid"
								onChange={(e) =>
									setFormData({
										...formData,
										firstAid: e.target.checked,
									})
								}
								required
							/>
							<label> Primo soccorso</label>

							<label>Avatar</label>
							<input type="file" name="avatar" onChange={onChangeSetFile} />
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
