import Card from "react-bootstrap/Card";
import { Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
function CardDay(prop) {
	return (
		<Card
			className="g-3 mx-auto"
			as={Col}
			md="4"
			xs="12"
			style={{ width: "15rem" }}
		>
			<Card.Body key={prop.id} className="text-center">
				<Card.Title>Turni del Museo</Card.Title>
				<Card.Text>{prop.singleDay}</Card.Text>
				<Button href="#">
					<Link
						className="text-decoration-none text-light"
						to={"/backoffice/workshift"}
					>
						Dettagli
					</Link>
				</Button>
			</Card.Body>
		</Card>
	);
}

export default CardDay;
