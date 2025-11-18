import dataApi from "@/api/dataApi";
import { useQuery } from "@tanstack/react-query";
import { Card } from "antd";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const DepositChart = () => {
	const [options, setOptions] = useState({});
	const [series, setSeries] = useState([]);

	const { data: response, isLoading } = useQuery({
		queryKey: ["dataApi.deposit"],
		queryFn: () => dataApi.deposit()
	});

	useEffect(() => {
		if (!isLoading && response && response.success) {
			const labels = response.data.map((item: any) => item.method);
			const amounts = response.data.map((item: any) => Number(item.total_amount));

			setOptions({
				labels,
				legend: {
					position: "bottom",
					formatter: (seriesName: string, opts: any) => {
						const value = opts.w.globals.series[opts.seriesIndex];
						return `${seriesName}: $${value.toLocaleString()}`;
					}
				},
				tooltip: {
					y: {
						formatter: (value: number) => `$${value.toLocaleString()}`
					}
				},
				dataLabels: {
					formatter: (value: number, opts: any) => {
						const realValue = opts.w.globals.series[opts.seriesIndex];
						return `$${realValue.toLocaleString()}`;
					}
				}
			});

			setSeries(amounts);
		}
	}, [response, isLoading]);

	if (isLoading) {
		return <div className="text-center">Loading chart...</div>;
	}

	return (
		<Card title="Deposits">
			<Chart
				options={options}
				series={series}
				type="pie"
				width={380}
			/>
		</Card>
	);
}

export default DepositChart;