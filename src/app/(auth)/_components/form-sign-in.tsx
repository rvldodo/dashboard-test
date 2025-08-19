"use client";

import { Login, schema } from "@/server/api/schema";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PATHS } from "@/app/urls";
import { openToast } from "@/components/toaster";
import Input from "@/components/input";
import Button from "@/components/button";

function FormSignIn() {
	const router = useRouter();
	const [wrongCredentialsError, setWrongCredentialsError] =
		useState<string>("");

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<Login>({
		mode: "all",
		resolver: zodResolver(schema.shared.login),
	});

	const { mutate: logIn, isPending } = useMutation({
		mutationFn: async (data: Login) => {
			const res = await signIn("credentials", { ...data, redirect: false });

			if (!res?.error) {
				reset();
				if (wrongCredentialsError) {
					setWrongCredentialsError("");
				}
				router.push(PATHS.signIn);
				openToast({ type: "success", message: "Logged in, redirecting..." });
			} else {
				openToast({ type: "error", message: "Wrong email or password" });
				if (!wrongCredentialsError)
					setWrongCredentialsError(
						"wrong email or password, please try again.",
					);
			}
		},
	});

	return (
		<form
			onSubmit={handleSubmit((e) => logIn(e))}
			className="flex flex-col gap-2"
		>
			<Input
				disabled={isPending}
				autoComplete="email"
				{...register("email")}
				label="Email"
				placeholder="Enter your email"
				error={errors.email?.message}
			/>
			<Input
				disabled={isPending}
				type="password"
				autoComplete="password"
				{...register("password")}
				label="Password"
				placeholder="Enter your password"
				error={errors.password?.message}
			/>

			<Button isPending={isPending} type="submit" className="w-full mt-4">
				Submit
			</Button>
		</form>
	);
}

export default FormSignIn;
