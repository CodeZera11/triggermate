"use server";

import { db } from "@/db";
import { integrationsTable } from "@/db/schema";
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
