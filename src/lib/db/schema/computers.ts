import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { pgTable, serial, text, integer } from "drizzle-orm/pg-core";
import { z } from "zod";

export const computers = pgTable("computers", {
	id: serial("id").primaryKey(),
	brand: text("brand").notNull(),
	cores: integer("cores").notNull(),
});

// Schema for CRUD - used to validate API requests
export const insertComputerSchema = createInsertSchema(computers);
export const selectComputerSchema = createSelectSchema(computers);
export const computerIdSchema = selectComputerSchema.pick({ id: true });
export const updateComputerSchema = selectComputerSchema;

export type Computer = z.infer<typeof selectComputerSchema>;
export type NewComputer = z.infer<typeof insertComputerSchema>;
export type ComputerId = z.infer<typeof computerIdSchema>["id"];
