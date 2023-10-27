import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Backoffice from "./pages/Backoffice";
import ErrorPage from "./pages/ErrorPage";
function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route exact path="/" element={<Home />} />
				<Route path="/backoffice" element={<Backoffice />} />

				<Route path="*" element={<ErrorPage />} />
			</Routes>
		</BrowserRouter>
	);
}
export default App;
