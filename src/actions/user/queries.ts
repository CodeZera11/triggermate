"use server";

import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export const findUser = async (clerkId: string) => {
  return await db.query.usersTable.findFirst({
    where: eq(usersTable.clerkId, clerkId),
    with: {
      subscription: true,
      integrations: true,
      automations: true,
    },
  });
};
