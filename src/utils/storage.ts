import AsyncStorage from "@react-native-async-storage/async-storage";

// import base modules
import { StorageKeyTypes } from "@usertypes/commonEnums";

/**
 * Gets the value of the key from the persistent storage.
 * @param key key to get the value of
 * @returns the value of the key
 */
export const getStorage = async (key: string) => {
	try {
		const out = await AsyncStorage.getItem(key);
		return out;
	} catch (e) {
		console.error("Failed to read from storage", e);
		return null;
	}
};

/**
 * Sets the value of the key in the persistent storage.
 * @param key key to set the value of
 * @param value value to set
 */
export const setStorage = async (
	key: string,
	value?: string | null | undefined,
) => {
	try {
		if (value === undefined || value === null)
			await AsyncStorage.removeItem(key);
		else await AsyncStorage.setItem(key, value);
	} catch (e) {
		console.error("Failed to write to storage", e);
	}
};

/**
 * Gets a JSON object from the persistent storage.
 * @param key key to get the value of
 * @returns the value of the key
 */
export const getObjectStorage = async (key: string) => {
	try {
		const jsonValue = await AsyncStorage.getItem(key);
		return jsonValue != null ? JSON.parse(jsonValue) : null;
	} catch (e) {
		console.error("Failed to read from storage", e);
		return null;
	}
};

/**
 * Sets a JSON object in the persistent storage.
 * @param key key to set the value of
 * @param value value to set
 */
export const setObjectStorage = async (key: string, value: unknown) => {
	try {
		if (!value) {
			await AsyncStorage.removeItem(key);
		} else {
			await AsyncStorage.setItem(key, JSON.stringify(value));
		}
	} catch (e) {
		console.error("Failed to write to storage", e);
	}
};

/**
 * Clears all the data from the persistent storage.
 */
export const clearAllStorage = async () => {
	try {
		await AsyncStorage.clear();
	} catch (e) {
		console.error("Failed to clear the async storage.", e);
	}
};

export const getUser = async () => {
	return await getObjectStorage(StorageKeyTypes.UserInfo);
};

const volatileStorage = new Map<string, string>();

/**
 * Sets the value of the key in the volatile storage.
 * @param key key to set the value of
 * @param value value to set
 */
export const setVolatileStorage = (
	key: string,
	value?: string | null | undefined,
) => {
	if (value === undefined || value === null) {
		volatileStorage.delete(key);
	} else {
		volatileStorage.set(key, value);
	}
};

/**
 * Returns the value of the key from the volatile storage.
 * @param key key to get the value of
 * @returns the value of the key
 */
export const getVolatileStorage = (key: string) => {
	return volatileStorage.get(key);
};

/**
 * Returns the value of the key and deletes it from the volatile storage.
 * @param key key to get the value of
 * @returns the value of the key
 */
export const takeVolatileStorage = (key: string) => {
	const value = volatileStorage.get(key);
	volatileStorage.delete(key);
	return value;
};

export default {
	getObject: getObjectStorage,
};
