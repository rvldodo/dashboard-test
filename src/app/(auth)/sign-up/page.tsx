import { PATHS } from "@/app/urls";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import FormSignUp from "../_components/form-sign-up";
import ButtonLink from "@/components/button-link";
import { Divider } from "antd";

async function SignUp() {
	const session = await auth();
	if (session) redirect(PATHS.dashboard);

	return (
		<article className="min-h-screen flex items-center justify-center main-padding">
			<div className="w-full max-w-lg mx-auto">
				<section className="flex flex-col gap-4 p-4 md:p-6 lg:p-8 rounded-md border-2">
					<h3 className="flex justify-center items-center">
						<Divider size="large">
							<strong>Register</strong>
						</Divider>
					</h3>
					<FormSignUp />
					<div className="w-full h-1 bg-primary rounded-md" />
					<ButtonLink color="unfilled" href={PATHS.signIn} className="w-full">
						Already Register?
					</ButtonLink>
				</section>
			</div>
		</article>
	);
}

export default SignUp;
