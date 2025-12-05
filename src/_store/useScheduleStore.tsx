"use client"

import { _scheduleListAction, _schedulePaginateAction, _scheduleSearchAction, _scheduleViewAction } from "@/_api/actions/ScheduleActions";
import { BookingCookieEntity, BookingCookieInterface } from "@/_data/entity/BookingEntity";
import { MetaEntity, MetaInterface, MetaLinksEntity, MetaLinksInterface, ResponseInterface } from "@/_data/entity/ResponseEntity"
import { ScheduleEntity, ScheduleInterface } from "@/_data/entity/ScheduleEntity"
import { create } from "zustand"



interface StoreInterface{
    data: ScheduleInterface,
    search: string,
    dataList: ScheduleInterface[],
    errors: ScheduleInterface,
    preData: ScheduleInterface,
    selectedSchedule: ScheduleInterface,
    message: string,
    isLoading: boolean,
    isLoading2: boolean,
    isSubmitting: boolean,
    isSearching: boolean,
    toggleModal: boolean,
    meta: MetaInterface,
    links: MetaLinksInterface,
    scheduleList: ScheduleInterface[],
    inputCookie: BookingCookieInterface,
    setError: (name: string, value: string) => void,
    setDataList: (i: ResponseInterface) => void,
    setInputCookie: (i: BookingCookieInterface) => void,
    setSelectedSchedule: (i: ScheduleInterface) => void,
    setScheduleList: (i: ScheduleInterface[]) => void,
    setIsLoading: (i: boolean) => void,
    setInputValue: (
        e: React.ChangeEvent<HTMLInputElement> | 
        React.ChangeEvent<HTMLTextAreaElement> |
        React.ChangeEvent<HTMLSelectElement>
    ) => void,
    setMessage: (i: string) => void,
    setSearch: (e: React.ChangeEvent<HTMLInputElement>) => void,
    setData: (i: ScheduleInterface) => void,
    setToggleModal: (i: boolean) => void,
    setIsSearching: (i: boolean) => void,
    setIsSubmitting: (i: boolean) => void,
    setValue: (name: string, value: string | number) => void,
    resetData: () => void,
    clearErrors: () => void,
    validateField: (name: string, value: string | number) => string,
    validateForm: () => { isValid: boolean; errors: ScheduleInterface },
    getData: (i: number | string) => Promise<void>,
    getDataList: () => Promise<void>
    getSearchDatalist: (search: string) => Promise<void>
    getPaginatedDatalist: (url: string) => Promise<void>
}


export const useScheduleStore = create<StoreInterface>((set, get) => ({
    data: ScheduleEntity,
    dataList: [],
    search: "",
    errors: ScheduleEntity,
    preData: ScheduleEntity,
    selectedSchedule: ScheduleEntity,
    message: "",
    isLoading: false,
    isLoading2: true,
    isSubmitting: false,
    isSearching: false,
    toggleModal: false,
    meta: MetaEntity,
    links: MetaLinksEntity, 
    scheduleList: [],
    inputCookie: BookingCookieEntity,
    setError: (name, value) => {
        const currentErrors = get().errors
        set({
            errors: {...currentErrors, [name]: value}
        })
    },
    setDataList: (res) => {
        const {links, meta, data} = res
        set({
            dataList: data,
            links: links,
            meta: meta,
            isLoading: false,
            isLoading2: false,
        })
    },
    setInputCookie: (i) => {
        set({ inputCookie: i })
    },
    setSelectedSchedule: (i) => {
        set({ selectedSchedule: i })
    },
    setIsLoading: (i) => {
        set({ isLoading: i })
    },
    setScheduleList: (i) => {
        set({ 
            scheduleList: i,
            isLoading: false,
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
    setMessage: (i) => {
        set({ message: i })
    },
    setSearch: (e) => {
        const { value } = e.target;
        set({ search: value })
    },
    setData: (i) => {
        set({ 
            data: i,
            preData: i,
            isLoading2: false,
        })
    },
    setToggleModal: (i) => {
        set({ toggleModal: i })
    },
    setIsSearching: (i) => {
        set({ isSearching: i })
    },
    setIsSubmitting: (i) => {
        set({ isSubmitting: i })
    },
    setValue: (name, value) => {
        const currentData = get().data;
        const currentErrors = get().errors;
        set({ 
            data: {...currentData, [name]: value},
            // Clear error for this field if it exists
            errors: currentErrors[name as keyof typeof currentErrors]
                ? { ...currentErrors, [name]: "" }
                : currentErrors
        })
    },
    resetData: () => {
        set({ data: ScheduleEntity })
    },
    clearErrors: () => { 
        set({ errors: ScheduleEntity })
    },
    validateField: (name, val) => {
        const { data } = get();
        const value = val.toString()
        let error = ""
        switch(name){
            case "guests":
                if(!value.trim()){
                    error = "At least one Guest is required.";
                } 
                break;
            case "date":
                if(!value.trim()){
                    error = "Date is required.";
                } 
                break;
            case "time":
                if(!value.trim()){
                    error = "Time is required.";
                } 
                break;
            case "status":
                if (!value.trim()) {
                    error = "Status is required.";
                }
                break;
            default:
                break;
        }
        return error
    },
    validateForm: () => { 
        const { data } = get();
        let errors = { ...ScheduleEntity };
        let hasError = false;
        // Validate GUESTS
        const guestsError = get().validateField("guests", data.guests);
        if (guestsError) {
            errors.guests = guestsError;
            hasError = true;
        }
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
        set({ errors });
        return {
            isValid: !hasError,
            errors
        };
    },
    getData: async (id) => {
        set({ isLoading: true });
        try {
            const res = await _scheduleViewAction(id);
            if (res && res.data) {
                set({
                    data: res.data,
                    preData: res.data,
                    isLoading: false,
                });
            } else {
                set({
                    data: ScheduleEntity,
                    preData: ScheduleEntity,
                    isLoading: false,
                });
            }
        } catch (error) {
            console.error(`Error: ${error}`);
            set({
                data: ScheduleEntity,
                preData: ScheduleEntity,
                isLoading: false,
            });
        }
    },
    getDataList: async() => {
        set({ isLoading: true });
        try {
            const res = await _scheduleListAction();
            // Check if response has the expected structure
            if (res && res.data && res.meta && res.links) {
                set({
                    dataList: res.data,
                    meta: res.meta,
                    links: res.links,
                    isLoading: false,
                });
            } else {
                // Fallback if structure is different
                set({
                    dataList: Array.isArray(res) ? res : res.data || [],
                    meta: res.meta || MetaEntity,
                    links: res.links || MetaLinksEntity,
                    isLoading: false,
                });
            }
        } catch (error) {
            console.error(`Error: ${error}`);
            set({
                dataList: [],
                meta: MetaEntity,
                links: MetaLinksEntity,
                isLoading: false,
            });
        }
    },
    getSearchDatalist: async (search) => {
        set({ isSearching: true });
        try {
            const res = await _scheduleSearchAction(search);
            console.log('res -----------', res)
            // Check if response has the expected structure
            if (res && res.data && res.meta && res.links) {
                set({
                    dataList: res.data,
                    meta: res.meta,
                    links: res.links,
                    isSearching: false,
                });
            } else {
                // Fallback if structure is different
                set({
                    dataList: Array.isArray(res) ? res : res.data || [],
                    meta: res.meta || MetaEntity,
                    links: res.links || MetaLinksEntity,
                    isSearching: false,
                });
            }
        } catch (error) {
            console.error(`Error: ${error}`);
            set({
                dataList: [],
                meta: MetaEntity,
                links: MetaLinksEntity,
                isSearching: false,
            });
        }
    },
    getPaginatedDatalist: async (url: string) => {
        set({ isLoading: true });
        try {
            const res = await _schedulePaginateAction(url);
            // Check if response has the expected structure
            if (res && res.data && res.meta && res.links) {
                set({
                    dataList: res.data,
                    meta: res.meta,
                    links: res.links,
                    isLoading: false,
                });
            } else {
                // Fallback if structure is different
                set({
                    dataList: Array.isArray(res) ? res : res.data || [],
                    meta: res.meta || MetaEntity,
                    links: res.links || MetaLinksEntity,
                    isLoading: false,
                });
            }
        } catch (error) {
            console.error(`Error: ${error}`);
            set({
                dataList: [],
                meta: MetaEntity,
                links: MetaLinksEntity,
                isLoading: false,
            });
        }
    },
}))

