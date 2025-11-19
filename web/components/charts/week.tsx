import dataApi from "@/api/dataApi";
import { useQuery } from "@tanstack/react-query";
import { Card } from "antd";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";

dayjs.extend(isoWeek);

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const WeekChart = () => {
	const [options, setOptions] = useState({});
	const [series, setSeries] = useState<{ name: string; data: number[] }[]>([]);

	const { data: response, isLoading } = useQuery({
		queryKey: ["dataApi.week"],
		queryFn: () => dataApi.week()
	});

	useEffect(() => {
		if (!isLoading && response && response.success) {
			const chartData = response.data ?? [];

			const days = chartData.map((item: any) => item.day);
			// const profits = chartData.map((item: any) => Number(item.profit.toFixed(2)));

			const monday = dayjs("2025-10-16").isoWeekday(1);
			const sunday = dayjs("2025-10-16").isoWeekday(5);
			const weekDays: string[] = [];

			for (let d = monday; d.isBefore(sunday) || d.isSame(sunday); d = d.add(1, "day")) {
				weekDays.push(d.format("YYYY-MM-DD"));
			}

			const apiData: Record<string, number> = {};
			(response.data ?? []).forEach((item: any) => {
				apiData[item.day] = Number(item.profit.toFixed(2));
			});

			const profits = weekDays.map(day => apiData[day] ?? 0);

			setOptions({
				chart: {
					type: "bar",
					height: 350
				},
				xaxis: {
					categories: weekDays
				},
				plotOptions: {
					bar: {
						colors: {
							ranges: [
								{ from: -999999, to: 0, color: "#FF4560" },
								{ from: 0.01, to: 999999, color: "#00E396" }
							]
						}
					}
				},
				dataLabels: {
					enabled: true,
					formatter: (val: number) => `$${val.toFixed(2)}`
				},
				tooltip: {
					y: {
						formatter: (val: number) => `$${val.toFixed(2)}`
					}
				}
			});

			setSeries([
				{
					name: "Daily Profit",
					data: profits
				}
			]);
		}
	}, [response, isLoading]);

	if (isLoading) {
		return <div className="text-center">Loading chart...</div>;
	}

	return (
		<Card title="Weekly Profit">
			<Chart
				options={options}
				series={series}
				type="bar"
				width={380}
			/>
		</Card>
	);
}

export default WeekChart;