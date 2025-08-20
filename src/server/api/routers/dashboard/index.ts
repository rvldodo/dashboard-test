import { env } from "@/env";
import { createTRPCRouter, dashboardProcedure } from "../../trpc";
import { TRPCError } from "@trpc/server";
import z from "zod";
import axios from "axios";

export const dashboardRouter = createTRPCRouter({
	authenticateBMS: dashboardProcedure.query(async () => {
		const bmsUrl = env.BMS_URL;
		const bmsUsername = env.BMS_USERNAME;
		const bmsPassword = env.BMS_PASSWORD;

		if (!bmsUrl || !bmsPassword || !bmsUsername) {
			throw new TRPCError({
				message: "BMS credentials not found",
				code: "UNAUTHORIZED",
			});
		}
	}),

	proxyRequest: dashboardProcedure
		.input(
			z.object({
				path: z.string(),
				method: z.enum(["GET", "POST"]).default("GET"),
				data: z.any().optional(),
			}),
		)
		.mutation(async ({ input }) => {
			const bmsUrl = env.BMS_URL;
			const bmsUsername = env.BMS_USERNAME;
			const bmsPassword = env.BMS_PASSWORD;

			const response = await axios({
				method: input.method,
				url: `${bmsUrl}${input.path}`,
				data: {
					username: bmsUsername,
					password: bmsPassword,
				},
				headers: {
					"Content-Type": "application/json",
				},
				withCredentials: true,
			});

			return response.data;
		}),
});
