"use client";
import React, { useState } from "react";

type Account = {
  id: string;
  userName: string;
  passWord: string;
  coins: number;
  money: number;
  status: string;
  createdAt: string; // ISO date string
};

export const AccountsTable = ({ accounts }: { accounts: Account[] }) => {
  const [visiblePasswords, setVisiblePasswords] = useState<{
    [key: string]: boolean;
  }>({});

  const togglePasswordVisibility = (id: string) => {
    setVisiblePasswords((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const sortedAccounts = [...accounts].sort((a, b) => b.coins - a.coins);

  const statusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500 text-white px-2 py-1 rounded-full text-xs";
      case "inactive":
        return "bg-rose-500 text-white px-2 py-1 rounded-full text-xs";
      default:
        return "bg-gray-500 text-white px-2 py-1 rounded-full text-xs";
    }
  };

  return (
    <div className="bg-zinc-800 p-6 rounded-2xl shadow-lg text-white">
      <h2 className="text-xl font-bold mb-6 text-center">
        Accounts ({accounts.length})
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-center">
          <thead>
            <tr className="bg-zinc-800">
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Username</th>
              <th className="px-4 py-3">Password</th>
              <th className="px-4 py-3">Coins</th>
              <th className="px-4 py-3">Money</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Created At</th>
            </tr>
          </thead>
          <tbody>
            {sortedAccounts.map((account) => (
              <tr
                key={account.id}
                className="hover:bg-zinc-700 transition-all duration-200"
              >
                <td className="px-4 py-2">{account.id.substring(0, 5)}...</td>
                <td className="px-4 py-2">{account.userName}</td>
                <td className="px-4 py-2">
                  {visiblePasswords[account.id] ? account.passWord : "•••••••"}
                  <button
                    onClick={() => togglePasswordVisibility(account.id)}
                    className="ml-2 text-blue-400 hover:underline text-xs"
                  >
                    {visiblePasswords[account.id] ? "Hide" : "Show"}
                  </button>
                </td>
                <td className="px-4 py-2">{account.coins.toLocaleString()}</td>
                <td className="px-4 py-2">{account.money.toLocaleString()}</td>
                <td className="px-4 py-2">
                  <span className={statusColor(account.status)}>
                    {account.status}
                  </span>
                </td>
                <td className="px-4 py-2">
                  {new Date(account.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
