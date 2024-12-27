"use client";

import React, { useState, useEffect } from "react";
import { IBudget } from "@/app/_types/Budget"; 

export default function BudgetPage() {
  const [budgets, setBudgets] = useState<IBudget[]>([]); 
  const [error, setError] = useState<string>("");
  const token = sessionStorage.getItem("authToken");


  useEffect(() => {
    if (!token) {
      setError("User not authenticated.");
      return;
    }

    fetch("http://localhost:8080/budgets/all", {  
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
    <div>
      <h1 className="text-3xl font-bold text-center my-4">Budgets</h1>


      {error && <p className="text-red-500 text-center">{error}</p>}

   
      <div className="my-8">
        <h2 className="text-xl font-semibold">Your Budgets</h2>

        {budgets.length === 0 ? (
          <p className="text-center text-gray-500">No budgets available.</p>
        ) : (
          <ul className="list-none">
            {budgets.map((budget) => (
              <li key={budget.trip_id} className="my-2 p-4 bg-cyan-200 rounded shadow">
                <h3 className="text-lg font-bold">{budget.name}</h3>
                <p>Total: {budget.total}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
