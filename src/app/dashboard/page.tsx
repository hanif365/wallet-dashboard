"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { transactionsData } from "@/data/transactions";

type Transaction = {
  id: number;
  type: "credit" | "debit";
  amount: number;
  description: string;
  date: string;
};

export default function DashboardPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [transactions] = useState<Transaction[]>(
    transactionsData as Transaction[]
  );

  // Calculate balance from transactions
  const balance = transactions.reduce((total, transaction) => {
    return transaction.type === "credit"
      ? total + transaction.amount
      : total - transaction.amount;
  }, 0);

  // Get the 3 most recent transactions
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/login");
    }
  }, [user, isLoading, router]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (user) {
    return (
      <div className="container mx-auto px-4 py-8">
        {/* Balance Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Current Balance
          </h2>
          <p className="text-3xl font-bold text-blue-600">
            ${balance.toFixed(2)}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Recent Transactions
          </h2>
          <div className="space-y-4">
            {recentTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex justify-between items-center border-b pb-3"
              >
                <div>
                  <p className="font-medium">{transaction.description}</p>
                  <p className="text-sm text-gray-500">
                    {formatDate(transaction.date)}
                  </p>
                </div>
                <p
                  className={`font-semibold ${
                    transaction.type === "credit"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {transaction.type === "credit" ? "+" : "-"}$
                  {transaction.amount.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
}
