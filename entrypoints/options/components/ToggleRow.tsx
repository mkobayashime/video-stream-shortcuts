import { Switch } from "react-aria-components";

interface ToggleRowProps {
	keys?: React.ReactNode;
	description: React.ReactNode;
	isSelected: boolean;
	onChange: (value: boolean) => void;
}

export function ToggleRow({
	keys,
	description,
	isSelected,
	onChange,
}: ToggleRowProps) {
	return (
		<Switch
			isSelected={isSelected}
			onChange={onChange}
			className="group flex cursor-pointer items-center justify-between gap-4 outline-none"
		>
			<div className="flex min-w-0 flex-1 items-center gap-2 text-sm text-zinc-700 dark:text-zinc-200">
				{keys !== undefined && <p className="w-32 shrink-0">{keys}</p>}
				<p>{description}</p>
			</div>
			<div
				aria-hidden="true"
				className="relative h-6 w-11 shrink-0 rounded-full bg-zinc-300 transition-colors group-data-[selected]:bg-blue-500 dark:bg-zinc-600 group-data-[selected]:dark:bg-blue-500 ring-blue-500 group-data-[focus-visible]:ring-2 ring-blue-500"
			>
				<div className="absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform group-data-[selected]:translate-x-5" />
			</div>
		</Switch>
	);
}
