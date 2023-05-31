import { prisma } from "@/prisma";
import type { VezraUser } from "types";
import { z } from "zod";

export async function GET(req: Request, ctx: any) {
	const user = fetch(`https://api.clerk.com/v1/users/${}`, {
		headers: {
			Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
		},
	});
	const slug: string = ctx.params.username;
	const arr = await prisma.user.findMany();
	console.log(arr); // <<--*

	return arr;
}
