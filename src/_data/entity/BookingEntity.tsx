import { LocationEntity, LocationInterface } from "./LocationEntity"

export interface BookingCookieInterface{
    guests: number | string,
    date: string, 
    time: string,
}


export const BookingCookieEntity: BookingCookieInterface = {
    guests: "",
    date: "",
    time: ""
}

export interface BookingIsCheckedInterface{
    cancellation: boolean,
    reservation: boolean
}

export const BookingIsCheckedEntity = {
    cancellation: false,
    reservation: false
}


export interface BookingInterface {
    id: number | string,
    userId: number | string,
    locationId: number | string,
    tableId: number | string,
    scheduleId: number | string,
    bookingRef: string,
    fullName: string,
    phone: string,
    email: string,
    guests: number | string
    date: string,
    time: string,
    tableName: string,
    locationName: string,
    notes: string,
    updatedAt: string,
    createdAt: string,
    cancelPolicy: string,
    reservationPolicy: string,
    location: LocationInterface,
}


export const BookingEntity: BookingInterface = {
    id: "",
    userId: "",
    locationId: "",
    tableId: "",
    scheduleId: "",
    bookingRef: "",
    fullName: "",
    phone: "",
    email: "",
    guests: "",
    date: "",
    time: "",
    tableName: "",
    locationName: "",
    notes: "",
    updatedAt: "",
    createdAt: "",
    cancelPolicy: "",
    reservationPolicy: "",
    location: LocationEntity,
}
