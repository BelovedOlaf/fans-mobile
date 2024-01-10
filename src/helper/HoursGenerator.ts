export function generateTimeFrames(intervalMinutes: number): string[] {
	const timeFrames: string[] = [];
	const totalMinutesInDay = 24 * 60; // Total minutes in a day (24 hours)

	for (
		let minutes = 0;
		minutes < totalMinutesInDay;
		minutes += intervalMinutes
	) {
		const hour = Math.floor(minutes / 60);
		const minute = minutes % 60;

		const formattedHour = hour.toString().padStart(2, "0");
		const formattedMinute = minute.toString().padStart(2, "0");

		timeFrames.push(`${formattedHour}:${formattedMinute}`);
	}

	return timeFrames;
}
