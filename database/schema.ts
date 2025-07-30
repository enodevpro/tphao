import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
export const accounts = pgTable("accounts", {
  id: text("id").primaryKey(),
  userName: text("user_name").notNull(),
  passWord: text("password").notNull(),
  coins: integer("coins").notNull(),
  money: integer("money").notNull(),
  status: text("status").notNull(),
  level: text("level").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
