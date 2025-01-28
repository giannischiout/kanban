function isValidHexColor(hex: string): boolean {
	const hexRegex = /^#([0-9A-Fa-f]{3}){1,2}$/;
	return hexRegex.test(hex);
}