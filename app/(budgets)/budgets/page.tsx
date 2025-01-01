"use client";

import React, { useState, useEffect } from "react";
import { IBudget } from "@/app/_types/Budget";
import Navbar from "@/app/_components/Navbar";
import { useRouter } from "next/navigation";
import LogInToAccess from "@/app/_components/LogInToAccess";

export default function BudgetPage() {
  const [budgets, setBudgets] = useState<IBudget[]>([]);
  const [error, setError] = useState<string>("");
  const token = sessionStorage.getItem("authToken");
  const router = useRouter();

  const navigateToCreateBudget = () => {
    router.push("/budget/create")
  }

  useEffect(() => {
    if (!token) {
      setError("User not authenticated.");
      return;
    }

    fetch("http://localhost:8080/budgets", {
      method: "GET",
      headers: {

        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(setBudgets)
      .catch(() => setError("Failed to load budgets."));
  }, [token]);

  return (
    <>
      <Navbar />

      {token ? (
        <div className="max-w-sm mx-auto p-6 bg-cyan-700 shadow-md rounded-lg mt-10">
          <h1 className="text-xl font-bold text-center text-white mb-6">Budgets</h1>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <div className="my-8">
            <h2 className="text-xl font-semibold text-white">My Budgets</h2>

            {budgets.length === 0 ? (
              <p className="text-center text-gray-300">No budgets available.</p>
            ) : (
              <ul className="list-none">
                {budgets.map((budget) => (
                  <li
                    key={budget.trip_id}
                    className="my-2 p-4 bg-cyan-600 rounded-md shadow-lg"
                  >
                    <h3 className="text-lg font-bold text-white">{budget.name}</h3>
                    <p className="text-white">Total: {budget.total}</p>
                  </li>
                ))}
              </ul>
            )}

            <button
              onClick={navigateToCreateBudget}
              className="px-6 py-2 bg-cyan-500 text-white font-medium rounded hover:bg-cyan-400"
            >
              + Create new budget
            </button>
          </div>
        </div>
      ) : (
        <LogInToAccess />
      )}
    </>
  );
}