"use client";

import { useAuth } from "@/context/AuthContext";
import {
  FaMoneyBillWave,
  FaChartLine,
  FaShieldAlt,
  FaArrowRight,
} from "react-icons/fa";
import Link from "next/link";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Wallet Dashboard
            </h1>
            <p className="text-xl mb-8">
              Track your transactions and manage your finances with ease
            </p>
            <div className="flex justify-center gap-4">
              <Link
                href="/login"
                className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-md font-medium flex items-center"
              >
                Get Started <FaArrowRight className="ml-2" />
              </Link>
              {user && (
                <Link
                  href="/dashboard"
                  className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-md font-medium"
                >
                  Go to Dashboard
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Key Features
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <div className="bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <FaMoneyBillWave className="text-blue-500 text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Track Expenses
            </h3>
            <p className="text-gray-600">
              Monitor all your transactions in one place with detailed history
              and categorization.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <div className="bg-green-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <FaChartLine className="text-green-500 text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Financial Analytics
            </h3>
            <p className="text-gray-600">
              Get insights into your spending patterns with tables and
              summaries.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <div className="bg-purple-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <FaShieldAlt className="text-purple-500 text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Secure Access
            </h3>
            <p className="text-gray-600">
              Your financial data is protected with industry-standard security
              protocols.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Ready to manage your finances?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Start tracking your transactions and take control of your financial
            life today.
          </p>
          <Link
            href="/login"
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-md font-medium inline-flex items-center"
          >
            Login Now <FaArrowRight className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
}
