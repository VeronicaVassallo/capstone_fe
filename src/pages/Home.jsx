import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import NavbarComponent from "../components/NavbarComponent";
import useSession from "../useSession";
import Button from "react-bootstrap/Button";
import Info from "../components/Info";
import "../style.css";
const Home = () => {
	const session = useSession();
	const idkeeper = session._id;
	const [infoWorkshift, setInfoWorkshift] = useState([]);
	//let data;
	console.log("infoToken", session.nameKeeper);

	const getInfoWorkshift = async () => {
		const response = await fetch(
			`${process.env.REACT_APP_SERVER_BASE_URL}/workshift/specific/${idkeeper}`
		);
		let data = await response.json();
		setInfoWorkshift(data.workshifstSpecificKeeper);
	};
	useEffect(() => {
		getInfoWorkshift();
	}, [idkeeper]);
	return (
		<div className="bgKeyper mysize">
			<NavbarComponent referent={session.referent} />
			<hr className="" />
			<h2>
				Benvenuto {session.nameKeeper} {session.surnameKeeper} !
			</h2>
			<div className="myAvatar mx-4 myAvatarPointer">
				<img className="myImgAvatar" src={session.avatar} alt="img_avatar" />
			</div>
			<br />
			<br />

			<h2>I tuoi turni:</h2>
			<Table striped bordered hover className="myBorder-home">
				<thead>
					<tr>
						<th>Giorno: </th>
						<th>sala </th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{infoWorkshift &&
						infoWorkshift?.map((wrk) => {
							return (
								<tr>
									<td>{wrk.day && wrk.day.singleDay}</td>
									<td>{wrk.room.nameRoom}</td>
									<td>
										<Info idRoom={wrk.room._id} />
									</td>
								</tr>
							);
						})}
				</tbody>
			</Table>
		</div>
	);
};

export default Home;
