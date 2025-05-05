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

export const createUser = async ({
  clerkId,
  email,
  firstName,
  lastName,
}: {
  clerkId: string;
  firstName: string;
  lastName: string;
  email: string;
}) => {
  const [user] = await db
    .insert(usersTable)
    .values({
      clerkId: clerkId,
      email: email,
      firstName: firstName,
      lastName: lastName,
    })
    .returning();

  return user;
};
