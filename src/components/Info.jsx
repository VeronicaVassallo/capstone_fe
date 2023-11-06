import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { FaFlagUsa, FaFireExtinguisher, FaFirstAid } from "react-icons/fa";

const Info = (prop) => {
	const [show, setShow] = useState(false);
	const [infoRoom, setInfoRoom] = useState({});

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const getRoom = async () => {
		const response = await fetch(
			`${process.env.REACT_APP_SERVER_BASE_URL}/room/${prop.idRoom}`
		);
		const data = await response.json();
		setInfoRoom(data.roomById);
	};

	useEffect(() => {
		getRoom();
	}, [prop.idRoom]);

	console.log("ciao", infoRoom);

	return (
		<>
			<Button variant="primary" onClick={handleShow}>
				Info
			</Button>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Dettagli Postazione</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Card>
						<Card.Img variant="top" src={infoRoom.cover} />
						<Card.Body>
							<h3>{infoRoom.nameRoom}</h3>
							<Card.Title></Card.Title>
							<Card.Text></Card.Text>
						</Card.Body>
						<ListGroup className="list-group-flush">
							<ListGroup.Item>
								<b>Generali:</b> {infoRoom.info}
							</ListGroup.Item>
							<ListGroup.Item>
								<b>Requisiti: </b>
								<br />
								{infoRoom.english ? <FaFlagUsa /> : ""}{" "}
								{infoRoom.firePrevention ? <FaFireExtinguisher /> : ""}{" "}
								{infoRoom.firstAid ? <FaFirstAid /> : ""}
							</ListGroup.Item>
						</ListGroup>
					</Card>
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

export default Info;
