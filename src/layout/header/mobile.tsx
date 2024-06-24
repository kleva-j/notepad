"use client";

import { type PropsWithChildren, useState } from "react";

import { SheetContent, Sheet } from "@/ui/sheet";
import { Button } from "@/components/ui/button";
import { X, Menu } from "lucide-react";
import { cn } from "@/lib/utils";

import Link from "next/link";

type MobileHeaderProps = PropsWithChildren & {
	links: { href: string; label: string }[];
};

export const MobileHeader = ({ children, links }: MobileHeaderProps) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div
			className={cn(
				"px-4 pt-2 md:hidden",
				isOpen && "z-40 size-full min-h-screen bg-zinc-50 dark:bg-zinc-950",
			)}
		>
			<div className="flex items-center justify-between pb-2">
				{children}
				<Button
					onClick={() => setIsOpen(!isOpen)}
					size="icon"
					className="rounded-xl"
					variant="outline"
				>
					{isOpen ? <X /> : <Menu />}
				</Button>
			</div>

			<Sheet open={isOpen} onOpenChange={setIsOpen}>
				<SheetContent>
					<div className="grid gap-4 py-4">
						{links.map((link) => (
							<Button
								key={link.href}
								asChild
								variant="link"
								className="w-full justify-center"
								onClick={() => setIsOpen(false)}
							>
								<Link href={link.href}>{link.label}</Link>
							</Button>
						))}
					</div>
				</SheetContent>
			</Sheet>
		</div>
	);
};
