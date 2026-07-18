function TransactionTable({ transactions }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow mt-8">
      <h2 className="text-xl font-bold mb-4">Recent Transactions</h2>

      <div className="space-y-3">
        {transactions?.length === 0 && (
          <p className="text-slate-500">No transactions found</p>
        )}

        {transactions?.map((item) => (
          <div
            key={item.id}
            className="flex justify-between border-b pb-3"
          >
            <div>
              <p className="font-semibold">{item.title}</p>
              <p className="text-sm text-slate-500">{item.category}</p>
            </div>

            <p
              className={
                item.type === "Income"
                  ? "text-green-600 font-bold"
                  : "text-red-600 font-bold"
              }
            >
              {item.type === "Income" ? "+" : "-"}₹{item.amount}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TransactionTable;