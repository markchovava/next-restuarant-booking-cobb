export interface SeaterInterface{
    id: number,
    name: string,
    quantity: number,
    status: string,
    createdAt?: string,
    updatedAt?: string,
}


export const SeaterEntity: SeaterInterface = {
    id: 0,
    name: "",
    quantity: 0,
    status: "",
    createdAt: "",
    updatedAt: "",
}