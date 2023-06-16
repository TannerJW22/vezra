import { z } from "zod";

// .env
const VEnvVariables = z.object({
	NODE_ENV: z.enum(["development", "production"]),
	DATABASE_URL: z.string(),
	CLERK_SECRET_KEY: z.string(),
	NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string(),
	NEXT_PUBLIC_CLERK_SIGN_IN_URL: z.string(),
	NEXT_PUBLIC_CLERK_SIGN_UP_URL: z.string(),
	NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: z.string(),
	NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL: z.string(),
});
VEnvVariables.parse(process.env);
declare global {
	namespace NodeJS {
		interface ProcessEnv extends z.infer<typeof VEnvVariables> {}
	}
}

// VezraUser
