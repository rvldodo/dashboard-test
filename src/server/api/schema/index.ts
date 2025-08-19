import z from "zod";

export class schema {
	static shared = {
		login: z.object({
			email: z.string().email(),
			password: z
				.string()
				.min(6, "Password must contain at least 6 characters"),
		}),

		register: z.object({
			email: z.string().email(),
			password: z
				.string()
				.min(6, "Password must contain at least 6 characters"),
		}),
	};
}

export type Login = z.infer<typeof schema.shared.login>;
export type Register = z.infer<typeof schema.shared.register>;
