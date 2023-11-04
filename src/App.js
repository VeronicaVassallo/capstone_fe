import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Backoffice from "./pages/Backoffice";
import ErrorPage from "./pages/ErrorPage";
import WorkshiftPage from "./pages/WorkshiftPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoutes from "./middlewares/ProtectedRouter";
function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route exact path="/" element={<LoginPage />} />
				<Route element={<ProtectedRoutes />}>
					<Route path="/home" element={<Home />} />
					<Route path="/backoffice" element={<Backoffice />} />
					<Route
						path="/backoffice/workshift/:idDay"
						element={<WorkshiftPage />}
					/>
				</Route>

				<Route path="*" element={<ErrorPage />} />
			</Routes>
		</BrowserRouter>
	);
}
export default App;
