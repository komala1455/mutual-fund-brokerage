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
