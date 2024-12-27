"use client";

import { useRouter } from "next/navigation";
import { IFullBudget } from "../_types/Budget";

export interface IBudgetCardProps {
  budget: IFullBudget;
}

const BudgetCard: React.FC<IBudgetCardProps> = ({ budget }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/trip/${budget.id}`);
  };

  return (
    <div
      className="trip-card relative p-6 m-4 rounded-lg w-80 h-60 bg-gradient-to-br from-cyan-700 to-cyan-900 shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border-2 overflow-hidden"
      onClick={handleClick}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-cyan-950 to-transparent opacity-70 pointer-events-none"></div>

      <h2 className="text-3xl font-bold text-left text-white mb-4 z-10 relative">
        {budget.name}
      </h2>

      <p className="text-lg text-cyan-100 text-left mb-4 z-10 relative">
        {budget.total}
      </p>
    </div>
  );
};
export default BudgetCard;
