import { API_ENDPOINT } from "@data/";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

export const Register = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (email && password) {
			axios
				.post(`${API_ENDPOINT}/users/register`, {
					email,
					password,
				})
				.then((res) => {
					alert(res.data.message);
					navigate("/login");
				})
				.catch((e) => {
					if (e.status === 400) {
						alert(e.response.data.detail);
					}
					console.log(e, "ttt");
				});
		} else {
			alert("enter username and password");
		}
	};

	return (
		<div className="flex justify-center items-center h-screen bg-gray-100">
			<div className="bg-white p-8 rounded shadow-md w-96">
				<h2 className="text-2xl font-bold mb-4">Register</h2>
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
						className="w-full bg-green-500 text-white p-2 rounded"
					>
						Register
					</button>
				</form>
				<p className="mt-2 text-sm">
					Already have an account?{" "}
					<Link to="/login" className="text-blue-500">
						Login
					</Link>
				</p>
			</div>
		</div>
	);
}