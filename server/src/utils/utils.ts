export const parseAmount = (str: string): number => {
	if (!str) return 0;

	// Remove US$, spaces, commas, and hidden Excel characters
	str = str
		.replace(/[\u200B-\u200D\uFEFF\u00A0]/g, "")
		.replace(/US\$/i, "")
		.replace(/,/g, "")
		.trim();

	return parseFloat(str);
}