import { IBudget } from "./IBudget";

export interface ICreateBudgetModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (budgetData: IBudget) => void;
}