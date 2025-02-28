import { useLocation, useNavigate } from "react-router";
import logo from "@assets/logo.svg";
export const Header = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const isActive = (pathname: string) => {
		return location.pathname.includes(pathname);
	};
	return (
		<div className="border-b border-gray-200 pt-4">
			<div className="m-auto w-5/6">
				<div className="py-2 flex gap-2">
					<img src={logo} alt="" className="w-8" height="100%" />{" "}
					<span className="py-3 py uppercase text-xl">Stock Market </span>
				</div>
				<div>
					<ul className="capitalize flex justify-items-start text-md font-semibold">
						<li>
							<button
								type="button"
								onClick={() => navigate("/explore")}
								className={`p-3 bg-transparent cursor-pointer capitalize border-b-3 ${isActive("/explore") ? "border-green-500" : "border-transparent "}`}
							>
								explore
							</button>
						</li>
						<li>
							<button
								type="button"
								onClick={() => navigate("/investments")}
								className={`p-3 bg-transparent cursor-pointer capitalize border-b-3 ${isActive("/investments") ? "border-green-500" : "border-transparent "}`}
							>
								Investments
							</button>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};
