import { type IScheme, API_ENDPOINT } from "@data/";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

export const ExploreFunds = () => {
	const [selectedFund, setSelectedFund] = useState<IScheme | null>(null);
	const [funds, setFunds] = useState<IScheme[] | null>(null);
	const navigate = useNavigate();

	axios
		.get(
			`${API_ENDPOINT}/funds/funds`,

			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `${localStorage.getItem("tokenType")} ${localStorage.getItem("authToken")}`,
				},
			},
		)
		.then((res) => {
			setFunds(res.data);
		})
		.catch((e) => console.log(e));
	const handleBuy = (fund: IScheme) => {
		axios
			.post(
				`${API_ENDPOINT}/portfolio/`,

				fund,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `${localStorage.getItem("tokenType")} ${localStorage.getItem("authToken")}`,
					},
				},
			)
			.then((res) => {
				console.log(res.data);
				navigate("/investments");
			})
			.catch((e) => {
				alert("problem facing order");
				console.log(e);
			});
	};
	return (
		<div className="flex flex-wrap">
			<div className="w-2/3 py-2">
				<table className="w-full text-left">
					<thead className="border-b border-gray-600 bg-gray-100 py-2">
						<tr>
							<th className="w-1/2 items-start text-left py-4 capitalize pl-2 rounded-tl-md">
								fund name
							</th>
							<th className="w-1/4 items-start text-left py-4 capitalize rounded-tr-md">
								scheme code
							</th>
							<th className="w-1/4 items-start text-left py-4 capitalize rounded-tr-md">
								Net Asset Value
							</th>
						</tr>
					</thead>
					<tbody>
						{funds?.map((fund: IScheme) => {
							return (
								<tr
									onClick={() => {
										setSelectedFund(fund);
									}}
									onKeyDown={() => {}}
									key={fund.Scheme_Code}
									className="py-2 border-b border-gray-300"
								>
									<td className="py-2 pr-2 pl-2">
										<div className="py-1 text-md">
											{fund.Scheme_Name}{" "}
											<span className="text-xs bg-gray-200 px-1 py-0.5 rounded-md text-nowrap">
												{fund.Scheme_Type}
											</span>{" "}
											<span className="text-xs bg-gray-200 px-1 py-0.5 rounded-md text-nowrap">
												{fund.Scheme_Category}
											</span>
										</div>
										<div className="text-sm  text-gray-400 py-0.5">
											{fund.Mutual_Fund_Family}
										</div>
									</td>
									<td>{fund.Scheme_Code}</td>
									<td>{fund.Net_Asset_Value}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
			<div className="p-2 w-1/3">
				<div className="border border-gray-300 w-full rounded-md">
					<div className="border-b border-gray-600 bg-gray-100 py-2 rounded-tl-lg rounded-tr-lg px-3 capitalize font-bold">
						explore fund details
					</div>
					{selectedFund ? (
						<div className="text-sm p-3">
							<div className="py-1 flex items-start justify-items-start ">
								<div className="w-1/4 font-semibold">Name </div>
								<div className="w-3/4 px-2">: {selectedFund.Scheme_Name}</div>
							</div>
							<div className="py-1 flex items-start justify-items-start">
								<div className="w-1/4 font-semibold">Type </div>
								<div className="w-3/4 px-2">: {selectedFund.Scheme_Type}</div>
							</div>
							<div className="py-1 flex items-start justify-items-start">
								<div className="w-1/4 font-semibold">Category </div>
								<div className="w-3/4 px-2">
									: {selectedFund.Scheme_Category}
								</div>
							</div>
							<div className="py-1 flex items-start justify-items-start">
								<div className="w-1/4 font-semibold">Fund Family </div>
								<div className="w-3/4 px-2">
									: {selectedFund.Mutual_Fund_Family}
								</div>
							</div>
							<div className="py-1 flex items-start justify-items-start">
								<div className="w-1/4 font-semibold">Scheme Code </div>
								<div className="w-3/4 px-2">: {selectedFund.Scheme_Code}</div>
							</div>
							<button
								type="button"
								className="bg-gray-200 rounded-md px-2 py-1"
								onClick={() => {
									navigate(`${selectedFund.Mutual_Fund_Family}`);
								}}
							>
								view details about fund
							</button>
							<button
								type="button"
								className="bg-blue-600 rounded-md px-2 py-1 text-white"
								onClick={() => {
									handleBuy(selectedFund);
								}}
							>
								buy
							</button>
						</div>
					) : (
						"please select fund"
					)}
				</div>
			</div>
		</div>
	);
};
