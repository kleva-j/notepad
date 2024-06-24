import { Button } from "@/components/ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

import Link from "next/link";

export default function Footer() {
	return (
		<footer className="">
			<div className="mx-auto max-w-screen-lg px-4 pb-8 pt-16 sm:px-6 lg:px-8 lg:pt-24">
				<div className="text-center">
					<h2 className="text-3xl font-extrabold text-gray-900 sm:text-5xl">
						Get started in Minutes
					</h2>

					<p className="mx-auto mt-4 max-w-sm text-gray-500">
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cum
						maiores ipsum eos temporibus ea nihil.
					</p>

					<a
						href="#"
						className="mt-8 inline-block rounded-full border border-indigo-600 px-12 py-3 text-sm font-medium text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500"
					>
						Get Started
					</a>
				</div>

				<div className="mt-16 border-t border-gray-100 pt-8 sm:flex sm:items-center sm:justify-between lg:mt-24">
					<ul className="flex flex-wrap justify-center gap-4 text-xs lg:justify-end">
						<li>
							<Button asChild variant="link" className="text-xs font-normal">
								<Link
									href="#"
									className="text-gray-500 transition hover:opacity-75"
								>
									Terms & Conditions
								</Link>
							</Button>
						</li>

						<li>
							<Button asChild variant="link" className="text-xs font-normal">
								<Link
									href="#"
									className="text-gray-500 transition hover:opacity-75"
								>
									Privacy Policy
								</Link>
							</Button>
						</li>

						<li>
							<Button asChild variant="link" className="text-xs font-normal">
								<Link
									href="#"
									className="text-gray-500 transition hover:opacity-75"
								>
									Cookies
								</Link>
							</Button>
						</li>
					</ul>

					<Link
						href="#"
						rel="noreferrer"
						target="_blank"
						className="text-gray-700 transition hover:opacity-75"
					>
						<span className="sr-only">GitHub</span>
						<GitHubLogoIcon className="h-4 w-4" />
					</Link>
				</div>
			</div>
		</footer>
	);
}
