import { useNavigate } from "react-router";
import { Header, Main } from ".";
import { useEffect } from "react";

export const Layout = () => {
	const navigate = useNavigate();
	const isAuthenticated = localStorage.getItem("authToken");

	useEffect(() => {
		if (!isAuthenticated) {
			navigate("/login");
		}
	}, [isAuthenticated, navigate]);
	return (
		<div className="bg-white ">
			<Header />
			<div className="m-auto w-5/6 py-4">
				<Main />
			</div>
			{/* <Footer /> */}
		</div>
	);
};
