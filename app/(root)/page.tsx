"use client";
import { Button } from "@/components/ui/button";
import { AccountsTable } from "./list";
import { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import Analysis from "./analysis";

type Account = {
  id: string;
  userName: string;
  passWord: string;
  coins: number;
  money: number;
  status: string;
  createdAt: string;
};

export default function Home() {
  const [data, setData] = useState<Account[]>([]);
  const [type, setType] = useState<"active" | "in-active">("active");
  const [isLoading, setIsLoading] = useState(true);
  const [coins, setCoins] = useState(0);

  useEffect(() => {
    const fetchAccounts = async () => {
      const res = await fetch(`/api/accounts?type=${type}`);
      const { accounts }: any = await res.json();

      const _coins = accounts.reduce(
        (
          accumulator: number,
          currentValue: { coins: number },
          currentIndex: number,
          array: any[]
        ) => {
          return accumulator + currentValue.coins;
        },
        0 // <- Initial value phải có, khởi tạo accumulator = 0
      );

      console.log(_coins);
      setCoins(_coins);

      setData(accounts);
      setIsLoading(false);
    };
    fetchAccounts();
  }, [type]);

  return (
    <div className="w-full min-h-full bg-zinc-900 p-20">
      <div className="flex items-center gap-5 mb-5">
        <Button
          className="bg-green-500 hover:bg-green-600 cursor-pointer"
          onClick={() => {
            setType("active");
            setIsLoading(true);
          }}
        >
          Đã kích hoạt
        </Button>
        <Button
          className="bg-rose-500 hover:bg-rose-600 cursor-pointer"
          onClick={() => {
            setType("in-active");
            setIsLoading(true);
          }}
        >
          Chưa kích hoạt
        </Button>
      </div>
      <div>
        <Analysis coins={coins} />
      </div>

      {isLoading && <Loader className="animate-spin w-4 h-4 text-white" />}
      {!isLoading && <AccountsTable accounts={data} />}
    </div>
  );
}
