import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../style.css";
//
import { FiDelete } from "react-icons/fi";
import { current } from "@reduxjs/toolkit";

const GeneratorWorkshift = (prop) => {
	const [show, setShow] = useState(false);
	const [keepers, setKeepers] = useState([]);
	const [selectedKeepers, setSelectedKeepers] = useState([]); //mi ritorna l'array con tutti i i keeper oggetti

	const arrayId = selectedKeepers.map((idK) => {
		return [idK._id];
	});
	const arrayIdJoined = arrayId.join(";");

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const getAllKeepers = async () => {
		const response = await fetch(
			`${process.env.REACT_APP_SERVER_BASE_URL}/keepers`
		);
		const data = await response.json();
		setKeepers(data.allKeepers);
		handleShow();
		console.log(keepers);
	};

	const pushKeeper = (kpr) => {
		if (!selectedKeepers.includes(kpr))
			setSelectedKeepers((current) => [...current, kpr]);
		else {
			alert("Il custode è stato gia selezionato");
		}
	};

	const popKeeper = (slct) => {
		setSelectedKeepers((current) => {
			let index = selectedKeepers.indexOf(slct);
			if (index > -1) {
				current.splice(index, 1);
			}
			return [...current];
		});
	};

	const generatorRandom = async () => {
		try {
			const response = await fetch(
				`${process.env.REACT_APP_SERVER_BASE_URL}/workshift/${prop.idDay}/generator`,
				{
					headers: {
						"Content-Type": "application/json",
					},
					method: "PATCH",
					body: JSON.stringify({
						arrayIdJoined: arrayIdJoined,
					}),
				}
			);
			const data = await response.json();
			window.location.reload();
		} catch (error) {
			console.error(`GeneratorWorkshift error:`, error);
			alert("Errore durante l'operazione, riprovare o chiamare  l'assistenza");
		}
	};

	return (
		<>
			<button className="myButton mx-2" onClick={getAllKeepers}>
				<span className="myButton-content">Generatore</span>
			</button>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton className="bgKeyper">
					<Modal.Title>Generatore automatico</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div>
						<h5>Custodi selezionati</h5>
						<div className="d-flex flex-wrap">
							{selectedKeepers &&
								selectedKeepers?.map((slct) => {
									return (
										<div key={slct._id} className="selectedKeepers mx-2 my-1">
											<div>
												<div>{slct && slct.nameKeeper}</div>
												<div>{slct && slct.surnameKeeper}</div>
											</div>

											<div
												className="text-light delete:hover delete"
												onClick={() => popKeeper(slct)}
											>
												{" "}
												<FiDelete />{" "}
											</div>
										</div>
									);
								})}
						</div>
					</div>
					<hr />
					<h5>Seleziona i membri della tua squadra</h5>
					<div className="d-flex flex-wrap">
						{keepers &&
							keepers?.map((kpr) => {
								return (
									<div
										key={kpr._id}
										className="selector pt-1"
										onClick={() => pushKeeper(kpr)}
									>
										<img className="selectorImg" src={kpr.avatar} />
										<br />
										<p className="mb-0 p-1">{kpr.nameKeeper}</p>
										<p className="mt-0 p-1">{kpr.surnameKeeper}</p>
									</div>
								);
							})}
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={generatorRandom}>
						Crea Turno
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default GeneratorWorkshift;
