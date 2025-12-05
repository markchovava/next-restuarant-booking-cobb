import { UserEntity, UserInterface } from "./UserEntity"

export interface AppInfoInterface{
    id: number | string,
    userId: number | string,
    name: string,
    phone: string,
    email: string,
    website: string,
    address: string,
    whatsapp: string,
    facebook: string,
    instagram: string
    createdAt: string,
    updatedAt: string,
    description: string,
    user: UserInterface
}


export const AppInfoEntity: AppInfoInterface = {
    id: 0,
    userId: 0,
    name: '',
    phone: '',
    email: '',
    website: '',
    address: '',
    whatsapp: '',
    facebook: '',
    instagram: '',
    description: '',
    createdAt: '',
    updatedAt: '',
    user: UserEntity,
}