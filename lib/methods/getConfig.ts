import type { StorageSync } from "../types/storage";

/**
 * Load config in `browser.storage` with key
 */
async function getConfig(key: keyof StorageSync): Promise<unknown>;
async function getConfig(key?: undefined): Promise<StorageSync>;
async function getConfig(
	/**
	 * Key of the config to get. `undefined` to get all the configs.
	 */
	key?: string,
): Promise<StorageSync> {
	if (!key) {
		return await browser.storage.sync.get();
	}

	const values = await browser.storage.sync.get([key]);
	return values[key] as StorageSync;
}

export { getConfig };
