"use server";

import { db } from "@/db";
import { automationsTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export const createAutomation = async (userId: string, id?: string) => {
  return await db.insert(automationsTable).values({
    id: id,
    userId: userId,
  });
};

export const getAutomations = async (userId: string) => {
  return await db.query.automationsTable.findMany({
    where: eq(automationsTable.userId, userId),
    with: {
      keywords: true,
      listener: true,
    },
  });
};

export const findAutomation = async (id: string) => {
  return await db.query.automationsTable.findFirst({
    where: eq(automationsTable.id, id),
    with: {
      keywords: true,
      triggers: true,
      posts: true,
      listener: true,
      user: {
        with: {
          subscription: true,
          integrations: true,
        },
      },
    },
  });
};

export const updateAutomation = async (
  id: string,
  update: { name?: string; active?: boolean }
) => {
  return await db
    .update(automationsTable)
    .set({
      name: update.name,
      active: update.active,
    })
    .where(eq(automationsTable.id, id))
    .returning();
};
