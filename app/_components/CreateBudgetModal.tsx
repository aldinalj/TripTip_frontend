import React, { useState, useEffect } from "react";
import { IBudget } from "../_types/Budget";
import { IFullTrip } from "../_types/Trip";

export interface ICreateBudgetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (budgetData: { name: string; total: number; trip_id: number }) => void;
  trips: IFullTrip[]
}

const CreateBudgetModal: React.FC<ICreateBudgetModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [budget, setBudget] = useState({
    name: "",
    total: 0,
    trip_id: 0,  // Include trip_id in the state
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBudget((prevBudget) => ({
      ...prevBudget,
      [name]: name === "total" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (budget.trip_id === 0) {
      alert("Please select a trip.");
      return;
    }
    onSubmit(budget); // Pass budget including trip_id to onSubmit
    onClose();
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-slate-900 bg-opacity-50 flex justify-center items-center">
        <div className="p-8 rounded-lg w-96 bg-cyan-800 border-black border-2">
          <h2 className="text-2xl font-bold mb-4 text-white">Create New Budget</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-lg mb-2 text-white">
                Budget Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={budget.name}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="total" className="block text-lg mb-2 text-white">
                Total
              </label>
              <input
                type="number"
                id="total"
                name="total"
                value={budget.total}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="tripId" className="block text-lg mb-2 text-white">
                Select Trip
              </label>
              <select
                id="tripId"
                name="trip_id"
                value={budget.trip_id || ""}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">--Select a Trip--</option>
                {/* Ensure that trips are passed to the modal */}
              </select>
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={onClose}
                className="bg-red-800 text-white px-4 py-2 rounded border-2 border-red-950"
              >
                Close
              </button>
              <button
                type="submit"
                className="bg-lime-800 text-white px-4 py-2 rounded border-2 border-lime-950"
              >
                Create Budget
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default CreateBudgetModal;