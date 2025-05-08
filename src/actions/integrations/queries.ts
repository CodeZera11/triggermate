"use server";

import { db } from "@/db";
import { integrationsTable, usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export const updateIntegration = async ({
  token,
  expire,
  id,
}: {
  token: string;
  expire: Date;
  id: string;
}) => {
  return await db
    .update(integrationsTable)
    .set({
      token: token,
      expiresAt: expire,
    })
    .where(eq(integrationsTable.id, id))
    .returning();
};

export const getIntegration = async (clerkId: string) => {
  return await db.query.usersTable.findFirst({
    where: eq(usersTable.clerkId, clerkId),
    with: {
      integrations: {
        where: eq(integrationsTable.name, "INSTAGRAM"),
      },
    },
  });
};

export const createIntegration = async (
  clerkId: string,
  token: string,
  expire: Date,
  igId?: string
) => {
  const user = await db.query.usersTable.findFirst({
    where: eq(usersTable.clerkId, clerkId),
  });

  if (!user) {
    return null;
  }

  const integration = await db
    .insert(integrationsTable)
    .values({
      userId: user.id,
      token: token,
      expiresAt: expire,
      name: "INSTAGRAM",
      instagramId: igId,
    })
    .returning();

  return { firstName: user.firstName, lastName: user.lastName, integration };
};
