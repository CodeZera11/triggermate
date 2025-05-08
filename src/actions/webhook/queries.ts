"use server";

import { db } from "@/db";
import {
  automationsTable,
  increment,
  keywordsTable,
  listenersTable,
  triggersTable,
} from "@/db/schema";
import { eq } from "drizzle-orm";

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
