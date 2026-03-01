import "../../assets/indicator.sass";

export namespace createIndicator {
	export type Props = PropsWithoutWrapper & {
		/**
		 * Wrapper element sized the same as the video
		 */
		wrapper: HTMLElement;
	};

	export type PropsWithoutWrapper =
		| {
				type: "icon";
				/**
				 * Id of the icon
				 */
				id: "togglePause" | "seekForward" | "seekBackward" | "mute";
				media: HTMLVideoElement;
		  }
		| {
				type: "text";
				/**
				 * String to be displayed in "text" type
				 */
				text: string;
		  };
}

export const createIndicator = (props: createIndicator.Props) => {
	if (!props.wrapper) {
		throw new Error('"wrapper" must not be undefined');
	}
	if (!props.type) {
		throw new Error('"type" must not be undefined');
	}

	const indicatorOuter = document.createElement("div");
	indicatorOuter.className = "indicatorOuter";

	const indicatorInner = document.createElement("div");
	indicatorInner.className = "indicatorInner";
	indicatorOuter.appendChild(indicatorInner);

	if (props.type === "icon") {
		if (!props.id) {
			throw new Error('"id" must not be undefined');
		}
		const indicatorIcon = document.createElement("img");
		switch (props.id) {
			case "togglePause": {
				if (!props.media) {
					throw new Error('"media" must not be undefined');
				}
				if (props.media.paused) {
					indicatorIcon.src = browser.runtime.getURL("/svg/pause.svg");
				} else {
					indicatorIcon.src = browser.runtime.getURL("/svg/play_arrow.svg");
				}
				break;
			}
			case "seekForward": {
				indicatorIcon.src = browser.runtime.getURL("/svg/forward.svg");
				break;
			}
			case "seekBackward": {
				indicatorIcon.src = browser.runtime.getURL("/svg/replay.svg");
				break;
			}
			case "mute": {
				indicatorIcon.src = browser.runtime.getURL("/svg/volume_off.svg");
				break;
			}
		}
		indicatorInner.appendChild(indicatorIcon);
	} else if (props.type === "text") {
		const indicatorText = document.createElement("p");
		indicatorText.innerHTML = props.text;
		indicatorInner.appendChild(indicatorText);
	}

	props.wrapper.appendChild(indicatorOuter);

	// Remove the DOM after it disappeared with CSS Animation
	window.setTimeout(() => {
		indicatorOuter.remove();
	}, 600);
};
