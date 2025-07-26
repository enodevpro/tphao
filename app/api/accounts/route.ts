import { db } from "@/database/drizzle";
import { accounts } from "@/database/schema";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { NextApiRequest, NextApiResponse } from "next";
import { getAccounts } from "@/database/queries";
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const type = searchParams.get("type");
  if (!type) {
    return NextResponse.json({});
  }
  const data = await getAccounts(type);

  return NextResponse.json({ accounts: data });
}
export async function POST(req: Request) {
  const body = await req.text();

  if (!body) {
    return NextResponse.json({
      success: false,
      message: "No body provided",
    });
  }
  await db.delete(accounts);

  const arr = body.split(",");
  const dataPush: any[] = [];

  arr.forEach((item) => {
    const str = item.split("|");

    if (str.length > 2) {
      const obj = {
        id: uuidv4(),
        userName: str[0],
        passWord: str[1],
        coins: Number(str[2]),
        money: Number(str[3]),
        status: str[4],
      };

      dataPush.push(obj);
    }
  });

  await db.insert(accounts).values(dataPush);

  return NextResponse.json({ oke: "D" });
}
