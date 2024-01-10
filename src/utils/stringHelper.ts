import moment from "moment";

export function formatNumber(num: number | null) {
	if (!num) return 0;
	if (num >= 1000000000) {
		return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "G";
	}
	if (num >= 1000000) {
		return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
	}
	if (num >= 1000) {
		return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
	}
	return num;
}

// add commas to the every 3 numbers
export function addCommasPerThreeNumber(num: number) {
	const characters = parseInt(num.toString(), 10).toString();
	let output = "";
	for (let offset = characters.length; offset > 0; offset -= 3) {
		output =
			characters.slice(Math.max(offset - 3, 0), offset) +
			(output ? "," + output : "");
	}
	return output;
}

export function truncateText(text: string, length: number) {
	if (text.length <= length) {
		return text;
	} else {
		return `${text.slice(0, length)}...`;
	}
}

export function validateMigrationLink(url: string) {
	if (
		url.includes("https://onlyfans.com") ||
		url.includes("https://patreon.com")
	) {
		return true;
	} else {
		return false;
	}
}

export function validateNumberString(numStr: string) {
	try {
		if (numStr === "") {
			return false;
		}
		return !!numStr.match(/^[0-9.]+$/);
	} catch {
		return false;
	}
}

function toQueryString(params: Object) {
	return (
		"?" +
		Object.entries(params)
			.map(
				([key, value]) =>
					`${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
			)
			.join("&")
	);
}

export function getPriceString(amount: number, currency: string) {
	switch (currency) {
		case "USD":
			return `$${amount}`;
		case "EUR":
			return `€${amount}`;
		case "GBP":
			return `£${amount}`;
		case "AUD":
			return `$${amount}`;
		case "CAD":
			return `$${amount}`;
		case "JPY":
			return `¥${amount}`;
		case "CNY":
			return `¥${amount}`;
		case "KRW":
			return `$${amount}`;
		case "INR":
			return `$${amount}`;
		case "BRL":
			return `$${amount}`;
		case "RUB":
			return `$${amount}`;
		case "ZAR":
			return `$${amount}`;
		default:
			return `$${amount}`;
	}
}

export function getBundlePrice(
	subscribePrice: number,
	months: number,
	discount: number,
	currency: string,
) {
	const price = (subscribePrice * months * (100 - discount)) / 100;
	return getPriceString(price, currency);
}

export function getBirthdayString(dateStr: string) {
	try {
		return moment(dateStr).utcOffset("+000", true).format("MMMM DD");
	} catch {
		return "";
	}
}

export function convertTrackingTime(time: number) {
	try {
		const hours = Math.trunc(time / 3600);
		const mins = Math.trunc((time - hours * 3600) / 60);
		const seconds = Math.trunc(time - hours * 3600 - mins * 60);

		return hours > 0
			? `${hours.toString().padStart(2)}:${mins
					.toString()
					.padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
			: `${mins.toString().padStart(2, "0")}:${seconds
					.toString()
					.padStart(2, "0")}`;
	} catch {
		return "";
	}
}
