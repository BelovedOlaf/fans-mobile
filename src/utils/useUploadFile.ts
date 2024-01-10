import {
	finishUpload,
	generatePresignedUrl,
	tusUpload,
} from "@helper/endpoints/media/apis";
import { MediaType } from "@usertypes/commonEnums";
import { FileTypeResult, fileTypeFromBlob } from "file-type/core";
import { MutableRefObject, useRef, useState } from "react";
import { getBlobFromUrl } from "./mediaPicker";

function dummy() {}

export interface IUploadFileState {
	isUploading: boolean;
	isSuccess: boolean;
	progress: number;
	uploadedFiles: number;
	totalFiles: number;
}

export interface IUploadedFile {
	id: string;
	url: string;
}

export type IUploadFilesResult =
	| {
			ok: true;
			data: IUploadedFile[];
	  }
	| {
			ok: false;
			data: IUploadedFile[];
			error?: Error;
			errorString: string;
	  };

export interface IUploadFileParam {
	type: MediaType;
	uri: string;
}

export interface IUploadFiles extends IUploadFileState {
	uploadFiles: (files: IUploadFileParam[]) => Promise<IUploadFilesResult>;
	cancelUpload: () => void;
}

const retryDelays = [0, 5000, 10000, 15000, 30000];

async function doUploadS3(
	file: Blob,
	fileType: FileTypeResult,
	type: MediaType,
	onProgress: (progress: number) => void,
	cancelCallback?: MutableRefObject<() => void>,
): Promise<IUploadedFile> {
	const resp = await generatePresignedUrl({}, { type });
	if (!resp.ok) {
		throw new Error("Failed to generate presigned url.");
	}
	const { id, url, presignedUrl } = resp.data;
	let success = false;
	let aborted = false;

	for (let attempt = 0; attempt < retryDelays.length; attempt++) {
		const response = await new Promise<XMLHttpRequest>((resolve) => {
			const xhr = new XMLHttpRequest();
			xhr.upload.addEventListener("progress", (e) => {
				if (e.lengthComputable) {
					const progress = (e.loaded * 100) / e.total;
					// setUploadFileState((s) => ({
					// 	...s,
					// 	progress,
					// }));
					onProgress(progress);
					console.log("progress", progress);
				}
			});
			xhr.addEventListener("loadend", () => {
				resolve(xhr);
			});
			xhr.addEventListener("abort", () => {
				aborted = true;
				resolve(xhr);
			});

			if (cancelCallback)
				cancelCallback.current = () => {
					aborted = true;
					xhr.abort();
				};

			xhr.open("PUT", presignedUrl);
			xhr.setRequestHeader("Content-Type", fileType.mime);
			xhr.send(file);
		});

		if (aborted) {
			success = false;
			break;
		}

		if (response.status >= 200 && response.status < 300) {
			success = true;
			break;
		} else {
			console.log("Failed to upload file. Retrying...");
			await new Promise((resolve) =>
				setTimeout(resolve, retryDelays[attempt]),
			);
		}
	}

	if (aborted) {
		finishUpload({ isSuccess: false }, { id }).catch(() => {});
		throw new Error("Upload aborted.");
	}

	await finishUpload({ isSuccess: success }, { id });
	if (!success) {
		throw new Error("Failed to upload file.");
	}

	return { id, url };
}

async function doUploadCFStream(
	file: Blob,
	fileType: FileTypeResult,
	type: MediaType,
	onProgress: (progress: number) => void,
	cancelCallback?: MutableRefObject<() => void>,
): Promise<IUploadedFile> {
	const tus = await import("tus-js-client");

	const resp = await tusUpload({} as never, { type }, undefined, {
		"upload-length": file.size.toString(),
	});
	if (!resp.ok) {
		throw new Error("Failed to create a video upload.");
	}

	const { id, url, uploadUrl } = resp.data;
	let success = false;
	let aborted = false;

	const upload = new tus.Upload(file, {
		uploadUrl,
		uploadSize: file.size,
		chunkSize: 8 * 1024 * 1024,
		retryDelays,
		removeFingerprintOnSuccess: true,
		onProgress: (bytesUploaded, bytesTotal) => {
			const progress = (bytesUploaded * 100) / bytesTotal;
			onProgress(progress);
		},
	});

	await new Promise<void>((resolve) => {
		upload.options.onSuccess = () => {
			success = true;
			resolve();
		};
		upload.options.onError = (err) => {
			console.error("Failed to upload file.", err);
			success = false;
			resolve();
		};

		if (cancelCallback)
			cancelCallback.current = () => {
				aborted = true;
				upload
					.abort(true)
					.catch((e) => console.error("Failed to abort upload.", e));
				resolve();
			};

		// upload.findPreviousUploads().then(function (previousUploads) {
		// 	if (previousUploads.length) {
		// 		upload.resumeFromPreviousUpload(previousUploads[0]);
		// 	}
		upload.start();
		// });
	});

	if (aborted) {
		finishUpload({ isSuccess: false }, { id }).catch(() => {});
		throw new Error("Upload aborted.");
	}

	await finishUpload({ isSuccess: success }, { id });
	if (!success) {
		throw new Error("Failed to upload file.");
	}

	return { id, url };
}

async function doUpload(
	file: Blob,
	fileType: FileTypeResult,
	type: MediaType,
	onProgress: (progress: number) => void,
	cancelCallback?: MutableRefObject<() => void>,
): Promise<IUploadedFile> {
	if (type === MediaType.Video) {
		return doUploadCFStream(
			file,
			fileType,
			type,
			onProgress,
			cancelCallback,
		);
	}

	return doUploadS3(file, fileType, type, onProgress, cancelCallback);
}

export default function useUploadFiles() {
	const cancelRef = useRef<() => void>(dummy);
	const [uploadFileState, setUploadFileState] = useState<IUploadFileState>({
		isUploading: false,
		isSuccess: false,
		progress: 0,
		uploadedFiles: 0,
		totalFiles: 0,
	});

	const uploadFiles = async (
		files: IUploadFileParam[],
	): Promise<IUploadFilesResult> => {
		if (uploadFileState.isUploading) {
			throw new Error("Already uploading.");
		}

		if (files.length === 0) {
			const error = new Error("No files.");
			return { ok: false, data: [], error, errorString: error.message };
		}

		setUploadFileState((s) => ({
			...s,
			totalFiles: s.totalFiles + files.length,
		}));

		const paths: { id: string; url: string }[] = [];

		try {
			setUploadFileState((s) => ({ ...s, isUploading: true }));
			for (const { uri, type } of files) {
				setUploadFileState((s) => ({
					...s,
					progress: 0,
				}));

				console.log("Uploading file", uri, type);

				const file = await getBlobFromUrl(uri);
				if (!file) {
					throw new Error("Failed to get blob from url.");
				}

				const fileType = await fileTypeFromBlob(file.slice(0, 4100));
				if (!fileType) {
					throw new Error("Failed to detect type of uploaded file.");
				}

				const uploadedFile = await doUpload(
					file,
					fileType,
					type,
					(progress) => {
						setUploadFileState((s) => ({
							...s,
							progress,
						}));
					},
					cancelRef,
				);
				cancelRef.current = dummy;

				paths.push(uploadedFile);

				setUploadFileState((s) => ({
					...s,
					uploadedFiles: s.uploadedFiles + 1,
					progress: 0,
				}));
			}
			return {
				ok: true,
				data: paths,
			};
		} catch (e) {
			console.error("Failed to upload file:", e);
			(async () => {
				paths.map(({ id }) =>
					finishUpload({ isSuccess: false }, { id }).catch(() => {}),
				);
			})();

			if (e instanceof Error) {
				return {
					ok: false,
					data: [],
					error: e,
					errorString: e.message,
				};
			} else if (typeof e === "string") {
				return { ok: false, data: [], errorString: e };
			} else {
				return { ok: false, data: [], errorString: "Unknown error." };
			}
		} finally {
			setUploadFileState((s) => ({ ...s, isUploading: false }));
		}
	};

	const cancelUpload = () => {
		cancelRef.current();
	};

	return {
		...uploadFileState,
		progress: Math.round(
			(uploadFileState.uploadedFiles * 100 + uploadFileState.progress) /
				Math.max(1, uploadFileState.totalFiles),
		),
		uploadFiles,
		cancelUpload,
	};
}
