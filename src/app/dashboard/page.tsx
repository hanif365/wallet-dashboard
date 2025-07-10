"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { transactionsData } from "@/data/transactions";
import {
  FaMoneyBillWave,
  FaArrowDown,
  FaArrowUp,
  FaExchangeAlt,
} from "react-icons/fa";

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

  const balance = transactions.reduce((total, transaction) => {
    return transaction.type === "credit"
      ? total + transaction.amount
      : total - transaction.amount;
  }, 0);

  const totalCredits = transactions
    .filter((transaction) => transaction.type === "credit")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const totalDebits = transactions
    .filter((transaction) => transaction.type === "debit")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const creditTransactions = transactions.filter((t) => t.type === "credit");
  const lastCreditTransaction =
    creditTransactions.length > 0
      ? [...creditTransactions].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        )[0]
      : null;

  const debitTransactions = transactions.filter((t) => t.type === "debit");
  const lastDebitTransaction =
    debitTransactions.length > 0
      ? [...debitTransactions].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        )[0]
      : null;

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
        <h1 className="text-2xl font-bold mb-6 text-black">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-md p-6 relative">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-gray-500 text-sm font-medium">
                  Current Balance
                </h2>
                <p className="text-3xl text-blue-500 font-bold mt-2">
                  ${balance.toFixed(2)}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <FaMoneyBillWave className="h-6 w-6 text-blue-500" />
              </div>
            </div>
            <p className="text-xs text-blue-500 mt-4">
              {" "}
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 relative">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-gray-500 text-sm font-medium">
                  All Credits
                </h2>
                <p className="text-3xl font-bold mt-2 text-green-600">
                  ${totalCredits.toFixed(2)}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <FaArrowUp className="h-6 w-6 text-green-500" />
              </div>
            </div>
            <p className="text-xs text-green-500 mt-4">
              Last credit:{" "}
              {lastCreditTransaction
                ? formatDate(lastCreditTransaction.date)
                : "N/A"}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 relative">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-gray-500 text-sm font-medium">
                  All Debits
                </h2>
                <p className="text-3xl font-bold mt-2 text-red-600">
                  ${totalDebits.toFixed(2)}
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <FaArrowDown className="h-6 w-6 text-purple-500" />
              </div>
            </div>
            <p className="text-xs text-purple-500 mt-4">
              Last debit:{" "}
              {lastDebitTransaction
                ? formatDate(lastDebitTransaction.date)
                : "N/A"}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 relative">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-gray-500 text-sm font-medium">
                  All Transactions
                </h2>
                <p className="text-3xl text-green-600 font-bold mt-2">
                  {transactions.length}
                </p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <FaExchangeAlt className="h-6 w-6 text-orange-500" />
              </div>
            </div>
            <p className="text-xs text-orange-500 mt-4">Total transactions</p>
          </div>
        </div>

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
                  <p className="font-medium text-blue-500">{transaction.description}</p>
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
