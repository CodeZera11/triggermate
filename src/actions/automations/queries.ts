"use server";

import { db } from "@/db";
import {
  automationsTable,
  keywordsTable,
  listenersTable,
  postsTable,
  triggersTable,
} from "@/db/schema";
import { IgPost } from "@/hooks/use-automations";
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

export const addListener = async (
  automationId: string,
  listener: "MESSAGE" | "SMARTAI",
  prompt: string,
  reply?: string
) => {
  return await db
    .insert(listenersTable)
    .values({
      automationId: automationId,
      listener: listener,
      prompt: prompt,
      commentReply: reply,
    })
    .returning();
};

export const addTrigger = async (automationId: string, trigger: string[]) => {
  if (trigger.length === 2) {
    const data = [
      { automationId: automationId, type: trigger[0] },
      { automationId: automationId, type: trigger[1] },
    ];

    return await db.insert(triggersTable).values(data);
  }

  if (trigger.length === 1) {
    return await db.insert(triggersTable).values({
      automationId: automationId,
      type: trigger[0],
    });
  }
};

export const addKeyword = async (automationId: string, keyword: string) => {
  return await db
    .insert(keywordsTable)
    .values({
      automationId: automationId,
      word: keyword.toLowerCase(),
    })
    .returning();
};

export const deleteKeyWord = async (id: string) => {
  return await db.delete(keywordsTable).where(eq(keywordsTable.id, id));
};

export const addPost = async (automationId: string, posts: IgPost[]) => {
  const postsWithAutomationId = posts.map((post) => ({
    automationId: automationId,
    ...post,
  }));

  return await db.insert(postsTable).values(postsWithAutomationId);
};
