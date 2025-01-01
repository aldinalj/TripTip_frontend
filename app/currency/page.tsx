"use client"

import React, { useState } from "react";
import { ICurrency } from "../_types/ICurrency";
import Navbar from "../_components/Navbar";
import LogInToAccess from "../_components/LogInToAccess";

const CurrencyConverter: React.FC = () => {
    const [from, setFrom] = useState<string>("SEK");
    const [to, setTo] = useState<string>("EUR");
    const [amount, setAmount] = useState<number>(1);
    const [result, setResult] = useState<ICurrency | null>(null);
    const [error, setError] = useState<string>("");
    const token = sessionStorage.getItem("authToken");

    const fetchCurrency = async (from: string, to: string, amount: number) => {
        try {
      
          const response = await fetch(
            `http://localhost:8080/currency?from=${from}&to=${to}&amount=${amount}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem("authToken")}`, 
              },
            }
          );
    
          if (!response.ok) {
            throw new Error("Failed to fetch conversion data");
          }
    
          const data = await response.json();
          setResult(data);
        } catch (err) {
          setError("Failed to fetch currency conversion. Please try again.");
        }
      };
    
      const handleConvert = () => {
        fetchCurrency(from, to, amount); 
      };
    
      return (
        <main>
  <Navbar />
  {token ? (
  <div className="max-w-sm mx-auto p-6 bg-cyan-700 shadow-md rounded-lg mt-10">
    <h1 className="text-xl font-bold text-center text-white mb-6">
      Currency Converter
    </h1>
    <div className="space-y-4">
      <div>
        <label htmlFor="from" className="block text-sm font-medium text-white">
          From
        </label>
        <input
          id="from"
          type="text"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          maxLength={3}
          placeholder="e.g., SEK"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2"
        />
      </div>
      <div>
        <label htmlFor="to" className="block text-sm font-medium text-white">
          To
        </label>
        <input
          id="to"
          type="text"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          maxLength={3} 
          placeholder="e.g., EUR"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2"
        />
      </div>
      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-white">
          Amount
        </label>
        <input
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2"
        />
      </div>
      <button
        onClick={handleConvert}
        className="w-full bg-cyan-500 text-white py-3 px-4 rounded-md shadow hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
      >
        Convert
      </button>
    </div>

    {result && (
      <div className="mt-6 p-4 bg-cyan-600 rounded-md">
        <p className="mt-2 text-white">
          {amount} {from} ={" "}
          <strong className="text-cyan-300">
            {result.conversion_result} {to}
          </strong>
        </p>
      </div>
    )}

    {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
  </div>
   ) : (
    <LogInToAccess />
  )}
</main>
  );
};

export default CurrencyConverter;