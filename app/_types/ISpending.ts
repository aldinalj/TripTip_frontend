export interface IFullSpending {
    id: number,
    name: string,
    desc: string,
    money_spent: number,
    budget_id: number,
    trip_id: number
}

export interface ISpending {
    name: string,
    desc: string,
    money_spent: number
    budget_id: number,
    trip_id: number
}