import Link, { type LinkProps } from "next/link";
import type { ComponentProps } from "react";
import type { VariantProps } from "tailwind-variants";
import { VARIANTS } from "@/style";
import { cn } from "@/lib/utils";

type Props = LinkProps &
	ComponentProps<"a"> &
	VariantProps<typeof VARIANTS.Button> & {
		children: React.ReactNode;
		unstyled?: boolean;
		newTab?: boolean;
		disabled?: boolean;
	};

export default function ButtonLink({
	children,
	className,
	href,
	size,
	target,
	color,
	rel,
	unstyled,
	newTab,
	disabled,
	...rest
}: Props) {
	const isExternalLink =
		href.startsWith("http") ||
		href.startsWith("tel") ||
		href.startsWith("mail") ||
		newTab;

	if (disabled) {
		return (
			<span
				className={cn(
					unstyled ? className : VARIANTS.Button({ className, size, color }),
				)}
			>
				{children || <span className="sr-only">Link</span>}
			</span>
		);
	}

	return (
		<Link
			href={href}
			target={isExternalLink ? "_blank" : target}
			rel={isExternalLink ? "noreferrer noopener" : rel}
			{...rest}
			className={cn(
				unstyled ? className : VARIANTS.Button({ className, size, color }),
			)}
		>
			{children || <span className="sr-only">Link</span>}
		</Link>
	);
}
