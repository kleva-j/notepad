import { createOrUpdateTextFile } from "@octokit/plugin-create-or-update-text-file";
import { requestLog } from "@octokit/plugin-request-log";
import { retry } from "@octokit/plugin-retry";
import { Octokit } from "octokit";
import { env } from "./env.mjs";

const { GITHUB_TOKEN: auth, FILENAME, FILEPATH, REPO_NAME } = env;
const filePath = `${FILEPATH}${FILENAME}`;

const MyOctokit = Octokit.plugin(createOrUpdateTextFile)
	.plugin(requestLog)
	.plugin(retry)
	.defaults({ userAgent: "Notepad" });

const octokit = new MyOctokit({ auth });

export async function getUser() {
	const { data: user } = await octokit.request("GET /user");
	return user;
}

type GithubUser = Awaited<ReturnType<typeof getUser>>;

export async function getUserRepo(user: GithubUser) {
	const { data: repo } = await octokit.request("GET /repos/{owner}/{repo}", {
		owner: user.login,
		repo: REPO_NAME,
		headers: { "X-GitHub-Api-Version": "2022-11-28" },
	});
	return repo;
}

export async function createRepoIfNotExist() {
	const { data: newRepo } = await octokit.request("POST /user/repos", {
		name: REPO_NAME,
		description: "A repository for all Notepad Notes",
		homepage: "https://github.com",
		private: false,
		is_template: false,
		headers: { "X-GitHub-Api-Version": "2022-11-28" },
	});
	return newRepo;
}

export async function getJSONFile(owner: GithubUser) {
	const { data: file } = await octokit.request(
		"GET /repos/{owner}/{repo}/contents/{path}",
		{ owner: owner.login, repo: REPO_NAME, path: filePath },
	);
	return file;
}

export async function createOrUpdateFile(owner: GithubUser, content: string) {
	const { data: file } = await octokit.createOrUpdateTextFile({
		owner: owner.login,
		repo: REPO_NAME,
		path: filePath,
		message: "Update file content",
		content: ({ exists }) => (!exists ? "" : content),
	});
	return file;
}
