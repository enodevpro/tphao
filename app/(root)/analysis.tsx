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
  const moneyEarned = Math.floor((remainingCoins / 25_000_000) * 10_000); // Đổi xu ra VND
  const formattedMoneyEarned = moneyEarned.toLocaleString("en-US");

  return (
    <div className="p-5 bg-zinc-800 rounded-lg mb-5 space-y-3">
      <p className="text-white bg-green-500 px-5 py-2 rounded-lg shadow-lg font-bold">
        Tổng xu hiện có: <span>{formattedCoins}</span>
      </p>
      <p className="text-white bg-yellow-500 px-5 py-2 rounded-lg shadow-lg font-bold">
        Số xu sau khi trừ phí 5%: <span>{formattedRemainingCoins}</span>
      </p>
      <p className="text-white bg-blue-500 px-5 py-2 rounded-lg shadow-lg font-bold">
        Số tiền kiếm được: <span>{formattedMoneyEarned} VND</span>
      </p>
    </div>
  );
};

export default Analysis;
