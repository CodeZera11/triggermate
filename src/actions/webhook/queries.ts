"use server";

import { db } from "@/db";
import {
  automationsTable,
  dmsTable,
  increment,
  keywordsTable,
  listenersTable,
  postsTable,
  triggersTable,
} from "@/db/schema";
import { and, eq } from "drizzle-orm";

export const matchKeyword = async (keyword: string) => {
  return await db.query.keywordsTable.findFirst({
    where: eq(keywordsTable.word, keyword.toLowerCase()),
  });
};

export const getKeywordAutomation = async (
  automationId: string,
  dm: boolean
) => {
  return await db.query.automationsTable.findFirst({
    where: eq(automationsTable.id, automationId),
    with: {
      dms: true,
      triggers: {
        where: eq(triggersTable.type, dm ? "DM" : "COMMENT"),
      },
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

export const trackResponse = async (
  automationId: string,
  type: "COMMENT" | "DM"
) => {
  if (type === "COMMENT") {
    return await db
      .update(listenersTable)
      .set({
        commentCount: increment(listenersTable.commentCount),
      })
      .where(eq(listenersTable.automationId, automationId))
      .returning();
  }

  if (type === "DM") {
    return await db
      .update(listenersTable)
      .set({
        dmCount: increment(listenersTable.dmCount),
      })
      .where(eq(listenersTable.automationId, automationId))
      .returning();
  }
};

export const createChatHistory = async (
  automationId: string,
  sender: string,
  receiver: string,
  message: string
) => {
  return await db.insert(dmsTable).values({
    automationId,
    receiver,
    senderId: sender,
    message,
  });
};

export const getKeywordPost = async (postId: string, automationId: string) => {
  return await db.query.postsTable.findFirst({
    where: and(
      eq(postsTable.postid, postId),
      eq(postsTable.automationId, automationId)
    ),
    with: {
      automation: true,
    },
  });
};

export const getChatHistory = async (receiver: string, sender: string) => {
  const history = await db.query.dmsTable.findMany({
    where: and(eq(dmsTable.receiver, receiver), eq(dmsTable.senderId, sender)),
    with: {
      automation: true,
    },
  });

  return {
    history: history,
    automationId: history[0]?.automationId,
  };
};
