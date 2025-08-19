import { db } from "@/drizzle/db";
import { auth } from "@/server/auth";
import { transformer } from "@/trpc/shared";
import { TRPCError, initTRPC } from "@trpc/server";
import { ZodError } from "zod";

export const createTRPCContext = async (opts: { headers: Headers }) => {
	const session = await auth();
	return { db, session, ...opts };
};

const t = initTRPC.context<typeof createTRPCContext>().create({
	transformer,
	errorFormatter({ shape, error }) {
		return {
			...shape,
			data: {
				...shape.data,
				zodError:
					error.cause instanceof ZodError ? error.cause.flatten() : null,
			},
		};
	},
});

export const createCallerFactory = t.createCallerFactory;
export const createTRPCRouter = t.router;

export const publicProcedure = t.procedure;

export const dashboardProcedure = t.procedure.use(({ ctx, next }) => {
	if (!ctx.session || !ctx.session.user) {
		throw new TRPCError({ code: "UNAUTHORIZED" });
	}
	return next({ ctx: { session: { ...ctx.session, user: ctx.session.user } } });
});
