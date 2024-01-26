import Link from "next/link";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ModeToggle } from "@/components/ui/ThemeToggle";
import { auth } from "@/lib/auth";
import {
	DropdownMenuSeparator,
	DropdownMenuContent,
	DropdownMenuTrigger,
	DropdownMenuLabel,
	DropdownMenuItem,
	DropdownMenu,
} from "@/components/ui/dropdown-menu";

export default async function Navbar() {
	const session = await auth();
	const nameExists =
		session?.user && !!session?.user.name && session?.user.name.length > 5;

	return session?.user ? (
		<nav className="flex items-center justify-between py-2 transition-all duration-300">
			<h1 className="transition-hover cursor-pointer font-semibold hover:opacity-75">
				<Link href="/">Logo</Link>
			</h1>
			<div className="flex items-center space-x-2">
				<ModeToggle />
				{session ? (
					<DropdownMenu>
						<DropdownMenuTrigger>
							<Avatar>
								<AvatarFallback>
									{nameExists
										? session.user.name
												?.split(" ")
												.map((word) => word.charAt(0).toUpperCase())
												.join("")
										: "~"}
								</AvatarFallback>
							</Avatar>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" className="w-56">
							<DropdownMenuLabel>
								<span className="font-semibold">
									{nameExists ? session.user.name : "New User"}
								</span>
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<Link href="/account">
								<DropdownMenuItem className="cursor-pointer">
									Account
								</DropdownMenuItem>
							</Link>
							<Link href="/api/auth/signout">
								<DropdownMenuItem className="cursor-pointer">
									Sign out
								</DropdownMenuItem>
							</Link>
						</DropdownMenuContent>
					</DropdownMenu>
				) : (
					<Link href="/sign-in">Sign in</Link>
				)}
			</div>
		</nav>
	) : null;
}
