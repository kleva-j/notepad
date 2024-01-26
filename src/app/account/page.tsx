import { redirect } from "next/navigation";
import { AuthSession } from "@/types";
import { auth } from "@/lib/auth";

import UserSettings from "./UserSettings";

export default async function Account() {
	const session = (await auth()) as AuthSession;

	if (!session?.user) redirect("/api/auth/signin");

	return (
		<main className="mx-auto max-w-3xl p-6 md:p-0">
			<h1 className="my-6 text-3xl font-semibold">Account</h1>
			<div className="space-y-6">
				<UserSettings session={session} />
			</div>
		</main>
	);
}
