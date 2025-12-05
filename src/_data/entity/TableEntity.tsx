import { LocationEntity, LocationInterface } from "./LocationEntity"
import { UserEntity, UserInterface } from "./UserEntity"

export interface TableInterface {
    id: number | string,
    userId: number | string,
    name: string,
    locationId: number | string,
    seats: number | string, 
    quantity: number | string,
    status: string,
    createdAt: string,
    updatedAt: string,
    location: LocationInterface,
    user: UserInterface
}


export const TableEntity: TableInterface = {
    id: "",
    userId: "",
    name: "",
    locationId: "",
    seats: "",
    quantity: "",
    status: "",
    createdAt: "",
    updatedAt: "",
    location: LocationEntity,
    user: UserEntity
}