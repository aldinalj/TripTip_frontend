"use client";
import BudgetDropDown from "@/app/_components/BudgetDropDown";
import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/app/_components/Navbar";
import { ISpending } from "@/app/_types/ISpending";


export default function CreateSpending() {
  const [spending, setSpending] = useState<ISpending>({
    name: "",
    desc: "",
    money_spent: 0, 
    budget_id: 0,
    trip_id: 0
  });

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const token = sessionStorage.getItem("authToken");

  


  function handleSpendingChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    
    setSpending((prevData) => ({
      ...prevData,
      [name]: name === "money_spent" ? Number(value) : value,
    }));
  }

  function handleBudgetSelection(budgetId: number | null, tripId: number | null) {
    setSpending((prevData) => ({ ...prevData, budget_id: budgetId ?? 0, trip_id: tripId ?? 0, }));
  }

  

  function onSubmit(event: FormEvent) {
    event.preventDefault();

    if (!spending.budget_id) {
      setError("Please select a list.");
      return;
    }

    setLoading(true);

    fetch("http://localhost:8080/spendings/create", {
      method: "POST",
      headers: { "content-type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
      body: JSON.stringify(spending),
    })
      .then((response) => {
        setLoading(false);

        if (!response.ok) {
          return response.json().then((errorData) => {
            throw new Error(errorData.message);
          });
        }

        alert("Spending created successfully!");
        router.push("/spendings"); 
      })
      .catch((error) => {
        setError(error.message || "An error occurred. Please try again.");
        setLoading(false);
      });
  }

  return (
    <div>
    <Navbar />
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md bg-cyan-700 rounded-lg shadow-lg p-8">
        <header className="text-4xl font-bold text-white text-center mb-6">Create a Spending</header>

        {error && <p className="text-red-700 text-center mb-4">{error}</p>}

        <form onSubmit={onSubmit} className="space-y-6 text-cyan-900">
          <BudgetDropDown onBudgetSelect={handleBudgetSelection} />

    
          <div>
            <label htmlFor="name" className="block text-lg font-medium mb-2 text-cyan-200">
              Spending Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={spending.name}
              onChange={handleSpendingChange}
              placeholder="Name"
              required
              className="block w-full p-2 rounded-md shadow-sm text-cyan-950 focus:outline-none placeholder-cyan-800 focus:ring-2 focus:ring-cyan-800"
            />
          </div>

          <div>
            <label htmlFor="name" className="block text-lg font-medium mb-2 text-cyan-200">
              Description
            </label>
            <input
              id="description"
              name="desc"
              type="text"
              value={spending.desc}
              onChange={handleSpendingChange}
              placeholder="Description"
              required
              className="block w-full p-2 rounded-md shadow-sm text-cyan-950 focus:outline-none placeholder-cyan-800 focus:ring-2 focus:ring-cyan-800"
            />
          </div>

          <div>
            <label htmlFor="name" className="block text-lg font-medium mb-2 text-cyan-200">
              Money spent
            </label>
            <input
              id="moneyspent"
              name="money_spent"
              type="number"
              value={spending.money_spent}
              onChange={handleSpendingChange}
              placeholder="Money spent"
              required
              className="block w-full p-2 rounded-md shadow-sm text-cyan-950 focus:outline-none placeholder-cyan-800 focus:ring-2 focus:ring-cyan-800"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 text-white font-semibold rounded-md shadow-sm hover:bg-cyan-500 ${
              loading
                ? "bg-cyan-600 cursor-not-allowed"
                : "bg-cyan-600 hover:bg-cyan-600 focus:ring-2 focus:ring-cyan-600"
            }`}
          >
            {loading ? "Creating..." : "Create Spending"}
          </button>
        </form>
      </div>
    </div>
  </div>
  );
}
