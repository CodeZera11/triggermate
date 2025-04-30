import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  unique,
  uuid,
} from "drizzle-orm/pg-core";

export const SubscriptionPlanEnum = pgEnum("subscription_plan", [
  "FREE",
  "PRO",
]);

export const IntegrationsEnum = pgEnum("integration_type", ["INSTAGRAM"]);

export const MediaTypeEnum = pgEnum("media_type", [
  "IMAGE",
  "VIDEO",
  "CAROUSEL_ALBUM",
]);

export const ListenersEnum = pgEnum("listener_type", ["SMARTAI", "MESSAGE"]);

export const usersTable = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  clerkId: text("clerk_id").notNull().unique(),
  email: text("email").notNull().unique(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  createdAt: timestamp("created_at", { mode: "string" }).defaultNow(),
});

export const userRelations = relations(usersTable, ({ many, one }) => ({
  subscription: one(subscriptionTable),
  integrations: many(integrationsTable),
  automations: many(automationsTable),
}));

export const subscriptionTable = pgTable("subscriptions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at", { mode: "string" }).defaultNow(),
  plan: SubscriptionPlanEnum("plan").default("FREE").notNull(),
  updatedAt: text("updated_at").notNull(),
  customerId: text("customer_id").unique(),
});

export const subscriptionRelations = relations(
  subscriptionTable,
  ({ one }) => ({
    user: one(usersTable, {
      fields: [subscriptionTable.userId],
      references: [usersTable.id],
    }),
  })
);

export const integrationsTable = pgTable("integrations", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: IntegrationsEnum("name").default("INSTAGRAM").notNull(),
  createdAt: timestamp("created_at", { mode: "string" }).defaultNow(),
  userId: uuid("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  token: text("token").notNull().unique(),
  expiresAt: timestamp("expires_at"),
  instagramId: text("instagram_id").unique(),
});

export const integrationRelations = relations(integrationsTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [integrationsTable.userId],
    references: [usersTable.id],
  }),
}));

export const automationsTable = pgTable("automations", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").default("Untitled"),
  createdAt: timestamp("created_at", { mode: "string" }).defaultNow(),
  active: boolean("active").default(false),
  userId: uuid("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
});

export const automationRelations = relations(
  automationsTable,
  ({ many, one }) => ({
    triggers: many(triggersTable),
    listener: one(listenersTable, {
      fields: [automationsTable.id],
      references: [listenersTable.automationId],
    }),
    posts: many(postsTable),
    dms: many(dmsTable),
    user: one(usersTable, {
      fields: [automationsTable.userId],
      references: [usersTable.id],
    }),
    keywords: many(keywordsTable),
  })
);

export const dmsTable = pgTable("dms", {
  id: uuid("id").primaryKey().defaultRandom(),
  automationId: uuid("automation_id").references(() => automationsTable.id),
  createdAt: timestamp("created_at", { mode: "string" }).defaultNow(),
  senderId: text("sender_id"),
  receiver: text("receiver"),
  message: text("string"),
});

export const dmRelations = relations(dmsTable, ({ one }) => ({
  automation: one(automationsTable, {
    fields: [dmsTable.automationId],
    references: [automationsTable.id],
  }),
}));

export const postsTable = pgTable("posts", {
  id: uuid("id").primaryKey().defaultRandom(),
  postid: text("post_id").notNull(),
  caption: text("caption"),
  media: text("media"),
  mediaType: MediaTypeEnum("media_type").default("IMAGE").notNull(),
  automationId: uuid("automation_id")
    .notNull()
    .references(() => automationsTable.id, { onDelete: "cascade" }),
});

export const postRelations = relations(postsTable, ({ one }) => ({
  automation: one(automationsTable, {
    fields: [postsTable.automationId],
    references: [automationsTable.id],
  }),
}));

export const listenersTable = pgTable("listeners", {
  id: uuid("id").primaryKey().defaultRandom(),
  automationId: uuid("automation_id")
    .notNull()
    .references(() => automationsTable.id, { onDelete: "cascade" }),
  listener: ListenersEnum("listener").default("MESSAGE").notNull(),
  prompt: text("prompt").notNull(),
  commentReply: text("comment_reply"),
  dmCount: integer("dm_count").default(0),
  commentCount: integer("comment_count").default(0),
  createdAt: timestamp("created_at", { mode: "string" }).defaultNow(),
});

export const listenerRelations = relations(listenersTable, ({ one }) => ({
  automation: one(automationsTable, {
    fields: [listenersTable.automationId],
    references: [automationsTable.id],
  }),
}));

export const triggersTable = pgTable("triggers", {
  id: uuid("id").primaryKey().defaultRandom(),
  type: text("type").notNull(),
  automationId: uuid("automation_id")
    .notNull()
    .references(() => automationsTable.id, { onDelete: "cascade" }),
});

export const triggerRelations = relations(triggersTable, ({ one }) => ({
  automation: one(automationsTable, {
    fields: [triggersTable.automationId],
    references: [automationsTable.id],
  }),
}));

export const keywordsTable = pgTable(
  "keywords",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    word: text("word").notNull(),
    automationId: uuid("automation_id")
      .notNull()
      .references(() => automationsTable.id, { onDelete: "cascade" }),
  },
  (table) => [unique().on(table.word, table.automationId)]
);

export const keywordRelations = relations(keywordsTable, ({ one }) => ({
  automation: one(automationsTable, {
    fields: [keywordsTable.automationId],
    references: [automationsTable.id],
  }),
}));
