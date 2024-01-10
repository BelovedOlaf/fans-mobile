import { Platform } from "react-native";

export enum MediaTypeOptions {
	All = "All",
	Images = "Images",
	Videos = "Videos",
	Audio = "Audio",
}

const MediaTypeInput = {
	[MediaTypeOptions.All]:
		"video/mp4,video/quicktime,video/x-m4v,video/*,image/*,audio/*",
	[MediaTypeOptions.Images]: "image/*",
	[MediaTypeOptions.Videos]: "video/mp4,video/quicktime,video/x-m4v,video/*",
	[MediaTypeOptions.Audio]: "audio/mpeg,audio/mp3,audio/mp4,audio/aac",
};

export interface MediaPickerOptions {
	mediaTypes: MediaTypeOptions | "Audio";
	capture: boolean;
	allowsMultipleSelection: boolean;
}

export interface MediaPickerResult {
	canceled: boolean;
	files: string[];
}

export const blobMap = new Map<string, Blob>();

export async function getBlobFromUrl(uri: string): Promise<Blob | undefined> {
	const blob = blobMap.get(uri);
	if (blob) {
		return blob;
	}

	return await fetch(uri).then((res) => res.blob());
}

export async function openMediaPicker(
	options: Partial<MediaPickerOptions>,
): Promise<MediaPickerResult> {
	if (Platform.OS !== "web") {
		// TODO: Use Expo's wrapper for this.
		throw new Error("This function is only available on web.");
	}

	const allOptions = {
		mediaTypes: MediaTypeOptions.All,
		capture: false,
		allowsMultipleSelection: false,
		...options,
	};
	const input: HTMLInputElement = document.createElement("input");
	input.style.display = "none";
	input.setAttribute("type", "file");
	input.setAttribute("accept", MediaTypeInput[allOptions.mediaTypes]);
	input.setAttribute("id", String(Math.random()));

	if (allOptions.capture) {
		input.setAttribute("capture", "camera");
	}
	if (allOptions.allowsMultipleSelection) {
		input.setAttribute("multiple", "multiple");
	}

	document.body.appendChild(input);

	return await new Promise((resolve) => {
		input.addEventListener("change", () => {
			if (input.files) {
				const files = Array.from(input.files).map((f) => {
					const url = URL.createObjectURL(f);
					blobMap.set(url, f);
					return url;
				});

				resolve({
					canceled: false,
					files,
				});
			} else {
				resolve({
					canceled: true,
					files: [],
				});
			}
			document.body.removeChild(input);
		});
		input.dispatchEvent(new MouseEvent("click"));
	});
}
