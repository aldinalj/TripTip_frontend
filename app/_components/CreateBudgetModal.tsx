import React, { useState } from "react";
import { ICreateBudgetModalProps } from "../_types/ICreateBudgetModalProps";
import { IBudget } from "../_types/IBudget";

const CreateBudgetModal: React.FC<ICreateBudgetModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [budget, setBudget] = useState<IBudget>({
    id: 0,
    name: "",
    total: 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBudget((prevBudget) => ({
      ...prevBudget,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(budget);
    onClose();
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-slate-900 bg-opacity-50 flex justify-center items-center">
        <div className="p-8 rounded-lg w-96 bg-cyan-800 border-black border-2 ">
          <h2 className="text-2xl font-bold mb-4 text-white">
            Create New Budget
          </h2>
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
              <label
                htmlFor="country"
                className="block text-lg mb-2 text-white"
              >
                Country
              </label>
              <input
                type="text"
                id="country"
                name="country"
                value={budget.total}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
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
