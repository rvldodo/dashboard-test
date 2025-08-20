"use client";

import { useRef, useEffect } from "react";

function Dashboard() {
	const iframeRef = useRef<HTMLIFrameElement>(null);

	const formData = {
		email: "john@example.com",
		password: "realmadrid",
	};

	const attemptAutofill = () => {
		const iframe = iframeRef.current;
		if (!iframe) return;

		try {
			iframe.contentWindow?.postMessage(
				{
					type: "AUTOFILL_REQUEST",
					data: formData,
				},
				"https://dashboard.waterhub.co.id",
			);
		} catch (error) {
			console.error("Autofill error:", error);
		}
	};

	useEffect(() => {
		const iframe = iframeRef.current;
		if (!iframe) return;
		attemptAutofill();
	}, []);

	return (
		<section className="w-full min-h-screen flex flex-col justify-center items-center p-5">
			<iframe
				ref={iframeRef}
				id="cross-origin-iframe"
				src="https://dashboard.waterhub.co.id/login"
				className="w-full max-w-4xl h-[800px] border-0 rounded-lg shadow-lg"
				title="BMS Dashboard"
				allow="fullscreen *;"
				scrolling="no"
				sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals allow-top-navigation allow-presentation"
			/>
		</section>
	);
}

export default Dashboard;
