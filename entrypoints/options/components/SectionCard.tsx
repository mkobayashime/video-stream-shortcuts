import type { ReactNode } from "react";

interface SectionCardProps {
	title: string;
	children: ReactNode;
}

export function SectionCard({ title, children }: SectionCardProps) {
	return (
		<section className="rounded-lg bg-white p-8 shadow-sm dark:bg-zinc-800/60">
			<h2 className="mb-6 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
				{title}
			</h2>
			{children}
		</section>
	);
}
