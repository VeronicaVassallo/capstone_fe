import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/Col";
import useSession from "../useSession";
import Spinner from "./Spinner";
import "../style.css";

const ModalAddFileAvatar = (prop) => {
	const session = useSession();
	const idkeeper = session._id;
	const [show, setShow] = useState(false);
	const [file, setfile] = useState(null);
	const [fileAvatar, setFileAvatar] = useState(session.avatar);
	const [isLoading, setIsLoading] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const onChageSetFile = (e) => {
		setfile(e.target.files[0]);
	};

	const uploadFile = async (dataFile) => {
		const fileData = new FormData();
		fileData.append("avatar", dataFile);

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

	const OnSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);

		if (file) {
			try {
				const uploadAvatar = await uploadFile(file);
				console.log(uploadAvatar);
				let finalBody = {
					avatar: uploadAvatar.avatar,
				};
				const response = await fetch(
					`${process.env.REACT_APP_SERVER_BASE_URL}/keeper/modifyavatar/${idkeeper}`,
					{
						headers: {
							"Content-Type": "application/json",
						},
						method: "PATCH",
						body: JSON.stringify(finalBody),
					}
				);
				setIsLoading(false);
				alert("Modifica effetuata! Sarai reinderizzato alla pagina di login.");
				window.location.href = "/";
				return response.json();
			} catch (error) {
				console.error(`ModalAddFileAvatar error:`, error);
				alert(
					"Errore durante l'operazione, riprovare o chiamare  l'assistenza"
				);
			}
		} else {
			console.log("Seleziona almeno un file");
		}
	};

	return (
		<>
			<div
				className="myAvatar mx-4 myAvatarPointer myCursor"
				onClick={handleShow}
			>
				<img className="myImgAvatar" src={fileAvatar} alt="img_avatar" />
			</div>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton className="bgKeyper">
					<Modal.Title>Modifica Avatar</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{isLoading && <Spinner />}
					<Form encType="multipart/form-data" onSubmit={OnSubmit}>
						<Row className="mb-3">
							<Form.Group as={Col} md="4" controlId="validationCustom01">
								<Form.Label>Avatar :</Form.Label>
								<Form.Control
									type="file"
									name="avatar"
									onChange={onChageSetFile}
									required
								/>
							</Form.Group>
						</Row>
						<Button type="submit">Salva</Button>
					</Form>
				</Modal.Body>
			</Modal>
		</>
	);
};

export default ModalAddFileAvatar;
