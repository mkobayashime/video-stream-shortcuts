import type { ReactNode } from "react";
import { Kbd } from "./Kbd";

interface VersionEntryProps {
	version: string;
	children: ReactNode;
}

function VersionEntry({ version, children }: VersionEntryProps) {
	return (
		<div className="space-y-2">
			<h3 className="text-base text-zinc-900 dark:text-zinc-100">{version}</h3>
			<div className="space-y-1 text-zinc-600 dark:text-zinc-400">
				{children}
			</div>
		</div>
	);
}

const kbdClass = "text-zinc-600 dark:text-zinc-400";

export function ReleaseNotes() {
	return (
		<div className="space-y-4 text-sm">
			<VersionEntry version="6.1.0">
				<p>Rewrite options page with React</p>
			</VersionEntry>
			<VersionEntry version="6.0.0">
				<p>Refactor using WXT framework</p>
			</VersionEntry>
			<VersionEntry version="5.0.2">
				<p>Migrate to Manifest Version 3</p>
			</VersionEntry>
			<VersionEntry version="4.2.0">
				<p>
					Ensure <Kbd className={kbdClass}>k</Kbd> key works in DAZN
				</p>
				<p>Dependency upgrades</p>
			</VersionEntry>
			<VersionEntry version="4.1.0">
				<p>Support OPENREC</p>
				<p>Dependency upgrades</p>
			</VersionEntry>
			<VersionEntry version="4.0.0">
				<p>This extension is now written in TypeScript</p>
			</VersionEntry>
			<VersionEntry version="3.9.0">
				<p>
					Seek with <Kbd className={kbdClass}>0</Kbd>–
					<Kbd className={kbdClass}>9</Kbd> keys
				</p>
				<p>Improve stability in Prime Video</p>
			</VersionEntry>
			<VersionEntry version="3.8.0">
				<p>Dependency upgrades</p>
			</VersionEntry>
			<VersionEntry version="3.7.0">
				<p>Improve stability in DAZN</p>
			</VersionEntry>
			<VersionEntry version="3.6.0">
				<p>Improve stability in MS Stream</p>
			</VersionEntry>
			<a
				href="https://github.com/mkobayashime/video-stream-shortcuts/releases"
				target="_blank"
				rel="noopener noreferrer"
				className="inline-block text-blue-500 underline underline-offset-2 dark:text-blue-400"
			>
				Older versions
			</a>
		</div>
	);
}
