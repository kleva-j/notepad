import { Redis } from "@upstash/redis";

const token =
	"Aan3ASQgOTM0YmZhMzUtMWEyYy00YzY4LWFhNDEtMGU1YTg3ZDQwYTNmNWI4NmFhNjhmNTExNDBmNGE3NWFjYjU4MmYzNDVmNjg=";

export const redis = new Redis({
	url: "https://warm-dingo-43511.upstash.io",
	token,
});
