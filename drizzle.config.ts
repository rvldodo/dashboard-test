import { env } from "@/env";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
	out: "./src/drizzle/migrations",
	schema: "./src/drizzle/migrations/schema.ts",
	dialect: "postgresql",
	strict: true,
	verbose: true,
	dbCredentials: { url: env.DATABASE_URL },
});
