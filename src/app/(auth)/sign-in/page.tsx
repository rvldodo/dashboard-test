import { PATHS } from "@/app/urls";
import ButtonLink from "@/components/button-link";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import FormSignIn from "../_components/form-sign-in";
import { Divider } from "antd";

async function SignIn() {
	const session = await auth();
	if (session) redirect(PATHS.dashboard);

	return (
		<article className="min-h-screen flex items-center justify-center main-padding">
			<div className="w-full max-w-lg mx-auto">
				<section className="flex flex-col gap-4 p-4 md:p-6 lg:p-8 rounded-md border-2">
					<h3 className="flex justify-center items-center">
						<Divider size="large">
							<strong>Sign In</strong>
						</Divider>
					</h3>
					<FormSignIn />
					<div className="w-full h-1 bg-primary rounded-md" />
					<ButtonLink color="unfilled" href={PATHS.signUp} className="w-full">
						Sign Up
					</ButtonLink>
				</section>
			</div>
		</article>
	);
}

export default SignIn;
