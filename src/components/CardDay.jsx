import Card from "react-bootstrap/Card";
import { Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { RiDeleteBin5Line } from "react-icons/ri";
import "../style.css";
function CardDay(prop) {
	const deleteDay = async () => {
		const response = await fetch(
			`${process.env.REACT_APP_SERVER_BASE_URL}/day/delete/${prop.idDay}`,
			{
				headers: {
					"Content-Type": "application/json",
				},
				method: "DELETE",
			}
		);
		alert("Turno eliminato con successo");
		window.location.reload();
	};
	return (
		<Card
			className="g-3 mx-auto"
			as={Col}
			md="4"
			xs="12"
			style={{ width: "15rem" }}
		>
			<Card.Body className="text-center">
				<div onClick={deleteDay} className="delete">
					<RiDeleteBin5Line />
				</div>
				<Card.Title>Turni del Museo </Card.Title>
				<Card.Text>{prop.singleDay}</Card.Text>
				<Button>
					<Link
						className="text-decoration-none text-light"
						to={`/backoffice/workshift/${prop.idDay}`}
					>
						Dettagli
					</Link>
				</Button>
			</Card.Body>
		</Card>
	);
}

export default CardDay;
