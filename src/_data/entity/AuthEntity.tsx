export interface AuthInterface{
    id: number,
    name: string,
    email: string,
    phone: string,
    password: string,
    passwordConfirm: string,
    roleLevel: number,
    isAdmin: string | number,
    code: string,
    createdAt: string
    updatedAt: string
}

export const AuthEntity: AuthInterface = {
    id: 0,
    name: "",
    email: "",
    phone: "",
    password: "",
    passwordConfirm: "",
    code: "",
    roleLevel: 0,
    isAdmin: "",
    createdAt: "",
    updatedAt: ""
}