import { Method } from "@/types";

import axios from "axios";

export function GithubApiService(
	method: Method,
	path: string,
	accessToken: string,
	data?: Record<string, string | number | boolean>,
) {
	return axios({
		data,
		method,
		url: `https://api.github.com${path}`,
		headers: { Authorization: `token ${accessToken}` },
	});
}

export async function getUserFromHeader() {
	return {};
}

export async function firstTimeLoginCheck(
	username: string,
	accessToken: string,
) {
	try {
		await GithubApiService(
			Method.GET,
			`/repos/${username}/notepad-data`,
			accessToken,
		);
		return false;
	} catch (err) {
		return true;
	}
}

export async function createNotepadDataRepo(
	accessToken: string,
): Promise<void> {
	const notepadDataRepo = {
		name: "notepad-data",
		description: "Database of notes for notepad",
		private: true,
		visibility: "private",
		has_issues: false,
		has_projects: false,
		has_wiki: false,
		is_template: false,
		auto_init: false,
		allow_squash_merge: false,
		allow_rebase_merge: false,
	};

	try {
		await GithubApiService(
			Method.POST,
			`/user/repos`,
			accessToken,
			notepadDataRepo,
		);
	} catch (err) {
		if (err instanceof Error) throw new Error(err.message);
	}
}

export async function createInitialCommit(
	username: string,
	accessToken: string,
) {
	const noteCommit = {
		message: "Initial commit",
		content: Buffer.from(JSON.stringify([{}, {}], null, 2)).toString("base64"),
		branch: "master",
	};
	const path = `/repos/${username}/notepad-data/contents/notes.json`;
	try {
		await GithubApiService(Method.POST, path, accessToken, noteCommit);
	} catch (err) {
		if (err instanceof Error) throw new Error(err.message);
	}
	return {};
}
