"use client"

import { _tableByLocationIdListAction } from "@/_api/actions/TableActions";
import { BookingAdminEntity, BookingAdminInterface } from "@/_data/entity/BookingAdminEntity"
import { TableEntity, TableInterface } from "@/_data/entity/TableEntity";
import { create } from "zustand"



interface StoreInterface{
    data: BookingAdminInterface,
    selectedItem: TableInterface,
    tableList: TableInterface[],
    errors: BookingAdminInterface,
    isSubmitting: boolean,
    isLoading: boolean,
    isTableLoading: boolean,
    resetData: () => void,
    clearErrors: () => void,
    setIsTableLoading: (i: boolean) => void,
    setSelectedItem: (i: TableInterface) => void,
    setValue: (name: string, value: string) => void,
    setInputValue: (
        e: React.ChangeEvent<HTMLInputElement> | 
        React.ChangeEvent<HTMLTextAreaElement> |
        React.ChangeEvent<HTMLSelectElement>
    ) => void,
    setData: (i: BookingAdminInterface) => void,
    seError: (name: string, value: string) => void,
    setIsLoading: (i: boolean) => void,
    setIsSubmitting: (i: boolean) => void,
    validateField: (name: string, value: string) => string,
    validateForm: () => { isValid: boolean; errors: BookingAdminInterface },
    getTablesByLocationId: (i: number | string) => Promise<void>
}


export const useBookingAdminStore = create<StoreInterface>((set, get) => ({
    data: BookingAdminEntity,
    selectedItem: TableEntity,
    tableList: [],
    errors: BookingAdminEntity,
    isSubmitting: false,
    isLoading: true,
    isTableLoading: false,
    clearErrors: () => {
        set({ 
            errors: BookingAdminEntity 
        })
    },
    resetData: () => {
        set({ data: BookingAdminEntity })
    },
    setIsTableLoading: (i) => {
        set({
            isTableLoading: i
        })
    },
    setSelectedItem: (i) => {
        const currentData = get().data
        set({ 
            selectedItem: i, 
            data: {...currentData, tableId: i.id, tableName: i.name} 
        })
    },
    setValue: (name, value) => {
        const currentData = get().data;
        const currentErrors = get().errors;
        set({
            data: {...currentData, [name]: value},
            errors: {...currentErrors, [name]: ""},
        })
    },
    setInputValue: (e) => {
        const { name, value } = e.target;
        const currentData = get().data;
        const currentErrors = get().errors;
        set({
            data: {
                ...currentData,
                [name]: value
            },
            // Clear error for this field if it exists
            errors: currentErrors[name as keyof typeof currentErrors]
                ? { ...currentErrors, [name]: "" }
                : currentErrors
        });
    },
    setData: (i) => {
        set({ 
            data: i, 
            isLoading: false
        })
    },
    seError: (name, value) => {
        const currentErrors = get().data
        set({
            errors: {...currentErrors, [name]: value}
        })
    },
    setIsLoading: (i) => {
        set({ isLoading: i })
    },
    setIsSubmitting: (i) => {
        set({ isSubmitting: i })
    },
    validateField: (name, value) => {
        const { data } = get();
        let error = ""
        switch(name){
            case "date":
                if(!value.trim()){
                    error = "Date is required.";
                } 
                break;
            case "locationId":
                if(!value.trim()){
                    error = "Location is required.";
                } 
                break;
            case "locationStatus":
                if(!value.trim()){
                    error = "Location Status is required.";
                } 
                break;
            case "time":
                if (!value.trim()) {
                    error = "Time is required.";
                }
                break;
            default:
                break;
        }
        return error
    },
    validateForm: () => { 
        const { data } = get();
        let errors = { ...BookingAdminEntity };
        let hasError = false;
        // Validate DATE
        const dateError = get().validateField("date", data.date);
        if (dateError) {
            errors.date = dateError;
            hasError = true;
        }
        // Validate TIME
        const timeError = get().validateField("time", data.time);
        if (timeError) {
            errors.time = timeError;
            hasError = true;
        }
        // Validate LOCATION
        const locationIdError = get().validateField("locationId", data.locationId.toString());
        if (locationIdError) {
            errors.locationId = locationIdError;
            hasError = true;
        }
        // Validate LOCATION STATUS
        const locationStatusError = get().validateField("locationStatus", data.locationStatus.toString());
        if (locationStatusError) {
            errors.locationStatus = locationStatusError;
            hasError = true;
        }
        set({ errors });
        return {
            isValid: !hasError,
            errors
        };
    },
    getTablesByLocationId: async (id) => {
        set({ isLoading: true });
        try {
            const res = await _tableByLocationIdListAction(id);
            if (res && res.data) {
                set({
                    tableList: res.data,
                    isTableLoading: false,
                });
            } else {
                set({
                    tableList: [],
                    isTableLoading: false,
                });
            }
        } catch (error) {
            console.error(`Error: ${error}`);
            set({
                tableList: [],
                isTableLoading: false,
            });
        }
    }
}))