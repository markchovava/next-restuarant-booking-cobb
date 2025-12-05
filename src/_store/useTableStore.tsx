"use client"
import { _tableListAction, _tablePaginateAction, _tableSearchAction, _tableViewAction } from "@/_api/actions/TableActions";
import { TableEntity, TableInterface } from "@/_data/entity/TableEntity";
import { MetaEntity, MetaInterface, MetaLinksEntity, MetaLinksInterface, ResponseInterface } from "@/_data/entity/ResponseEntity";
import { create } from "zustand";
import { LocationInterface } from "@/_data/entity/LocationEntity";


interface TableStoreInterface{
    dataList: TableInterface[]
    locations: LocationInterface[],
    meta: MetaInterface,
    links: MetaLinksInterface,
    data: TableInterface,
    errors: Partial<Record<keyof TableInterface, string>>, // Changed to allow string errors
    preData: TableInterface,
    toggleModal: boolean,
    search: string,
    isSearching: boolean,
    isLoading: boolean,
    isSubmitting: boolean,
    validateField: (name: string, value: string) => string,
    validateForm: () => { isValid: boolean; errors: Partial<Record<keyof TableInterface, string>> },
    clearErrors: () => void,
    setInputValue: (
        e: React.ChangeEvent<HTMLInputElement> | 
        React.ChangeEvent<HTMLTextAreaElement> |
        React.ChangeEvent<HTMLSelectElement>
    ) => void,
    resetData: () => void,
    setLocations: (i: LocationInterface[]) => void,
    setDataList: (data: ResponseInterface) => void,
    setIsSearching: (i: boolean) => void,
    setSearch: (e: React.ChangeEvent<HTMLInputElement>) => void,
    setData: (i: TableInterface) => void,
    setToggleModal: (i: boolean) => void
    setIsLoading: (i: boolean) => void,
    setIsSubmitting: (i: boolean) => void,
    getDataList: () => Promise<void>
    getSearchDatalist: (search: string) => Promise<void>
    getPaginatedDatalist: (url: string) => Promise<void>
    getData: (id: string | number) => Promise<void>
}


export const useTableStore = create<TableStoreInterface>((set, get) => ({
    dataList: [],
    locations: [],
    errors: {}, // Changed to empty object
    meta: MetaEntity,
    links: MetaLinksEntity,
    data: TableEntity,
    preData: TableEntity,
    toggleModal: false,
    isLoading: true,
    search: "",
    isSearching: false,
    isSubmitting: false,
    validateField: (name, value) => {
            const { data } = get();
            let error = ""
            switch(name){
                case "name":
                    if(!value.trim()){
                        error = "Full Name is required.";
                    } 
                    break;
                case "seats":
                    if(!value.trim()){
                        error = "Seats Total is required.";
                    } 
                    break;
                case "status":
                    if(!value.trim()){
                        error = "Status is required.";
                    } 
                    break;
                case "locationId":
                    if (!value.trim()) {
                        error = "Location is required.";
                    }
                    break;
                default:
                    break;
            }
            return error
    },
    validateForm: () => { 
        const { data } = get();
        let errors: Partial<Record<keyof TableInterface, string>> = {};
        let hasError = false;
        // Validate NAME
        const nameError = get().validateField("name", data.name);
        if (nameError) {
            errors.name = nameError;
            hasError = true;
        }
        // Validate LOCATION
        const locationIdError = get().validateField("locationId", data.locationId.toString());
        if (locationIdError) {
            errors.locationId = locationIdError;
            hasError = true;
        }
        // Validate SEATS
        const seatsError = get().validateField("seats", data.seats.toString());
        if (seatsError) {
            errors.seats = seatsError;
            hasError = true;
        }
        // Validate STATUS
        const statusError = get().validateField("status", data.status);
        if (statusError) {
            errors.status = statusError;
            hasError = true;
        }
        set({ errors });
        return {
            isValid: !hasError,
            errors
        };
    },
    clearErrors: () => {
        set({
            errors: {},
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
            errors: currentErrors[name as keyof TableInterface]
                ? { ...currentErrors, [name]: undefined }
                : currentErrors
        });
    },
    resetData: () => {
        set({
            data: TableEntity
        })
    },
    setLocations: (i) => {
        set({ locations: i })
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
    setIsSearching: (i) => {
        set({
            isSearching: i
        })
    },
    setSearch: (e) => {
        const { value } = e.target;
        set({
            search: value
        })
    },
    setData: (i) => {
        set({
            data: i,
            preData: i,
            isLoading: false
        })
    },
    setToggleModal(i) {
        set({ 
            toggleModal: i 
        })
    },
    setIsLoading: (i) => {
        set({
            isLoading: i
        })
    },
    setIsSubmitting(i) {
        set({
            isSubmitting: i,
        })
    },
    getDataList: async() => {
        set({ isLoading: true });
        try {
            const res = await _tableListAction();
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
            const res = await _tableSearchAction(search);
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
            const res = await _tablePaginateAction(url);
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
            const res = await _tableViewAction(id);
            if (res && res.data) {
                set({
                    data: res.data,
                    preData: res.data,
                    isLoading: false,
                });
            } else {
                set({
                    data: TableEntity,
                    preData: TableEntity,
                    isLoading: false,
                });
            }
        } catch (error) {
            console.error(`Error: ${error}`);
            set({
                data: TableEntity,
                preData: TableEntity,
                isLoading: false,
            });
        }
    },
}));