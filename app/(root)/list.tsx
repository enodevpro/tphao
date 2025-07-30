"use client";
import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  Copy,
  Check,
  Users,
  Calendar,
  Coins,
  DollarSign,
  CheckSquare,
  Square,
  MoreHorizontal,
} from "lucide-react";

type Account = {
  id: string;
  userName: string;
  passWord: string;
  coins: number;
  money: number;
  status: string;
  level: string;
  createdAt: string; // ISO date string
};

const getRelativeTime = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} giây trước`;
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} phút trước`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} giờ trước`;
  } else {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} ngày trước`;
  }
};

export const AccountsTable = ({ accounts }: { accounts: Account[] }) => {
  const [visiblePasswords, setVisiblePasswords] = useState<{
    [key: string]: boolean;
  }>({});
  const [selectedAccounts, setSelectedAccounts] = useState<Set<string>>(
    new Set()
  );
  const [copiedItems, setCopiedItems] = useState<{ [key: string]: boolean }>(
    {}
  );

  const togglePasswordVisibility = (id: string) => {
    setVisiblePasswords((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleSelectAccount = (id: string) => {
    setSelectedAccounts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const selectAll = () => {
    const allIds = accounts.map((acc) => acc.id);
    setSelectedAccounts(new Set(allIds));
  };

  const deselectAll = () => {
    setSelectedAccounts(new Set());
  };

  const copyToClipboard = async (text: string, itemId?: string) => {
    try {
      await navigator.clipboard.writeText(text);
      if (itemId) {
        setCopiedItems((prev) => ({ ...prev, [itemId]: true }));
        setTimeout(() => {
          setCopiedItems((prev) => ({ ...prev, [itemId]: false }));
        }, 2000);
      }
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const sortedAccounts = [...accounts].sort((a, b) => b.coins - a.coins);

  const statusConfig = (status: string) => {
    switch (status) {
      case "active":
        return {
          className:
            "bg-emerald-100 text-emerald-700 border border-emerald-200",
          text: "Đã kích hoạt",
          dot: "bg-emerald-500",
        };
      case "in-active":
        return {
          className: "bg-rose-100 text-rose-700 border border-rose-200",
          text: "Chưa kích hoạt",
          dot: "bg-rose-500",
        };
      default:
        return {
          className: "bg-gray-100 text-gray-700 border border-gray-200",
          text: "Không xác định",
          dot: "bg-gray-500",
        };
    }
  };

  const totalCoins = sortedAccounts.reduce((sum, acc) => sum + acc.coins, 0);
  const totalMoney = sortedAccounts.reduce((sum, acc) => sum + acc.money, 0);
  const activeCount = sortedAccounts.filter(
    (acc) => acc.status === "active"
  ).length;

  return (
    <div className="bg-zinc-900 rounded-2xl shadow-2xl overflow-hidden border border-zinc-800">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-zinc-800 to-zinc-700 p-6 border-b border-zinc-700">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
              <Users className="text-blue-400" size={28} />
              Danh Sách Tài Khoản
            </h2>
            <div className="flex items-center gap-6 text-sm text-zinc-300">
              <div className="flex items-center gap-2">
                <Users size={16} />
                <span>{accounts.length} tài khoản</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckSquare size={16} className="text-emerald-400" />
                <span>{activeCount} đã kích hoạt</span>
              </div>
              <div className="flex items-center gap-2">
                <Coins size={16} className="text-yellow-400" />
                <span>{totalCoins.toLocaleString()} xu</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-zinc-400">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm">Cập nhật realtime</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-6 bg-zinc-800/50 border-b border-zinc-700">
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => {
              const textToCopy = sortedAccounts
                .filter((acc) => selectedAccounts.has(acc.id))
                .map((acc) => acc.userName)
                .join("\n");
              copyToClipboard(textToCopy);
            }}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
            disabled={selectedAccounts.size === 0}
          >
            <Copy size={16} />
            Copy Accounts ({selectedAccounts.size})
          </button>

          <button
            onClick={() => {
              const textToCopy = sortedAccounts
                .filter((acc) => selectedAccounts.has(acc.id))
                .map((acc) => `${acc.userName}|${acc.passWord}`)
                .join("\n");
              copyToClipboard(textToCopy);
            }}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
            disabled={selectedAccounts.size === 0}
          >
            <Copy size={16} />
            Copy User|Pass ({selectedAccounts.size})
          </button>

          <button
            onClick={selectAll}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <CheckSquare size={16} />
            Chọn Tất Cả
          </button>

          <button
            onClick={deselectAll}
            className="flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <Square size={16} />
            Bỏ Chọn
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-zinc-800 border-b border-zinc-700">
              <th className="px-6 py-4 text-left">
                <input
                  type="checkbox"
                  checked={
                    selectedAccounts.size === accounts.length &&
                    accounts.length > 0
                  }
                  onChange={() =>
                    selectedAccounts.size === accounts.length
                      ? deselectAll()
                      : selectAll()
                  }
                  className="w-4 h-4 text-blue-600 bg-zinc-700 border-zinc-600 rounded focus:ring-blue-500 focus:ring-2"
                />
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                #
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                Tài Khoản
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                Mật Khẩu
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                Xu
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                Tiền
              </th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                Cấp độ
              </th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                Trạng Thái
              </th>

              <th className="px-6 py-4 text-center text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                Thời Gian
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-zinc-700">
            {sortedAccounts.map((account, index) => {
              const statusInfo = statusConfig(account.status);
              return (
                <tr
                  key={account.id}
                  className={`transition-all duration-200 hover:bg-zinc-800/80 ${
                    selectedAccounts.has(account.id)
                      ? "bg-blue-900/20 border-l-4 border-blue-500"
                      : ""
                  }`}
                >
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedAccounts.has(account.id)}
                      onChange={() => toggleSelectAccount(account.id)}
                      className="w-4 h-4 text-blue-600 bg-zinc-700 border-zinc-600 rounded focus:ring-blue-500 focus:ring-2"
                    />
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-zinc-400">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <div className="text-sm font-medium text-white">
                          {account.userName}
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          copyToClipboard(
                            account.userName,
                            `username-${account.id}`
                          )
                        }
                        className="flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-700 hover:bg-zinc-600 text-zinc-300 hover:text-white transition-all duration-200"
                      >
                        {copiedItems[`username-${account.id}`] ? (
                          <Check size={14} className="text-green-400" />
                        ) : (
                          <Copy size={14} />
                        )}
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <div className="text-sm font-mono text-zinc-300">
                          {visiblePasswords[account.id]
                            ? account.passWord
                            : "••••••••"}
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => togglePasswordVisibility(account.id)}
                          className="flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-700 hover:bg-zinc-600 text-zinc-300 hover:text-white transition-all duration-200"
                        >
                          {visiblePasswords[account.id] ? (
                            <EyeOff size={14} />
                          ) : (
                            <Eye size={14} />
                          )}
                        </button>
                        <button
                          onClick={() =>
                            copyToClipboard(
                              account.passWord,
                              `password-${account.id}`
                            )
                          }
                          className="flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-700 hover:bg-zinc-600 text-zinc-300 hover:text-white transition-all duration-200"
                        >
                          {copiedItems[`password-${account.id}`] ? (
                            <Check size={14} className="text-green-400" />
                          ) : (
                            <Copy size={14} />
                          )}
                        </button>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Coins size={16} className="text-yellow-400" />
                      <span className="text-sm font-semibold text-white">
                        {account.coins.toLocaleString()}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <DollarSign size={16} className="text-green-400" />
                      <span className="text-sm font-semibold text-white">
                        {account.money.toLocaleString()}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-center">
                    <span className="text-sm font-semibold text-white">
                      {account.level.toLocaleString()}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center">
                      <span
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${statusInfo.className}`}
                      >
                        <div
                          className={`w-2 h-2 rounded-full ${statusInfo.dot}`}
                        ></div>
                        {statusInfo.text}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2 text-zinc-400">
                      <Calendar size={14} />
                      <span className="text-xs">
                        {getRelativeTime(account.createdAt)}
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer Stats */}
      <div className="bg-zinc-800/50 px-6 py-4 border-t border-zinc-700">
        <div className="flex items-center justify-between text-sm text-zinc-400">
          <div>Hiển thị {sortedAccounts.length} tài khoản</div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span>Tổng xu:</span>
              <span className="font-semibold text-yellow-400">
                {totalCoins.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span>Tổng tiền:</span>
              <span className="font-semibold text-green-400">
                {totalMoney.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
