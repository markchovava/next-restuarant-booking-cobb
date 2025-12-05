"use client"

import { 
    _scheduleBookingListAction, 
    _scheduleBookingPaginateAction, 
    _scheduleBookingSearchAction, 
    _scheduleBookingViewAction, 
    scheduleBookingByDateTimeScheduleAction 
} from "@/_api/actions/ScheduleBookingActions";
import { 
    MetaEntity, 
    MetaInterface, 
    MetaLinksEntity, 
    MetaLinksInterface, 
    ResponseInterface 
} from "@/_data/entity/ResponseEntity";
import { 
    ScheduleBookingEntity, 
    ScheduleBookingInterface 
} from "@/_data/entity/ScheduleBookingEntity"
import { create } from "zustand";



interface ScheduleBookingStore {
    data: ScheduleBookingInterface,
    preData: ScheduleBookingInterface,
    meta: MetaInterface,
    links: MetaLinksInterface,
    dataList: ScheduleBookingInterface[],
    tableList: ScheduleBookingInterface[],
    selectedTable: ScheduleBookingInterface,
    isLoading: boolean,
    isLoading2: boolean,
    isSubmitting: boolean,
    search: string,
    isSearching: boolean,
    errors: ScheduleBookingInterface,
    toggleModal: boolean,
    setError: (name: string, value: string) => void,
    setDataList: (i: ResponseInterface) => void,
    setToggleModal: (i: boolean) => void,
    setSearch: (e: React.ChangeEvent<HTMLInputElement>) => void,
    setSelectedTable: (i: ScheduleBookingInterface) => void,
    setIsLoading: (i: boolean) => void,
    resetData: () => void,
    clearErrors: () => void,
    setIsSubmitting: (i: boolean) => void,
    setData: (i: ScheduleBookingInterface) => void,
    setValue: (name: string, value: string) => void,
    setInputValue: (
        e: React.ChangeEvent<HTMLInputElement> | 
        React.ChangeEvent<HTMLTextAreaElement> |
        React.ChangeEvent<HTMLSelectElement>
    ) => void,
    getScheduleBookingByDateTimeScheduleList: (
        scheduleId: number | string,
        date: string, 
        time: string, 
    ) => Promise<void>,
    getDataList: () => Promise<void>
    getSearchDatalist: (search: string) => Promise<void>,
    getPaginatedDatalist: (url: string) => Promise<void>,
    getData: (i: number | string) => Promise<void>,
}



export const useScheduleBookingStore = create<ScheduleBookingStore>((set, get) => ({
    data: ScheduleBookingEntity,
    preData: ScheduleBookingEntity,
    meta: MetaEntity,
    links: MetaLinksEntity,
    dataList: [],
    search: "",
    isSearching: false,
    tableList: [],
    selectedTable: ScheduleBookingEntity,
    errors: ScheduleBookingEntity,
    isLoading: false,
    isLoading2: true,
    isSubmitting: false,
    toggleModal: false, 
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
            isLoading2:false,
        })
    },
    setToggleModal: (i) => {
        set({ toggleModal: i })
    },
    setSearch: (e) => {
        const { value } = e.target;
        set({ search: value })
    },
    setSelectedTable: (i) => {
        set({ selectedTable: i })
    },
    setIsLoading: (i) => {
        set({ isLoading: i })
    },
    resetData: () => {
        set({
            data: ScheduleBookingEntity
        })
    },
    clearErrors: () => {
        set({
            errors: ScheduleBookingEntity,
        })
    },
    setIsSubmitting: (i) => {
        set({
            isSubmitting: i
        })
    },
    setValue: (name, value) => {
        const currentData = get().data;
        const currentErrors = get().errors;
        set({
            data: {
                ...currentData,
                [name]: value
            },
            errors: {
                ...currentErrors,
                [name]: ""
            }
        });
    },
    setData: (i) => {
        set({ 
            data: i,
            preData: i,
            isLoading: false,
            isLoading2: false,
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
            errors: {
                ...currentErrors,
                [name]: ""
            }
        });
    },
    getScheduleBookingByDateTimeScheduleList: async (scheduleId, date, time) => {
        set({ isLoading: true });
        try {
            //console.log(scheduleId, date, time)
            const res = await scheduleBookingByDateTimeScheduleAction(scheduleId, date, time);
            //console.log('scheduleBookingByDateTimeScheduleAction:: ', res)
            if (res && res.data) {
                set({
                    tableList: res.data,
                    isLoading: false,
                });
            } else {
                set({
                    tableList: [],
                    isLoading: false,
                });
            }
        } catch (error) {
            console.error(`Error: ${error}`);
            set({
                tableList: [],
                isLoading: false,
            });
        }
    },
    getDataList: async() => {
        set({ isLoading: true });
        try {
            const res = await _scheduleBookingListAction();
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