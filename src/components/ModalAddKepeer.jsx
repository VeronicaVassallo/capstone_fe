import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import KeeperSelector from "./KeeperSelector";
import "../style.css";

const ModalAddKepeer = (prop) => {
	const [show, setShow] = useState(false);
	let data;
	const [keepersOk, setKeepersOk] = useState([]);
	const [keepersNo, setKeepersNo] = useState([]);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const getKeepersWithSkills = async () => {
		const response = await fetch(
			`${process.env.REACT_APP_SERVER_BASE_URL}/keepers/${prop.idRoom}/${prop.idDay}`
		);
		data = await response.json();
		setKeepersOk(data.keepersFiltered);
		setKeepersNo(data.keepersExcluded);
		handleShow();
	};

	const removeKeeper = async () => {
		const responseRemoveKeeper = await fetch(
			`${process.env.REACT_APP_SERVER_BASE_URL}/workshift/${prop.idWorkshift}/keeper/remove`,
			{
				headers: {
					"Content-Type": "application/json",
				},
				method: "PATCH",
				body: JSON.stringify({ keeper: null }),
			}
		);
		const dataRemoveKeeper = await responseRemoveKeeper.json();
		window.location.reload();
	};

	return (
		<>
			<button className="buttonAdd bg-primary" onClick={getKeepersWithSkills}>
				Aggiungi
			</button>

			<button className="buttonAdd bg-danger" onClick={removeKeeper}>
				Rimuovi
			</button>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header className="bgKeyper" closeButton>
					<Modal.Title>Seleziona i membri della tua squadra</Modal.Title>
				</Modal.Header>
				<Modal.Body className="bgKeyper">
					Custodi con requisiti:
					<div className="d-flex flex-wrap">
						{keepersOk &&
							keepersOk?.map((x) => {
								return (
									<KeeperSelector
										idWorkshift={prop.idWorkshift}
										idKeeper={x._id}
										avatar={x.avatar}
										name={x.nameKeeper}
										susername={x.surnameKeeper}
									/>
								);
							})}
					</div>
					<hr />
					<p>Custodi senza requisiti:</p>
					<div className="d-flex">
						{keepersNo &&
							keepersNo?.map((y) => {
								return (
									<KeeperSelector
										idWorkshift={prop.idWorkshift}
										idKeeper={y._id}
										avatar={y.avatar}
										name={y.nameKeeper}
										susername={y.surnameKeeper}
									/>
								);
							})}
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default ModalAddKepeer;
