const toggleFullsceen = (media: HTMLVideoElement) => {
	if (!document.fullscreenElement) {
		void media.requestFullscreen();
	} else {
		void document.exitFullscreen();
	}
};

export default toggleFullsceen;
