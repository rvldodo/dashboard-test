import * as crypto from "node:crypto";

export const encryptSHA256 = (plainText: string): string => {
	const hash = crypto.createHash("sha256");
	hash.update(plainText);

	return hash.digest("hex");
};
