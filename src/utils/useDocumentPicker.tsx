import { MediaTypeOptions, openMediaPicker } from "./mediaPicker";

const useDocumentPicker = () => {
	const useAudioPicker = async (multiple?: boolean) => {
		try {
			const result = await openMediaPicker({
				mediaTypes: MediaTypeOptions.Audio,
				allowsMultipleSelection: multiple,
			});

			if (!result.canceled) {
				return {
					ok: true,
					data: result.files.map((asset, index) => ({
						id: `${new Date().getTime()}-${index}`,
						uri: asset,
						isPicker: true,
					})),
				};
			}
		} catch (error) {
			return {
				ok: false,
				message: error as string,
			};
		}
	};

	const useVideoPicker = async (multiple?: boolean) => {
		try {
			const result = await openMediaPicker({
				mediaTypes: MediaTypeOptions.Videos,
				allowsMultipleSelection: multiple,
			});

			if (!result.canceled) {
				return {
					ok: true,
					data: result.files.map((asset, index) => ({
						id: `${new Date().getTime()}-${index}`,
						uri: asset,
						isPicker: true,
					})),
				};
			}
		} catch (error) {
			return {
				ok: false,
				message: error as string,
			};
		}
	};

	const useImagePicker = async (multiple?: boolean) => {
		try {
			const result = await openMediaPicker({
				mediaTypes: MediaTypeOptions.Images,
				allowsMultipleSelection: multiple,
			});

			if (!result.canceled) {
				return {
					ok: true,
					data: result.files.map((asset, index) => ({
						id: `${new Date().getTime()}-${index}`,
						uri: asset,
						isPicker: true,
					})),
				};
			}
		} catch (error) {
			return {
				ok: false,
				message: error as string,
			};
		}
	};

	return {
		useAudioPicker,
		useVideoPicker,
		useImagePicker,
	};
};

export default useDocumentPicker;
