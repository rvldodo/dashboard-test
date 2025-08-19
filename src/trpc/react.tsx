"use client";

import { type QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchStreamLink, loggerLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import type { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import type { AppRouter } from "@/server/api/root";
import { createQueryClient, transformer } from "@/trpc/shared";

let clientQueryClientSingleton: QueryClient | undefined;

const getQueryClient = () => {
	if (typeof window === "undefined") return createQueryClient();
	return (clientQueryClientSingleton ??= createQueryClient());
};

export const api = createTRPCReact<AppRouter>();

type Props = { children: React.ReactNode; session: Session | null };

export default function TRPCReactProvider({ children, session }: Props) {
	const queryClient = getQueryClient();
	const [trpcClient] = useState(() =>
		api.createClient({
			links: [
				loggerLink({
					enabled: (op) =>
						process.env.NODE_ENV === "development" ||
						(op.direction === "down" && op.result instanceof Error),
				}),
				httpBatchStreamLink({
					transformer,
					url: "/api/trpc",
					headers: () => {
						const headers = new Headers();
						headers.set("x-trpc-source", "nextjs-react");
						return headers;
					},
				}),
			],
		}),
	);

	useEffect(() => {
		if (session) {
			if (new Date(session.expires) < new Date()) signOut();
		}
	}, [session]);

	return (
		<QueryClientProvider client={queryClient}>
			<api.Provider client={trpcClient} queryClient={queryClient}>
				{children}
			</api.Provider>
		</QueryClientProvider>
	);
}
