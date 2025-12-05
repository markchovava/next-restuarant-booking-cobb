"use client"
import { _scheduleBookingPaginateAction, _scheduleBookingSearchAction, _scheduleBookingViewAction } from "@/_api/actions/ScheduleBookingActions";
import { MetaEntity, MetaInterface, MetaLinksEntity, MetaLinksInterface, ResponseInterface } from "@/_data/entity/ResponseEntity";
import { ScheduleBookingEntity, ScheduleBookingInterface } from "@/_data/entity/ScheduleBookingEntity";
import { create } from "zustand";


interface StoreInterface{
    isSubmitting: boolean,
    isLoading: boolean,
    isSearching: boolean,
    toggleModal: boolean,
    search: string,
    meta: MetaInterface,
    links: MetaLinksInterface,
    data: ScheduleBookingInterface,
    preData: ScheduleBookingInterface,
    dataList: ScheduleBookingInterface[],
    errors: ScheduleBookingInterface,
    message: string,
    setIsSearching: (i: boolean) => void,
    setSearch: (e: React.ChangeEvent<HTMLInputElement>) => void,
    setToggleModal: (i: boolean) => void,
    setMessage: (i: string) => void,
    setIsSubmitting: (i: boolean) => void,
    setData: (i: ScheduleBookingInterface) => void,
    setValue: (name: string, value: string | number) => void,
    setInputValue: (
        e: React.ChangeEvent<HTMLInputElement> | 
        React.ChangeEvent<HTMLTextAreaElement> |
        React.ChangeEvent<HTMLSelectElement>
    ) => void,
    resetData: () => void,
    clearErrors: () => void,
    setDataList: (data: ResponseInterface) => void,
    getSearchDatalist: (search: string) => Promise<void>
    getPaginatedDatalist: (url: string) => Promise<void>
    getData: (id: string | number) => Promise<void>
}


export const useScheduleBookingAdminStore = create<StoreInterface>((set, get) => ({
    isSubmitting: false,
    isLoading: true,
    isSearching: false,
    toggleModal: false,
    search: "",
    meta: MetaEntity,
    links: MetaLinksEntity,
    data: ScheduleBookingEntity,
    preData: ScheduleBookingEntity,
    dataList: [],
    message: "",
    errors: ScheduleBookingEntity,
    setIsSearching: (i) => {
        set({ isSearching: i})
    },
    setSearch: (e) => {
        const { value } = e.target;
        set({ search: value })
    },
    setToggleModal: (i) => {
        set({ toggleModal: i })
    },
    setMessage: (i) => {
        set({
            message: i
        })
    },
    setIsSubmitting: (i) => {
        set({ isSubmitting: i })
    },
    setData: (i) => {
        set({ 
            data: i,
            preData: i,
            isLoading: false
        })
    },
    setValue: (name, value) => {
        const data = get().data
        set({
            data: {...data, [name]: value}
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
            errors: currentErrors[name as keyof ScheduleBookingInterface]
                ? { ...currentErrors, [name]: undefined }
                : currentErrors
        });
    },
    resetData: () => {
        set({ data: ScheduleBookingEntity })
    },
    clearErrors: () => {
        set({
            errors: ScheduleBookingEntity,
        })
    },
    setDataList: (res) => {
        const {links, meta, data} = res
        set({
            dataList: data,
            links: links,
            meta: meta,
            isLoading: false,
        })
    },
    getPaginatedDatalist: async (url: string) => {
        set({ isLoading: true });
        try {
            const res = await _scheduleBookingPaginateAction(url);
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
            const res = await _scheduleBookingSearchAction(search);
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
    getData: async (id) => {
        set({ isLoading: true });
        try {
            const res = await _scheduleBookingViewAction(id);
            if (res && res.data) {
                set({
                    data: res.data,
                    preData: res.data,
                    isLoading: false,
                });
            } else {
                set({
                    data: ScheduleBookingEntity,
                    preData: ScheduleBookingEntity,
                    isLoading: false,
                });
            }
        } catch (error) {
            console.error(`Error: ${error}`);
            set({
                data: ScheduleBookingEntity,
                preData: ScheduleBookingEntity,
                isLoading: false,
            });
        }
    },
}))

