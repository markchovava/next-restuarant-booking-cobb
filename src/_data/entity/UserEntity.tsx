export interface UserInterface{
    id: number,
    name: string,
    email: string,
    phone: string,
    password: string,
    roleLevel: number | string,
    isAdmin: string | number,
    code: string,
    createdAt: string
    updatedAt: string
}

export const UserEntity: UserInterface = {
    id: 0,
    name: "",
    email: "",
    phone: "",
    password: "",
    code: "",
    roleLevel: 0,
    isAdmin: 0,
    createdAt: "",
    updatedAt: ""
}