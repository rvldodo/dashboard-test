"use client";

import { DynamicIcon } from "lucide-react/dynamic";
import { type ComponentProps, useId, useState } from "react";
import { VARIANTS } from "@/style";
import Button from "./button";
import { cn } from "@/lib/utils";

type Props = ComponentProps<"input"> & {
	error?: string | undefined;
	placeholder?: string;
	label?: string;
	classNameParent?: string;
};

export default function Input({
	autoComplete,
	placeholder,
	error,
	name,
	className,
	type,
	label,
	classNameParent,
	...rest
}: Props) {
	const isPassword = type === "password";
	const [showPassword, setShowPassword] = useState(false);
	const id = useId();

	return (
		<section className={cn("flex flex-col gap-1 w-full", classNameParent)}>
			{label ? (
				<label htmlFor={id} className="ml-0.5">
					{label}
				</label>
			) : null}
			<section className={cn("w-full", { relative: isPassword })}>
				<input
					className={cn(VARIANTS.Input({ className }), { "pr-10": isPassword })}
					placeholder={placeholder}
					{...rest}
					id={id}
					autoComplete={autoComplete ?? "off"}
					name={name}
					type={
						isPassword && !showPassword
							? "password"
							: isPassword && showPassword
								? "text"
								: (type ?? "text")
					}
				/>
				{isPassword && (
					<Button unstyled onClick={() => setShowPassword(!showPassword)}>
						<DynamicIcon
							size={20}
							name={!showPassword ? "eye" : "eye-off"}
							className="absolute centered-right -translate-x-8 -translate-y-4"
						/>
					</Button>
				)}
			</section>
			<small
				className={cn("ml-0.5 text-destructive", {
					"opacity-0 -translate-y-2 -z-10": !error,
				})}
			>
				{error}
			</small>
		</section>
	);
}
