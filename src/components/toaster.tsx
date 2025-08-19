import { cn } from "@/lib/utils";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import { toast as sonner } from "sonner";

type ToastType = "success" | "error" | "warning" | "info";

const toastStyles: Record<ToastType, { icon: IconName; color: string }> = {
	success: { icon: "circle-check", color: "bg-green-600" },
	error: { icon: "circle-x", color: "bg-destructive" },
	info: { icon: "info", color: "bg-blue-600" },
	warning: { icon: "triangle-alert", color: "bg-amber-600" },
};

export const Toast = ({
	type,
	message,
}: {
	type: ToastType;
	message: string;
}) => {
	return sonner[type](
		<section
			className={cn(
				"flex flex-col gap-1 py-4 px-6 rounded-md shadow-xl text-background",
				toastStyles[type].color,
			)}
		>
			<section className="flex items-center gap-2">
				<DynamicIcon name={toastStyles[type].icon} size={25} />
				<h6 className="font-semibold text-base">{type.toUpperCase()}</h6>
			</section>
			<p className="whitespace-pre-line">{message}</p>
		</section>,
	);
};

export const openToast = ({
	type,
	message,
}: {
	type: ToastType;
	message: string;
}) => Toast({ type, message });
