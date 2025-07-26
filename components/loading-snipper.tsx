import React from "react";
import { Loader2, Database, Users, TrendingUp } from "lucide-react";

interface LoadingProps {
  message?: string;
  type?: "default" | "accounts" | "analysis" | "data";
  size?: "sm" | "md" | "lg";
}

const Loading: React.FC<LoadingProps> = ({
  message = "Đang tải dữ liệu...",
  type = "default",
  size = "md",
}) => {
  const getIcon = () => {
    switch (type) {
      case "accounts":
        return (
          <Users
            className="animate-pulse"
            size={size === "sm" ? 20 : size === "md" ? 24 : 32}
          />
        );
      case "analysis":
        return (
          <TrendingUp
            className="animate-pulse"
            size={size === "sm" ? 20 : size === "md" ? 24 : 32}
          />
        );
      case "data":
        return (
          <Database
            className="animate-pulse"
            size={size === "sm" ? 20 : size === "md" ? 24 : 32}
          />
        );
      default:
        return (
          <Loader2
            className="animate-spin"
            size={size === "sm" ? 20 : size === "md" ? 24 : 32}
          />
        );
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return {
          container: "p-4",
          text: "text-sm",
          dots: "w-1.5 h-1.5",
          spacing: "gap-2",
        };
      case "lg":
        return {
          container: "p-8",
          text: "text-lg",
          dots: "w-3 h-3",
          spacing: "gap-4",
        };
      default:
        return {
          container: "p-6",
          text: "text-base",
          dots: "w-2 h-2",
          spacing: "gap-3",
        };
    }
  };

  const sizeClasses = getSizeClasses();

  return (
    <div className="flex items-center justify-center min-h-[200px] w-full">
      <div
        className={`bg-zinc-800/90 backdrop-blur-sm rounded-2xl border border-zinc-700 shadow-2xl ${sizeClasses.container}`}
      >
        <div className={`flex flex-col items-center ${sizeClasses.spacing}`}>
          {/* Main Icon */}
          <div className="text-blue-400 mb-2">{getIcon()}</div>

          {/* Loading Text */}
          <div
            className={`text-white font-medium ${sizeClasses.text} text-center`}
          >
            {message}
          </div>

          {/* Animated Dots */}
          <div className="flex items-center gap-1 mt-2">
            <div
              className={`${sizeClasses.dots} bg-blue-400 rounded-full animate-bounce`}
              style={{ animationDelay: "0ms" }}
            ></div>
            <div
              className={`${sizeClasses.dots} bg-blue-400 rounded-full animate-bounce`}
              style={{ animationDelay: "150ms" }}
            ></div>
            <div
              className={`${sizeClasses.dots} bg-blue-400 rounded-full animate-bounce`}
              style={{ animationDelay: "300ms" }}
            ></div>
          </div>

          {/* Progress Bar */}
          <div className="w-full max-w-xs mt-4">
            <div className="w-full bg-zinc-700 rounded-full h-1 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Loading Overlay Component
const LoadingOverlay: React.FC<LoadingProps> = ({
  message = "Đang xử lý...",
  type = "default",
  size = "md",
}) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <Loading message={message} type={type} size={size} />
    </div>
  );
};

// Inline Loading Component (for smaller spaces)
const InlineLoading: React.FC<{ message?: string }> = ({
  message = "Đang tải...",
}) => {
  return (
    <div className="flex items-center justify-center gap-2 py-4">
      <Loader2 className="animate-spin text-blue-400" size={16} />
      <span className="text-zinc-300 text-sm">{message}</span>
    </div>
  );
};

// Table Loading Skeleton
const TableLoadingSkeleton: React.FC<{ rows?: number }> = ({ rows = 5 }) => {
  return (
    <div className="bg-zinc-800 rounded-2xl p-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-8 h-8 bg-zinc-700 rounded-lg"></div>
        <div className="w-48 h-6 bg-zinc-700 rounded"></div>
      </div>

      {/* Action Buttons Skeleton */}
      <div className="flex gap-3 mb-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="w-32 h-10 bg-zinc-700 rounded-lg"></div>
        ))}
      </div>

      {/* Table Header Skeleton */}
      <div className="grid grid-cols-8 gap-4 mb-4 pb-4 border-b border-zinc-700">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="h-4 bg-zinc-700 rounded"></div>
        ))}
      </div>

      {/* Table Rows Skeleton */}
      {[...Array(rows)].map((_, i) => (
        <div
          key={i}
          className="grid grid-cols-8 gap-4 py-4 border-b border-zinc-700/50"
        >
          <div className="w-4 h-4 bg-zinc-700 rounded"></div>
          <div className="h-4 bg-zinc-700 rounded"></div>
          <div className="h-4 bg-zinc-700 rounded"></div>
          <div className="h-4 bg-zinc-700 rounded"></div>
          <div className="h-4 bg-zinc-700 rounded"></div>
          <div className="h-4 bg-zinc-700 rounded"></div>
          <div className="w-20 h-6 bg-zinc-700 rounded-full"></div>
          <div className="h-4 bg-zinc-700 rounded"></div>
        </div>
      ))}
    </div>
  );
};

// Card Loading Skeleton
const CardLoadingSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-pulse">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="bg-zinc-800 rounded-xl p-6 border border-zinc-700"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-zinc-700 rounded-lg"></div>
            <div className="w-16 h-8 bg-zinc-700 rounded"></div>
          </div>
          <div className="w-32 h-6 bg-zinc-700 rounded mb-2"></div>
          <div className="w-24 h-4 bg-zinc-700 rounded"></div>
        </div>
      ))}
    </div>
  );
};

// Demo Component showing all loading states
const LoadingDemo: React.FC = () => {
  return (
    <div className="min-h-screen bg-zinc-900 p-6 space-y-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">
          Loading Components Demo
        </h1>

        {/* Default Loading */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">
            Default Loading
          </h2>
          <Loading />
        </div>

        {/* Different Types */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">
            Different Types
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Loading type="default" message="Đang tải..." size="sm" />
            <Loading
              type="accounts"
              message="Đang tải tài khoản..."
              size="sm"
            />
            <Loading type="analysis" message="Đang phân tích..." size="sm" />
            <Loading type="data" message="Đang xử lý dữ liệu..." size="sm" />
          </div>
        </div>

        {/* Inline Loading */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">
            Inline Loading
          </h2>
          <div className="bg-zinc-800 rounded-xl p-4">
            <InlineLoading message="Đang đồng bộ dữ liệu..." />
          </div>
        </div>

        {/* Table Skeleton */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">
            Table Loading Skeleton
          </h2>
          <TableLoadingSkeleton rows={3} />
        </div>

        {/* Card Skeleton */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">
            Card Loading Skeleton
          </h2>
          <CardLoadingSkeleton />
        </div>
      </div>
    </div>
  );
};

export default LoadingDemo;
export {
  Loading,
  LoadingOverlay,
  InlineLoading,
  TableLoadingSkeleton,
  CardLoadingSkeleton,
};
