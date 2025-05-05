"use server";

import { db } from "@/db";
import { automationsTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export const createAutomation = async (userId: string) => {
  return await db.insert(automationsTable).values({
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
