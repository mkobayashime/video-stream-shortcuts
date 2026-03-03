import type { ReactNode } from "react";
import { cn } from "./cn";

interface KbdProps {
	children: ReactNode;
	className?: string;
}

export function Kbd({ children, className }: KbdProps) {
	return (
		<kbd
			className={cn(
				"inline-block rounded border border-zinc-400 bg-zinc-100 px-1.5 py-1 font-mono text-xs leading-none dark:border-zinc-600 dark:bg-zinc-800",
				className,
			)}
		>
			{children}
		</kbd>
	);
}
