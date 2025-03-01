export const API_ENDPOINT = "http://localhost:8001";
export const indianFormat = (number: string) => {
	const numStr = number.toString();
	let formattedNum = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

	const parts = formattedNum.split(",");
	if (parts.length > 1) {
		formattedNum = parts[0];
		for (let i = 1; i < parts.length; i++) {
			if (i === 1) {
				formattedNum = `${formattedNum},${parts[i]}`;
			}
		}
	}
	return formattedNum;
};

// Example usage:
// const items = [
// 	{ id: 1, category: "A", value: "x" },
// 	{ id: 2, category: "B", value: "y" },
// 	{ id: 3, category: "A", value: "z" },
// ];

// const groupedByCategory = groupByMutual_Fund_Family(
// 	data,
// 	(item) => item.Mutual_Fund_Family,
// );
// console.log(groupedByCategory);
