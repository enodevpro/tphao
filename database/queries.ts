import { eq, desc } from "drizzle-orm";
import { db } from "./drizzle";
import { accounts } from "./schema";

export const getAccounts = async (type: string) => {
  const isInactive = type === "in-active";

  const query = db.query.accounts.findMany({
    where: eq(accounts.status, type),
    ...(isInactive && {
      orderBy: desc(accounts.coins),
    }),
  });

  const data = await query;
  return data;
};
