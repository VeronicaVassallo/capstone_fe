import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import NavbarComponent from "../components/NavbarComponent";
import useSession from "../useSession";
import Spinner from "../components/Spinner";
import Info from "../components/Info";
import "../style.css";
const Home = () => {
	const session = useSession();
	const idkeeper = session._id;
	const [infoWorkshift, setInfoWorkshift] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	//let data;
	console.log("infoToken", session.nameKeeper);

	try {
		const getInfoWorkshift = async () => {
			const response = await fetch(
				`${process.env.REACT_APP_SERVER_BASE_URL}/workshift/specific/${idkeeper}`
			);
			let data = await response.json();
			data.workshifstSpecificKeeper.sort((a, b) => {
				const dateA = new Date(a.day.dataName);
				const dateB = new Date(b.day.dataName);
				return dateA - dateB;
			});
			setInfoWorkshift(data.workshifstSpecificKeeper);
			setIsLoading(false);
		};
		useEffect(() => {
			getInfoWorkshift();
		}, [idkeeper]);
	} catch (error) {
		console.error(`Home error:`, error);
		alert("Errore durante l'operazione, riprovare o chiamare  l'assistenza");
	}

	return (
		<div className="myBg-Keyper bgKeyper mysize">
			<NavbarComponent referent={session.referent} />
			<div className="welcome">
				<h2>Welcome {session.nameKeeper} !</h2>
			</div>

			<div className="myAvatar mx-4 myAvatarPointer">
				<img className="myImgAvatar" src={session.avatar} alt="img_avatar" />
			</div>
			<br />

			<h2>I tuoi turni:</h2>
			{isLoading && <Spinner />}

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
