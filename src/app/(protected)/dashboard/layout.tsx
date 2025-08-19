import React from "react";
import Container from "./container";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import { PATHS } from "@/app/urls";

type Props = {
	children: React.ReactNode;
};

async function DashboardLayout({ children }: Props) {
	const session = await auth();
	if (!session) redirect(PATHS.signIn);

	return <Container>{children}</Container>;
}

export default DashboardLayout;
