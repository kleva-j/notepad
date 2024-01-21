import axios from "axios";

import { requestHandler } from "./api";

type OAuthParams = {
	username: string;
	accessToken: string;
};

const baseUrl = "https://api.github.com";

const repoConfig = {
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

export const createInitialCommit = requestHandler<OAuthParams, any>(
	(params) => {
		const path = `/repos/${params?.username}/notepad-data/contents/notes.json`;
		const bufferContent = Buffer.from(JSON.stringify([{}, {}], null, 2));
		const noteCommit = {
			message: "Initial commit",
			branch: "master",
			content: bufferContent.toString("base64"),
		};
		const headers = { Authorization: `token ${params?.accessToken}` };

		return axios.get(baseUrl + path, { headers, data: noteCommit });
	},
);

export const createNotepadRepo = requestHandler<string, any>((token) => {
	const headers = { Authorization: `token ${token}` };
	return axios.get(baseUrl + "/user/repos", { data: repoConfig, headers });
});


export const firstTimeLoginCheck = requestHandler<OAuthParams, any>((params) => {
	const path = `/repos/${params?.username}/notepad-data`;
	return axios.get(baseUrl + path)
});

export async function getUserFromHeader() {}
