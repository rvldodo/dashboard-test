import { api } from "@/trpc/server";

function Dashboard() {
	const mutate = api.logged.bms.proxyRequest.mutate({
		path: "/",
		method: "POST",
	});

	console.log(mutate, " ======== mutate ");

	return (
		<section className="w-full min-h-screen">
			{/* <iframe */}
			{/* 	key={iframeKey} */}
			{/* 	src={bmsConfig.url} */}
			{/* 	className="w-full h-[800px] border-0 rounded-lg" */}
			{/* 	title="BMS Dashboard" */}
			{/* 	allow="same-origin" */}
			{/* 	sandbox="allow-same-origin allow-scripts allow-forms allow-popups" */}
			{/* 	onLoad={() => { */}
			{/* 		console.log("BMS iframe loaded"); */}
			{/* 	}} */}
			{/* /> */}

			<p>Dashboard</p>
		</section>
	);
}

export default Dashboard;
