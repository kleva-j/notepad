import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import {
	computerIdSchema,
	ComputerId,
	computers,
} from "@/lib/db/schema/computers";

export const getComputers = async () => {
	const c = await db.select().from(computers);
	return { computers: c };
};

export const getComputerById = async (id: ComputerId) => {
	const { id: computerId } = computerIdSchema.parse({ id });
	const [c] = await db
		.select()
		.from(computers)
		.where(eq(computers.id, computerId));

	return { computer: c };
};
