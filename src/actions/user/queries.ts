"use server";

import { db } from "@/db";
import { subscriptionTable, usersTable } from "@/db/schema";
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

export const updateSubscription = async (
  clerkId: string,
  props: { customerId?: string; plan?: "PRO" | "FREE" }
) => {
  const user = await db.query.usersTable.findFirst({
    where: eq(usersTable.clerkId, clerkId),
  });

  if (!user) {
    throw new Error("User not found");
  }

  const userId = user.id;

  return await db
    .update(subscriptionTable)
    .set({
      customerId: props.customerId,
      plan: props.plan,
    })
    .where(eq(subscriptionTable.userId, userId));
};
