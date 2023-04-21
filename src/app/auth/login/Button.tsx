"use client";

import React from "react";

import { signOut } from "next-auth/react";

export const LogoutButton = () => (
	<button
		className="group h-10 rounded-full border-2 border-gray-300 px-6 transition duration-300
hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100"
		onClick={() => signOut()}
	>
		<span className="block w-max text-sm font-semibold tracking-wide text-gray-700 transition duration-300 group-hover:text-blue-600 sm:text-base">
			Logout
		</span>
	</button>
);
