import { getConfig } from "../lib/methods/getConfig";
import isTyping from "../lib/methods/isTyping";

export default defineContentScript({
	matches: ["https://f1tv.formula1.com/*"],
	main() {
		void getConfig().then((config) => {
			if (config["sites-f1tv"]) {
				document.addEventListener("keyup", (e) => {
					if (isTyping()) return;

					switch (e.key) {
						case "k": {
							if (config["keys-k"]) {
								const button = document.querySelector(
									"button[class*='-playbacktogglebutton']",
								);
								if (button instanceof HTMLElement) button.click();
							}
							break;
						}
						case "j": {
							if (config["keys-j"]) {
								const button = document.querySelector(
									"button[class*='-rewindbutton']",
								);
								if (button instanceof HTMLElement) button.click();
							}
							break;
						}
						case "l": {
							if (config["keys-l"]) {
								const button = document.querySelector(
									"button[class*='-forwardbutton']",
								);
								if (button instanceof HTMLElement) button.click();
							}
							break;
						}
						case "m": {
							if (config["keys-m"]) {
								const button = document.querySelector(
									"button[class*='-volumetogglebutton']",
								);
								if (button instanceof HTMLElement) button.click();
							}
							break;
						}
					}
				});
			}
		});
	},
});
