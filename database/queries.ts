import { eq } from "drizzle-orm";
import { db } from "./drizzle";
import { accounts } from "./schema";

export const getAccounts = async (type: string) => {
  // active
  // in-active

  const data = await db.query.accounts.findMany({
    where: eq(accounts.status, type),
  });
  return data;
};
