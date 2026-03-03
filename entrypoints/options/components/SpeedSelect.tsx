import {
	Button,
	ListBox,
	ListBoxItem,
	Popover,
	Select,
	SelectValue,
} from "react-aria-components";

const SPEED_OPTIONS = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

interface SpeedSelectProps {
	label: string;
	value: number;
	onChange: (value: number) => void;
}

export function SpeedSelect({ label, value, onChange }: SpeedSelectProps) {
	return (
		<div className="flex items-center justify-between">
			<span className="text-sm text-zinc-700 dark:text-zinc-200">{label}</span>
			<Select
				selectedKey={String(value)}
				onSelectionChange={(key) => onChange(Number(key))}
				aria-label={`Playback speed for ${label}`}
			>
				<Button className="flex min-w-20 items-center justify-between gap-2 rounded-md border border-zinc-300 bg-white px-3 py-1.5 text-sm text-zinc-900 outline-none transition-colors hover:bg-zinc-50 focus-visible:ring-1 ring-blue-500 dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-600">
					<SelectValue />
					<span aria-hidden="true" className="text-zinc-400">
						▾
					</span>
				</Button>
				<Popover className="rounded-md border border-zinc-200 bg-white shadow-lg dark:border-zinc-700 dark:bg-zinc-800">
					<ListBox className="outline-none">
						{SPEED_OPTIONS.map((speed) => (
							<ListBoxItem
								key={String(speed)}
								id={String(speed)}
								textValue={`${speed}x`}
								className="cursor-pointer px-4 py-1.5 text-sm text-zinc-700 outline-none hover:bg-zinc-100 data-[focused]:bg-zinc-100 data-[selected]:font-semibold data-[selected]:text-blue-600 dark:text-zinc-200 dark:hover:bg-zinc-700 dark:data-[focused]:bg-zinc-700 dark:data-[selected]:text-blue-400"
							>
								{speed}x
							</ListBoxItem>
						))}
					</ListBox>
				</Popover>
			</Select>
		</div>
	);
}
