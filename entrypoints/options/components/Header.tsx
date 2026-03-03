import packageJSON from "../../../package.json";

export function Header() {
	return (
		<header className="flex flex-col gap-6 items-center rounded-lg bg-white p-8 shadow-sm dark:bg-zinc-800/60">
			<h1 className="flex items-center gap-4">
				<img src="/icon.svg" alt="logo" className="h-20 w-20" />
				<div className="leading-none space-y-1 text-3xl text-zinc-900 dark:text-zinc-100">
					<p>Video Stream</p>
					<p className="font-bold">Shortcuts</p>
				</div>
			</h1>
			<div className="flex flex-col items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
				<span className="font-semibold">v{packageJSON.version}</span>
				<a
					href="https://chrome.google.com/webstore/detail/video-stream-shortcuts/jkclfjpmbcenbmmheenahiglgkefekim"
					target="_blank"
					rel="noopener noreferrer"
					className="flex items-center gap-1 hover:text-zinc-900 dark:hover:text-zinc-100 underline underline-offset-2"
				>
					<svg
						aria-hidden="true"
						focusable="false"
						viewBox="0 0 512 512"
						xmlns="http://www.w3.org/2000/svg"
						className="h-4 w-4 fill-current"
					>
						<circle cx="256" cy="256" r="85" />
						<path d="M143.655 231.412C154.947 179.777 201.026 141 256 141h228.861c-12.143-24.107-28.2-46.378-47.841-66.02C388.667 26.629 324.38 0 256 0S123.333 26.629 74.98 74.98a261.02 261.02 0 00-13.337 14.384z" />
						<path d="M290.88 365.587A114.583 114.583 0 01256 371c-42.718 0-80.068-23.414-99.898-58.082a15.462 15.462 0 01-.415-.665L42.011 115.36C14.681 156.76 0 205.25 0 256c0 68.38 26.629 132.667 74.98 181.02 37.043 37.042 83.443 61.316 133.866 70.654z" />
						<path d="M333.379 171C356.48 192.048 371 222.36 371 256c0 21.158-5.75 40.995-15.76 58.044-.102.196-.19.395-.301.588l-113.7 196.936c4.897.276 9.817.432 14.761.432 68.38 0 132.667-26.629 181.02-74.98C485.371 388.667 512 324.38 512 256c0-29.406-4.938-58.05-14.396-85z" />
					</svg>
					Chrome Web Store
				</a>
				<a
					href="https://github.com/mkobayashime/video-stream-shortcuts"
					target="_blank"
					rel="noopener noreferrer"
					className="flex items-center gap-1 hover:text-zinc-900 dark:hover:text-zinc-100 underline underline-offset-2"
				>
					<svg
						aria-hidden="true"
						focusable="false"
						viewBox="0 0 496 512"
						className="h-4 w-4 fill-current"
					>
						<path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 .2 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
					</svg>
					GitHub
				</a>
			</div>
		</header>
	);
}
