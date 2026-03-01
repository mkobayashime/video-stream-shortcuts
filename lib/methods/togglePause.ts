const togglePause = (media: HTMLVideoElement) => {
	if (media.paused) {
		void media.play();
	} else {
		media.pause();
	}
};

export default togglePause;
