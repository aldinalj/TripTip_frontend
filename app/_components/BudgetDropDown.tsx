import { useState, useEffect } from "react";
import { IFullBudget } from "../_types/Budget";

type BudgetDropDownProps = {
    onBudgetSelect: (budgetId: number | null, trip_id: number | null) => void;
};

export default function BudgetDropDown({ onBudgetSelect }: BudgetDropDownProps) {
  const [budgets, setBudgets] = useState<IFullBudget[]>([]);
  const [selectedBudget, setSelectedBudget] = useState<number | null>(null);
  const token = sessionStorage.getItem("authToken");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetch("http://localhost:8080/budgets", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            throw new Error(errorData.message);
          });
        }
        return response.json();
      })
      .then((data: IFullBudget[]) => setBudgets(data))
      .catch((error) => setError(error.message || "Failed to load budgets."));
  }, []);

  const handleSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const budgetId = Number(event.target.value);
    setSelectedBudget(budgetId);
    const selectedBudget = budgets.find((budget) => budget.id === budgetId);

    setSelectedBudget(budgetId);
    onBudgetSelect(budgetId, selectedBudget?.trip_id ?? null); 
  };

  return (
    <div className="flex flex-col items-center p-4">
      <label htmlFor="list-drop-down" className="mb-2 text-lg font-medium text-cyan-200">
        Select a Budget
      </label>
      {error && <p className="text-red-500">{error}</p>}
      <select
        id="list-drop-down"
        className="w-full max-w-sm p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-cyan-800"
        value={selectedBudget ?? ""}
        onChange={handleSelection}
      >
        <option value="" disabled>
          -- Select a Budget --
        </option>
        {budgets.map((budget) => (
          <option key={budget.id} value={budget.id}>
            {budget.name}
          </option>
        ))}
      </select>
    </div>
  );
}
