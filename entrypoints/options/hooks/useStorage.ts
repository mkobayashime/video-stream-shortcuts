import { useCallback, useEffect, useState } from "react";
import type { StorageSync } from "../../../lib/types/storage";

export function useStorage() {
	const [state, setState] = useState<{
		settings: StorageSync;
		isLoading: boolean;
	}>({ settings: {}, isLoading: true });

	useEffect(() => {
		void browser.storage.sync
			.get()
			.then((v) => setState({ settings: v as StorageSync, isLoading: false }));
	}, []);

	const setSetting = useCallback(
		<K extends keyof StorageSync>(key: K, value: StorageSync[K]) => {
			setState((prev) => ({
				...prev,
				settings: { ...prev.settings, [key]: value },
			}));
			void browser.storage.sync.set({ [key]: value });
		},
		[],
	);

	return { ...state, setSetting };
}
