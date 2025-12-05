export interface LocationInterface {
    id: number,
    userId: number,
    name: string,
    slug: string,
    description: string,
    tablesTotal: number | string,
    status: string,
    locationName?: string,
    createdAt: string,
    updatedAt: string,
}


export const LocationEntity: LocationInterface = {
    id: 0,
    userId: 0,
    name: "",
    slug: "",
    description: "",
    tablesTotal: 0,
    status: "",
    createdAt: "",
    updatedAt: "",
}


export interface LocationErrorInterface {
    id: string,
    userId: string,
    name: string,
    slug: string,
    description: string,
    tablesTotal: string,
    status: string,
    createdAt: string,
    updatedAt: string,
}


export const LocationErrorEntity: LocationErrorInterface = {
    id: "",
    userId: "",
    name: "",
    slug: "",
    description: "",
    tablesTotal: "",
    status: "",
    createdAt: "",
    updatedAt: "",
}