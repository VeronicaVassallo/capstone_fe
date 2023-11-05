import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { Container, Row, Form, Col } from "react-bootstrap";
import "../style.css";
import { useNavigate } from "react-router-dom";
import Registration from "../components/Registration";

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
		} catch (error) {
			console.log("Error:", error);
		}
	};

	return (
		<div className="myImg">
			<Container>
				<h2 className="text-center text-light pb-5">Benvenuti su Keyper</h2>
				<div className="d-flex bgKeyper p-5 myBorder rounded bgKeyperLight">
					<div className="">
						<Form onSubmit={onSubmitData}>
							<Row>
								<Form.Group as={Col} md="4">
									<label>E-mail: </label>
									<input
										type="email"
										placeholder="email"
										name="email"
										required
										onChange={handleInpuntChange}
									/>

									<label>Password :</label>
									<input
										type="password"
										name="password"
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
			</Container>
		</div>
	);
};

export default LoginPage;
