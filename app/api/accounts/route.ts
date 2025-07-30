import { db } from "@/database/drizzle";
import { accounts } from "@/database/schema";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { getAccounts } from "@/database/queries";

type AccountInput = {
  id: string;
  userName: string;
  passWord: string;
  coins: number;
  money: number;
  status: string;
  level: string;
};

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
  const dataPush: AccountInput[] = [];

  arr.forEach((item) => {
    const str = item.split("|");

    if (str.length > 2) {
      const obj: AccountInput = {
        id: uuidv4(),
        userName: str[0],
        passWord: str[1],
        coins: Number(str[2]),
        money: Number(str[3]),
        status: str[4],
        level: str[5],
      };

      dataPush.push(obj);
    }
  });

  await db.insert(accounts).values(dataPush);

  return NextResponse.json({ message: "Cập nhật dữ liệu thành công..." });
}
