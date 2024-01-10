import React from "react";
import {
	Chart,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { FansText, FansView } from "@components/controls";
import { ITimeline } from "@usertypes/types";

Chart.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
);

const options = {
	responsive: true,
	plugins: {
		legend: {
			display: false,
		},
	},
};

interface Props {
	timeline: ITimeline[];
	duration: string;
	period: string;
	setDuration: (duration: string) => void;
}

const LineChart = (props: Props) => {
	const { timeline, setDuration, duration, period } = props;

	return (
		<FansView gap={26.2}>
			<Line
				options={options}
				data={{
					labels: timeline.map((item) => {
						const date = new Date(item.date);
						if (duration === "Today") {
							return `${date.getHours()}:00`;
						} else if (["1W", "1M"].includes(duration)) {
							return `${date.toLocaleDateString("en-US", {
								month: "short",
								day: "2-digit",
							})}`;
						} else if (["3M", "6M", "1Y"].includes(duration)) {
							return `${date.toLocaleDateString("en-US", {
								month: "short",
							})}`;
						} else {
							if (period === "day") {
								return `${date.toLocaleDateString("en-US", {
									month: "short",
									day: "2-digit",
								})}`;
							} else if (["week", "month"].includes(period)) {
								return `${date.toLocaleDateString("en-US", {
									month: "short",
								})}`;
							} else {
								return `${date.toLocaleDateString("en-US", {
									year: "numeric",
								})}`;
							}
						}
					}),
					datasets: [
						{
							data: timeline.map((item) => item.earnings),
							tension: 0.8,
							borderColor: "#4DCC36",
						},
					],
				}}
			/>
			<FansView
				height={34}
				alignItems="center"
				borderColor="green-4d"
				borderRadius="full"
				flexDirection="row"
				justifyContent="around"
			>
				{["Today", "1W", "1M", "3M", "6M", "1Y", "All"].map(
					(item, index) => {
						const isActive = item === duration;

						const handlePressDuration = () => setDuration(item);

						return (
							<FansView
								key={index}
								height={20}
								touchableOpacityProps={{
									onPress: handlePressDuration,
								}}
								backgroundColor={
									isActive ? "green-4d" : "white"
								}
								borderRadius="full"
								justifyContent="center"
								padding={{
									x: 10,
								}}
							>
								<FansText
									color={isActive ? "white" : "green-4d"}
									fontFamily="inter-semibold"
									fontSize={14}
									textTransform="uppercase"
								>
									{item}
								</FansText>
							</FansView>
						);
					},
				)}
			</FansView>
		</FansView>
	);
};

export default LineChart;
