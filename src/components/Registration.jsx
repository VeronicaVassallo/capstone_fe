import { useState } from "react";
import { Form, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Spinner from "./Spinner";
import "../style.css";

const Registration = () => {
	const [show, setShow] = useState(false);
	const [formData, setFormData] = useState({});
	const [fileAvatar, setFileAvatar] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

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
			alert(
				"Errore durante l'upload del file, riprovare o chiamare  l'assistenza"
			);
		}
	};

	const postFormData = async () => {
		if (fileAvatar) {
			setIsLoading(true);
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
				setIsLoading(false);
				const data = await response.json();
				if (data.statusCode === 200) {
					alert("Email già esistente, scelierne un'altra.");
				}

				alert("Registrazione completata con successo!");
				window.location.reload();
			} catch (error) {
				console.error(`Registration error:`, error);
				alert(
					"Errore durante l'operazione, riprovare o chiamare  l'assistenza"
				);
			}
		} else {
			console.error("Per favore seleziona almeno un file");
			alert("Per favore seleziona almeno un file");
		}
	};

	return (
		<>
			<Button variant="danger" onClick={handleShow}>
				Registrati
			</Button>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton className="bgKeyper">
					<Modal.Title>Registrati</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{isLoading && <Spinner />}
					<Form encType="multipart/form-data">
						<Form.Group as={Col} md="4">
							<div className="d-flex flex-column">
								<label>Nome: </label>
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
							</div>
							<div className="d-flex flex-column">
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
							</div>
							<div className="d-flex flex-column">
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
							</div>
							<div className="d-flex flex-column">
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
							</div>

							<br />
							<br />
							<p>Sei il referente?</p>
							<input
								type="checkbox"
								name="referent"
								onChange={(e) => {
									setFormData({
										...formData,
										referent: e.target.checked,
									});
								}}
								required
							/>
							<label> Si</label>
							<hr />
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
							<hr />
							<label>Scegli il tuo Avatar:</label>
							<input
								type="file"
								name="avatar"
								onChange={onChangeSetFile}
								required
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
