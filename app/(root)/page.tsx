"use client";

import { Button } from "@/components/ui/button";
import { AccountsTable } from "./list";
import { useEffect, useState } from "react";
import { Loader, Activity, TicketX } from "lucide-react";
import Analysis from "./analysis";
import { Loading, LoadingOverlay } from "@/components/loading-snipper";

type Account = {
  id: string;
  userName: string;
  passWord: string;
  coins: number;
  money: number;
  status: string;
  level: string;
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
      const json: { accounts: Account[] } = await res.json();

      const accounts = json.accounts;

      const _coins = accounts.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.coins;
      }, 0);

      setCoins(_coins);
      setData(accounts);
      setIsLoading(false);
    };

    fetchAccounts();
  }, [type]);

  return (
    <div className="w-full min-h-screen bg-zinc-900">
      <header className="fixed top-0 left-0 w-full backdrop-blur-md bg-zinc-900/80 shadow-md z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 grid grid-cols-1 md:grid-cols-2 items-center gap-4">
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className={`bg-green-500 hover:bg-green-600 text-white`}
              onClick={() => {
                setType("active");
                setIsLoading(true);
              }}
            >
              <Activity className="w-4 h-4 mr-2" /> Đã kích hoạt
            </Button>
            <Button
              variant="outline"
              className={`bg-rose-500 hover:bg-rose-600 text-white`}
              onClick={() => {
                setType("in-active");
                setIsLoading(true);
              }}
            >
              <TicketX className="w-4 h-4 mr-2" /> Chưa kích hoạt
            </Button>
          </div>
          <div className="flex justify-end">
            <Analysis coins={coins} />
          </div>
        </div>
      </header>

      <main className="pt-15 px-6">
        {isLoading ? (
          <Loading type="default" message="Đang tải..." size="sm" />
        ) : (
          <AccountsTable accounts={data} />
        )}
      </main>
    </div>
  );
}
