import { Header } from "./components/Header";
import { Kbd } from "./components/Kbd";
import { ReleaseNotes } from "./components/ReleaseNotes";
import { SectionCard } from "./components/SectionCard";
import { SeekSecField } from "./components/SeekSecField";
import { SpeedSelect } from "./components/SpeedSelect";
import { ToggleRow } from "./components/ToggleRow";
import { useStorage } from "./hooks/useStorage";

export function App() {
	const { settings, isLoading, setSetting } = useStorage();

	if (isLoading) {
		return null;
	}

	return (
		<div className="min-h-screen bg-zinc-100 px-4 py-8 dark:bg-zinc-900">
			<div className="mx-auto max-w-2xl space-y-6">
				<Header />

				<SectionCard title="Enabled Sites">
					<div className="space-y-6">
						<ToggleRow
							description="Prime Video"
							isSelected={settings["sites-prime-video"] ?? true}
							onChange={(v) => setSetting("sites-prime-video", v)}
						/>
						<ToggleRow
							description="TED"
							isSelected={settings["sites-ted"] ?? true}
							onChange={(v) => setSetting("sites-ted", v)}
						/>
						<ToggleRow
							description="DAZN"
							isSelected={settings["sites-dazn"] ?? true}
							onChange={(v) => setSetting("sites-dazn", v)}
						/>
						<ToggleRow
							description="Microsoft Stream"
							isSelected={settings["sites-ms-stream"] ?? true}
							onChange={(v) => setSetting("sites-ms-stream", v)}
						/>
						<ToggleRow
							description="OPENREC"
							isSelected={settings["sites-openrec"] ?? true}
							onChange={(v) => setSetting("sites-openrec", v)}
						/>
					</div>
				</SectionCard>

				<SectionCard title="Enabled Shortcuts">
					<div className="space-y-6">
						<ToggleRow
							keys={<Kbd>k</Kbd>}
							description="Pause/Resume the video"
							isSelected={settings["keys-k"] ?? true}
							onChange={(v) => setSetting("keys-k", v)}
						/>
						<ToggleRow
							keys={<Kbd>j</Kbd>}
							description={`Move backward ${settings["seek-sec"] ?? 10} seconds`}
							isSelected={settings["keys-j"] ?? true}
							onChange={(v) => setSetting("keys-j", v)}
						/>
						<ToggleRow
							keys={<Kbd>l</Kbd>}
							description={`Move forward ${settings["seek-sec"] ?? 10} seconds`}
							isSelected={settings["keys-l"] ?? true}
							onChange={(v) => setSetting("keys-l", v)}
						/>
						<ToggleRow
							keys={<Kbd>f</Kbd>}
							description="Enter/Leave fullscreen"
							isSelected={settings["keys-f"] ?? true}
							onChange={(v) => setSetting("keys-f", v)}
						/>
						<ToggleRow
							keys={<Kbd>m</Kbd>}
							description="Mute/Unmute"
							isSelected={settings["keys-m"] ?? true}
							onChange={(v) => setSetting("keys-m", v)}
						/>
						<ToggleRow
							keys={
								<>
									<Kbd>Shift+,</Kbd>
									{" / "}
									<Kbd>{"<"}</Kbd>
								</>
							}
							description="Decrease playback speed"
							isSelected={settings["keys-left-arrow"] ?? true}
							onChange={(v) => setSetting("keys-left-arrow", v)}
						/>
						<ToggleRow
							keys={
								<>
									<Kbd>Shift+.</Kbd>
									{" / "}
									<Kbd>{">"}</Kbd>
								</>
							}
							description="Increase playback speed"
							isSelected={settings["keys-right-arrow"] ?? true}
							onChange={(v) => setSetting("keys-right-arrow", v)}
						/>
						<ToggleRow
							keys={
								<>
									<Kbd>0</Kbd>
									{"–"}
									<Kbd>9</Kbd>
								</>
							}
							description={
								<>
									Jump to percentage of video
									<br />
									<span className="text-xs text-zinc-500 dark:text-zinc-400">
										except for DAZN/OPENREC
									</span>
								</>
							}
							isSelected={settings["keys-decimal"] ?? true}
							onChange={(v) => setSetting("keys-decimal", v)}
						/>
					</div>
				</SectionCard>

				<SectionCard title="Default Playback Speeds">
					<div className="space-y-4">
						<SpeedSelect
							label="Prime Video"
							value={settings["speed-prime-video"] ?? 1}
							onChange={(v) => setSetting("speed-prime-video", v)}
						/>
						<SpeedSelect
							label="Microsoft Stream"
							value={settings["speed-ms-stream"] ?? 1}
							onChange={(v) => setSetting("speed-ms-stream", v)}
						/>
					</div>
				</SectionCard>

				<SectionCard title="Others">
					<SeekSecField
						value={settings["seek-sec"] ?? 10}
						onChange={(v) => setSetting("seek-sec", v)}
					/>
				</SectionCard>

				<SectionCard title="Release Notes">
					<ReleaseNotes />
				</SectionCard>
			</div>
		</div>
	);
}
