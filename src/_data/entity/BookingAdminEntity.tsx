export interface BookingAdminInterface{
    date: string,
    time: string,
    locationId: string | number,
    locationName: string,
    locationStatus: string,
    tableId: string | number,
    tableName: string,
    tableStatus: string,
}


export const BookingAdminEntity: BookingAdminInterface = {
    date: "",
    time: "",
    locationId: "",
    locationName: "",
    locationStatus: "",
    tableId: "",
    tableName: "",
    tableStatus: "",
}

