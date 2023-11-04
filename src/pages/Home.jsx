import React from "react";
import NavbarComponent from "../components/NavbarComponent";
import useSession from "../useSession";

const Home = () => {
	const session = useSession();
	return (
		<>
			<NavbarComponent />
			<h1>Home</h1>
		</>
	);
};

export default Home;
