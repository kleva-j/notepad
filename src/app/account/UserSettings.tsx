"use client";

import type { AuthSession } from "@/types";

import { redirect } from "next/navigation";

import UpdateEmailCard from "./UpdateEmailCard";
import UpdateNameCard from "./UpdateNameCard";

type Props = { session: AuthSession };

export default function UserSettings({ session }: Props) {
	if (!session) return redirect("/api/auth/signin");

	return (
		<>
			<UpdateNameCard name={session.user.name ?? ""} />
			<UpdateEmailCard email={session?.user.email ?? ""} />
		</>
	);
}
