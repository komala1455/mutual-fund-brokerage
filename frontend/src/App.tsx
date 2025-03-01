import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import { Layout } from "@layout/";
import {
	MutualFunds,
	ExploreFunds,
	Login,
	Register,
	ExploreFund,
} from "@pages/index";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route element={<Layout />}>
					<Route path="/" index element={<ExploreFunds />} />
					<Route path="/explore" element={<ExploreFunds />} />
					<Route path="/explore/:id" element={<ExploreFund />} />
					<Route path="/investments" element={<MutualFunds />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
