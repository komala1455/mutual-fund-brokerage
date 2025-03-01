import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios"
import { API_ENDPOINT } from "@data/utils";

export const Login = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const isAuthenticated = localStorage.getItem("authToken");

	useEffect(() => {
		if (isAuthenticated) {
			navigate("/");
		}
	}, [isAuthenticated, navigate]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (email && password) {
			axios
				.post(
					`${API_ENDPOINT}/users/login`,
					{
						scope: "",
						client_id: "test",
						client_secret: "test",
						username: email,
						password,
						grant_type: "password",
					},
					{
						headers: {
							"Content-Type": "application/x-www-form-urlencoded",
						},
					},
				)
				.then((res) => {
					if (res.data.access_token) {
						localStorage.setItem("authToken", res.data.access_token);
						localStorage.setItem("tokenType", res.data.token_type);
						// return <Navigate to="/" />;
						navigate("/");
					} else {
						alert("wrong detail or no user found");
					}
				})
				.catch((e) => console.log(e));
		} else {
			alert("enter username and password");
		}
		console.log("Login: ", { email, password });


	};

	return (
		<div className="flex justify-center items-center h-screen bg-gray-100">
			<div className="bg-white p-8 rounded shadow-md w-96">
				<h2 className="text-2xl font-bold mb-4">Login</h2>
				<form onSubmit={handleSubmit}>
					<input
						type="email"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="w-full p-2 mb-2 border rounded"
					/>
					<input
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="w-full p-2 mb-4 border rounded"
					/>
					<button
						type="submit"
						className="w-full bg-blue-500 text-white p-2 rounded"
					>
						Login
					</button>
				</form>
				<p className="mt-2 text-sm">
					Don't have an account?{" "}
					<Link to="/register" className="text-blue-500">
						Register
					</Link>
				</p>
			</div>
		</div>
	);
};
