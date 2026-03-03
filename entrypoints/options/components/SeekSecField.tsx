import { Input, NumberField } from "react-aria-components";
import { Kbd } from "./Kbd";

interface SeekSecFieldProps {
	value: number;
	onChange: (value: number) => void;
}

export function SeekSecField({ value, onChange }: SeekSecFieldProps) {
	return (
		<div className="flex items-center justify-between py-2">
			<span className="text-sm text-zinc-700 dark:text-zinc-200">
				Seconds moved by <Kbd>j</Kbd>
				{" / "}
				<Kbd>l</Kbd> keys
			</span>
			<NumberField
				minValue={1}
				maxValue={30}
				value={value}
				onChange={onChange}
				aria-label="Seek seconds"
			>
				<div className="flex items-center gap-1">
					<Input className="w-16 rounded-md border border-zinc-300 bg-white px-2 py-1.5 text-center text-sm text-zinc-900 outline-none focus-visible:ring-1 ring-blue-500 dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-100" />
					<span className="text-sm text-zinc-500 dark:text-zinc-400">s</span>
				</div>
			</NumberField>
		</div>
	);
}
