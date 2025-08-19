import { tv } from "tailwind-variants";

export const VARIANTS = {
	Button: tv({
		base: "shadow px-4 uppercase w-full rounded-md flex text-background font-semibold items-center justify-center outline-none bg-primary hover:bg-primary-disabled disabled:bg-primary-disabled",

		variants: {
			color: {
				unfilled:
					"border-1 border-primary bg-white hover:bg-accent disabled:bg-accent text-primary",
				destructive:
					"bg-destructive disabled:bg-destructive-disabled hover:bg-destructive-disabled",
				update: "bg-blue-600 hover:bg-blue-700 disabled:bg-blue-700",
				success: "bg-green-600 hover:bg-green-700 disabled:bg-green-700",
				warning: "bg-amber-600 hover:bg-amber-700 disabled:bg-amber-700",
				gray: "bg-gray-600 hover:bg-gray-700 disabled:bg-gray-700",
			},
			size: {
				small: "h-6 text-xs xl:text-xs",
				regular: "h-8 xl:h-9",
			},
		},
		defaultVariants: {
			size: "regular",
		},
	}),

	Status: tv({
		base: "shadow px-1.5 py-0.5 font-semibold text-background rounded-md",
		variants: {
			status: {
				general: "bg-black",
				student: "bg-primary",
				active: "bg-green-600",
				inactive: "bg-destructive",
				cold: "bg-blue-600",
				normal: "bg-gray-600 text-background",
			},
		},
	}),

	Input: tv({
		base: "h-10 border-1 focus:border-primary active:border-primary hover:border-primary rounded-md px-3 w-full outline-none focus:outline-none",
	}),

	Machines: tv({
		base: "shadow px-1.5 py-0.5 font-semibold text-background rounded-md",
		variants: {
			color: {
				"white blue": "bg-blue-500 text-white",
				pink: "bg-primary",
			},
		},
	}),
};
