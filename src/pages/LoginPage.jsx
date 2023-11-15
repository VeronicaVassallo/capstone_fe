import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { Container, Row, Form, Col } from "react-bootstrap";
import "../style.css";
import { useNavigate } from "react-router-dom";
import Registration from "../components/Registration";
import Spinner from "../components/Spinner";

const LoginPage = () => {
	const navigate = useNavigate();
	const [loginData, setLoginData] = useState({});
	const [login, setLogin] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const handleInpuntChange = (e) => {
		const { name, value } = e.target;
		setLoginData({
			...loginData,
			[name]: value,
		});
	};

	const onSubmitData = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch(
				`${process.env.REACT_APP_SERVER_BASE_URL}/login`,
				{
					headers: {
						"Content-Type": "application/json",
					},
					method: "POST",
					body: JSON.stringify(loginData),
				}
			);
			setIsLoading(true);
			if (response.status === 200) {
				const data = await response.json();
				setLogin(data);

				if (data.token) {
					localStorage.setItem("loggedInKeeper", JSON.stringify(data.token));
					return navigate("/home");
				}
			} else {
				alert("La mail o la password non sono valide!");
			}
			setIsLoading(false);
		} catch (error) {
			console.error(`LoginPage error:`, error);
			alert("Errore durante l'operazione, riprovare o chiamare  l'assistenza");
		}
	};

	return (
		<div className="myImg">
			{isLoading && <Spinner />}
			<Container className="d-flex justify-content-center">
				<Row>
					<Col>
						<div className="d-flex bgKeyper p-5 myBorder rounded bgKeyperLight ">
							<div className="d-flex flex-column justify-content-center ">
								<div className="d-flex align-items-center my-2 mx-4">
									<div>
										<h3 className="myk">K</h3>
									</div>
									<div className="myEyper">
										<span>eyper</span>
									</div>
									<div className="keyTooth"></div>
								</div>

								<Form onSubmit={onSubmitData}>
									<Row>
										<Form.Group as={Col} md="6">
											<label>E-mail: </label>
											<input
												type="email"
												placeholder="email"
												name="email"
												required
												onChange={handleInpuntChange}
											/>

											<label>Password:</label>
											<input
												type="password"
												name="password"
												placeholder="******"
												required
												onChange={handleInpuntChange}
											/>
										</Form.Group>
									</Row>
									<br />
									<Button type="submit">Accedi</Button>
									<Registration />
								</Form>
							</div>
						</div>
					</Col>

					<Col>
						<div className="typewriter">
							<h1>the key for every keepers</h1>
						</div>
						<h4 className=" p-2 mt-5 mybg">
							Con l'app Keyper puoi gestire il tuo lavoro in maniera piu Smarth!
							La gestione dei turni non è mai stata cosi semplice! Organizza i
							tuoi turni e quelli della tua squadra.
						</h4>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default LoginPage;
