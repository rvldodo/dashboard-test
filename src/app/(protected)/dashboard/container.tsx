"use client";
import Link from "next/link";
import { PATHS } from "@/app/urls";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";

const MENUS = [
	{
		label: "Overview",
		items: [
			{
				label: "Dashboard",
				icon: "ri:dashboard-fill",
				href: PATHS.dashboard,
			},
		],
	},
];

export default function Container({ children }: { children: React.ReactNode }) {
	const handleLogout = async () => {
		try {
			await signOut({
				redirect: true,
			});
		} catch (error) {
			console.error("Logout failed:", error);
		}
	};

	return (
		<div className="flex">
			<aside
				className={cn(
					"fixed left-0 top-0 h-screen flex flex-col shadow z-[60] transition-all duration-300 w-80",
				)}
			>
				{/* Scrollable content area */}
				<div className="flex-1 overflow-y-auto px-6 py-6">
					<ul className="flex flex-col gap-4">
						{MENUS.map((menu) => {
							return (
								<li key={menu.label} className="flex flex-col gap-2">
									<h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
										{menu.label}
									</h3>
									<nav className="flex flex-col gap-1">
										{menu.items.map((item) => {
											return (
												<Link
													key={item.href}
													href={item.href}
													className="flex items-center gap-3 rounded-md text-gray-700 hover:bg-gray-100 transition-colors p-3 font-medium"
													title={item.label}
												>
													{item.label}
												</Link>
											);
										})}
									</nav>
								</li>
							);
						})}
					</ul>
				</div>

				{/* Footer - Fixed at bottom */}
				<div className="flex-shrink-0 p-6 pt-0">
					<section className="grid gap-4 bg-[#F7F8FA] p-4 rounded-xl grid-cols-1">
						<button
							onClick={handleLogout}
							className="text-red-600 hover:text-red-700 flex items-center gap-2 cursor-pointer transition-colors"
							type="button"
						>
							Logout
						</button>
					</section>
				</div>
			</aside>

			<div className="w-full transition-all duration-300 pl-80">{children}</div>
		</div>
	);
}
