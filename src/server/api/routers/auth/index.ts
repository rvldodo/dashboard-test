import { encryptSHA256 } from "@/server/lib/encrypt";
import { schema } from "../../schema";
import { createTRPCRouter, publicProcedure } from "../../trpc";
import { userSchema } from "@/drizzle/migrations/schema";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";

export const authRouter = createTRPCRouter({
	register: publicProcedure
		.input(schema.shared.login)
		.mutation(async ({ ctx, input }) => {
			const { email, password } = input;

			const [existingUser] = await ctx.db
				.select()
				.from(userSchema)
				.where(eq(userSchema.email, email));
			if (existingUser)
				throw new TRPCError({
					message: "User already registered with this email",
					code: "BAD_REQUEST",
				});

			const hashPassword = encryptSHA256(password);

			const data = await ctx.db
				.insert(userSchema)
				.values({ email, password: hashPassword });

			if (!data)
				throw new TRPCError({
					message: "Failed to register user",
					code: "BAD_REQUEST",
				});

			return { data };
		}),
});
