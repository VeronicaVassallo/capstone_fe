import React from "react";
import "../style.css";

const KeeperSelector = (prop) => {
	////Patch assegnare id del keeper al turno
	const patchKeeper = async () => {
		const responsePatch = await fetch(
			`${process.env.REACT_APP_SERVER_BASE_URL}/workshift/${prop.idWorkshift}/keeper`,
			{
				headers: {
					"Content-Type": "application/json",
				},
				method: "PATCH",
				body: JSON.stringify({ keeper: prop.idKeeper }),
			}
		);
		const data = await responsePatch.json();
		alert("Custode inserito con successo!");
		window.location.reload();
	};
	return (
		<div className="selector pt-1" onClick={patchKeeper}>
			<img className="selectorImg" src={prop.avatar} />
			<br />
			<p className="mb-0">{prop.name}</p>
			<p className="mt-0">{prop.susername}</p>
		</div>
	);
};

export default KeeperSelector;
