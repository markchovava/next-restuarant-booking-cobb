"use client"
import { _locationListAction, _locationPaginateAction, _locationSearchAction, _locationViewAction } from "@/_api/actions/LocationActions";
import { LocationEntity, LocationErrorEntity, LocationErrorInterface, LocationInterface } from "@/_data/entity/LocationEntity";
import { MetaEntity, MetaInterface, MetaLinksEntity, MetaLinksInterface, ResponseInterface } from "@/_data/entity/ResponseEntity";
import { toast } from "react-toastify";
import { create } from "zustand";

interface LocationStoreInterface{
    dataList: LocationInterface[]
    meta: MetaInterface,
    links: MetaLinksInterface,
    data: LocationInterface,
    errors: LocationErrorInterface,
    preData: LocationInterface,
    toggleModal: boolean,
    search: string,
    isSearching: boolean,
    isLoading: boolean,
    isSubmitting: boolean,
    clearErrors: () => void,
    setInputValue: (
        e: React.ChangeEvent<HTMLInputElement> | 
        React.ChangeEvent<HTMLTextAreaElement> |
        React.ChangeEvent<HTMLSelectElement>
    ) => void,
    setDataList: (data: ResponseInterface) => void,
    setIsSearching: (i: boolean) => void,
    setSearch: (e: React.ChangeEvent<HTMLInputElement>) => void,
    setData: (i: LocationInterface) => void,
    setToggleModal: (i: boolean) => void
    setIsLoading: (i: boolean) => void,
    setIsSubmitting: (i: boolean) => void,
    resetData: () => void,
    getDataList: () => Promise<void>
    getSearchDatalist: (search: string) => Promise<void>
    getPaginatedDatalist: (url: string) => Promise<void>
    getData: (id: string | number) => Promise<void>
    validateField: (name: string, value: string | number) => string,
    validateForm: () => { isValid: boolean; errors: LocationErrorInterface },
}


export const useLocationStore = create<LocationStoreInterface>((set, get) => ({
    dataList: [],
    meta: MetaEntity,
    errors: LocationErrorEntity,
    links: MetaLinksEntity,
    data: LocationEntity,
    preData: LocationEntity,
    toggleModal: false,
    isLoading: true,
    search: "",
    isSearching: false,
    isSubmitting: false,
    resetData: () => {
        set({
            data: LocationEntity
        })
    },
    clearErrors: () => {
        set({
            errors: LocationErrorEntity
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
            const res = await _locationListAction();
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
        /* if(!search) {
            toast.warn('Search input is required.');
            set({ isSearching: false });
            return
        } */
        try {
            const res = await _locationSearchAction(search);
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
            const res = await _locationPaginateAction(url);
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
            const res = await _locationViewAction(id);
            if (res && res.data) {
                set({
                    data: res.data,
                    preData: res.data,
                    isLoading: false,
                });
            } else {
                set({
                    data: LocationEntity,
                    preData: LocationEntity,
                    isLoading: false,
                });
            }
        } catch (error) {
            console.error(`Error: ${error}`);
            set({
                data: LocationEntity,
                preData: LocationEntity,
                isLoading: false,
            });
        }
    },
    validateField: (name, value) => {
        let error = ""
        switch(name){
            case "name":
                if(!String(value).trim()){
                    error = "Name is required.";
                } 
                break;
            case "slug":
                if(!String(value).trim()){
                    error = "Slug is required.";
                } 
                break;
            case "status":
                if (!String(value).trim()) {
                    error = "Status is required.";
                }
                break;
            case "tablesTotal":
                if (value === "" || value === null || value === undefined) {
                    error = "Tables Total is required.";
                } else if (Number(value) < 0) {
                    error = "Tables Total must be a positive number.";
                }
                break;
            default:
                break;
        }
        return error
    },
    validateForm: () => { 
        const { data } = get();
        let errors = { ...LocationErrorEntity };
        let hasError = false;
        
        // Validate NAME
        const nameError = get().validateField("name", data.name);
        if (nameError) {
            errors.name = nameError;
            hasError = true;
        }
        
        // Validate SLUG
        const slugError = get().validateField("slug", data.slug);
        if (slugError) {
            errors.slug = slugError;
            hasError = true;
        }
        
        // Validate STATUS
        const statusError = get().validateField("status", data.status);
        if (statusError) {
            errors.status = statusError;
            hasError = true;
        }
        
        // Validate TABLES TOTAL
        const tablesTotalError = get().validateField("tablesTotal", data.tablesTotal);
        if (tablesTotalError) {
            errors.tablesTotal = tablesTotalError;
            hasError = true;
        }
        
        set({ errors });
        return {
            isValid: !hasError,
            errors
        };
    },
}));