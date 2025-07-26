import React from "react";
import { Coins, TrendingUp, Minus } from "lucide-react";

type Props = {
  coins: number;
};

const Analysis = ({ coins }: Props) => {
  const feePercent = 5; // % phí
  const feeAmount = (coins * feePercent) / 100;
  const remainingCoins = coins - feeAmount;

  const formattedCoins = coins.toLocaleString("en-US");
  const formattedRemainingCoins = remainingCoins.toLocaleString("en-US");

  // Tính tiền kiếm được sau khi bán xu còn lại
  const moneyEarned = Math.floor((remainingCoins / 25_000_000) * 10_000);
  const formattedMoneyEarned = moneyEarned.toLocaleString("en-US");

  return (
    <div className="flex items-center gap-3">
      {/* Compact Stats */}
      <div className="flex items-center gap-2 px-3 py-2 bg-zinc-800/90 backdrop-blur-sm rounded-lg border border-zinc-700">
        <Coins className="w-4 h-4 text-yellow-400" />
        <div className="text-sm">
          <span className="text-zinc-400">Xu:</span>
          <span className="ml-1 font-semibold text-white">
            {formattedCoins}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 px-3 py-2 bg-zinc-800/90 backdrop-blur-sm rounded-lg border border-zinc-700 w-fit">
        <Minus className="w-4 h-4 text-red-400" />
        <div className="text-sm whitespace-nowrap">
          <span className="text-zinc-400">Sau phí:</span>
          <span className="ml-1 font-semibold text-white">
            {formattedRemainingCoins}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-lg shadow-lg">
        <TrendingUp className="w-4 h-4 text-white" />
        <div className="text-sm whitespace-nowrap">
          <span className="text-emerald-100">Thu nhập:</span>
          <span className="ml-1 font-bold text-white">
            {formattedMoneyEarned} VND
          </span>
        </div>
      </div>
    </div>
  );
};

export default Analysis;
