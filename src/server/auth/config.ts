import { db } from "@/drizzle/db";
import { userSchema } from "@/drizzle/migrations/schema";
import { env } from "@/env";
import { encryptSHA256 } from "@/server/lib/encrypt";
import { eq } from "drizzle-orm";
import type { DefaultSession, NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { schema } from "../api/schema";

declare module "next-auth" {
	interface Session {
		user: {
			id: string;
			email: string;
		} & DefaultSession["user"];
	}

	interface JWT {
		id?: string;
		email?: string;
	}
}
export const authConfig = {
	secret: env.AUTH_SECRET,
	callbacks: {
		jwt: async ({ token, user }) => {
			if (user) {
				token.id = user.id;
				token.email = user.email;
			}
			return token;
		},
		session: async ({ session, token }) => ({
			...session,
			user: {
				...session.user,
				id: token.id as string,
				email: token.email,
			},
		}),
	},
	providers: [
		CredentialsProvider({
			name: "credentials",
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},
			authorize: async (credentials) => {
				const parsedCredentials = schema.shared.login.safeParse(credentials);
				if (!parsedCredentials.success) return null;
				const { password, email } = parsedCredentials.data;
				const [user] = await db
					.select()
					.from(userSchema)
					.where(eq(userSchema.email, email));

				if (!user) return null;

				const hashedPassword = encryptSHA256(password);
				if (user.password !== hashedPassword) return null;
				const { id, email: userEmail } = user;
				return {
					id: id.toString(),
					email: userEmail,
				};
			},
		}),
	],
} satisfies NextAuthConfig;
