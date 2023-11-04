import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { Container, Row, Form, Col } from "react-bootstrap";
import "../style.css";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
	const navigate = useNavigate();
	const [loginData, setLoginData] = useState({});
	const [login, setLogin] = useState(null);

	const handleInpuntChange = (e) => {
		const { name, value } = e.target;
		setLoginData({
			...loginData,
			[name]: value,
		});
	};

	const onSubmitData = async (e) => {
		debugger;
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
			const data = await response.json();
			setLogin(data);
			if (data.token) {
				localStorage.setItem("loggedInKeeper", JSON.stringify(data.token));
				return navigate("/home");
			}
		} catch (error) {
			alert(error);
			console.log("Error:", error);
		}
	};

	return (
		<div className="myImg">
			<Container onSubmit={onSubmitData}>
				<Row>
					<h2 className="text-center">Registrazione nuovo utente</h2>
					<div className="d-flex bgKeyper p-5 myBorder rounded bgKeyperLight">
						<div className="">
							<Form>
								<Row>
									<Form.Group as={Col} md="4">
										<Form.Label>E-mail: </Form.Label>
										<Form.Control
											type="email"
											placeholder="email"
											name="email"
											required
											onChange={handleInpuntChange}
										/>
										<Form.Label>Password :</Form.Label>
										<Form.Control
											type="password"
											name="password"
											required
											onChange={handleInpuntChange}
										/>
									</Form.Group>
								</Row>
								<br />
								<Button type="submit">Accedi</Button>
							</Form>
						</div>
					</div>
				</Row>
			</Container>
		</div>
	);
};

export default LoginPage;
