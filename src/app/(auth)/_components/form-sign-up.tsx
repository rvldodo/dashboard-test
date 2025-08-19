"use client";

import { Register, schema } from "@/server/api/schema";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PATHS } from "@/app/urls";
import { openToast } from "@/components/toaster";
import Input from "@/components/input";
import Button from "@/components/button";
import { api } from "@/trpc/react";

function FormSignUp() {
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<Register>({
		mode: "all",
		resolver: zodResolver(schema.shared.register),
	});

	const { mutate, isPending } = api.auth.register.useMutation({
		onSuccess: () => {
			reset();
			openToast({ type: "success", message: "Successfully register user" });
			router.push(PATHS.signIn);
		},
		onError: (error) => {
			openToast({ type: "error", message: error.message });
		},
	});

	return (
		<form
			onSubmit={handleSubmit((e) => mutate(e))}
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

export default FormSignUp;
