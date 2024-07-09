import { type VariantProps, cva } from "class-variance-authority";

import { MobileHeader } from "@/layout/header/mobile";
import { Button } from "@/components/ui/button";
import { Logo } from "@/layout/header/logo";
import { cn } from "@/lib/utils";

import Link from "next/link";

const navigationLinks = [
	{ label: "Features", href: "/#features" },
	{ label: "Pricing", href: "/#pricing" },
	{ label: "FAQs", href: "/#faqs" },
];

const headerVariants = cva("mx-auto", {
	variants: {
		variant: {
			default: "max-w-7xl",
			centered:
				"max-w-4xl rounded-full mt-2 border shadow-lg dark:border-zinc-900",
		},
	},
	defaultVariants: {
		variant: "default",
	},
});

interface HeaderProps extends VariantProps<typeof headerVariants> {
	sticky?: boolean;
}

export default function Header({ sticky, variant }: HeaderProps) {
	return (
		<header
			className={cn(
				"w-full bg-zinc-50 backdrop-blur dark:bg-zinc-950/50",
				sticky && variant == "centered" && "top-3 mx-auto max-w-4xl md:sticky",
				sticky && variant == "default" && "top-0 md:sticky",
			)}
		>
			<div className={cn("hidden md:block", headerVariants({ variant }))}>
				<div className="flex w-full justify-start gap-2 px-6 pb-2 pt-3">
					<Logo />
					<nav className="ml-auto flex gap-2 lg:gap-4">
						{navigationLinks.map((link, i) => (
							<Button asChild key={i} variant="link">
								<Link key={i} href={link.href}>
									{link.label}
								</Link>
							</Button>
						))}
					</nav>
				</div>
			</div>
			<MobileHeader links={navigationLinks}>
				<Logo />
			</MobileHeader>
		</header>
	);
}
