import type { ComponentProps } from "react";
import { PulseLoader } from "react-spinners";
import type { VariantProps } from "tailwind-variants";
import { VARIANTS } from "@/style";
import { cn } from "@/lib/utils";

type Props = ComponentProps<"button"> &
	VariantProps<typeof VARIANTS.Button> & {
		children: React.ReactNode;
		isPending?: boolean;
		unstyled?: boolean;
	};

export default function Button({
	type,
	size,
	className,
	color,
	disabled,
	children,
	isPending,
	unstyled,
	...rest
}: Props) {
	return (
		<button
			disabled={disabled || isPending}
			{...rest}
			type={type ?? "button"}
			className={cn(
				unstyled ? className : VARIANTS.Button({ className, size, color }),
			)}
		>
			{isPending ? (
				<PulseLoader size={5} color="white" />
			) : (
				children || <span className="sr-only">Button</span>
			)}
		</button>
	);
}
