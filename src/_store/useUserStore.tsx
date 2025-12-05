"use client"
import { _userListAction, _userPaginateAction, _userSearchAction, _userViewAction } from "@/_api/actions/UserActions";
import { UserEntity, UserInterface } from "@/_data/entity/UserEntity";
import { MetaEntity, MetaInterface, MetaLinksEntity, MetaLinksInterface, ResponseInterface } from "@/_data/entity/ResponseEntity";
import { create } from "zustand";


interface UserStoreInterface{
    dataList: UserInterface[]
    meta: MetaInterface,
    links: MetaLinksInterface,
    data: UserInterface,
    errors: UserInterface,
    preData: UserInterface,
    toggleModal: boolean,
    search: string,
    isSearching: boolean,
    isLoading: boolean,
    isSubmitting: boolean,
    setInputValue: (
        e: React.ChangeEvent<HTMLInputElement> | 
        React.ChangeEvent<HTMLTextAreaElement> |
        React.ChangeEvent<HTMLSelectElement>
    ) => void,
    setDataList: (data: ResponseInterface) => void,
    setIsSearching: (i: boolean) => void,
    setSearch: (e: React.ChangeEvent<HTMLInputElement>) => void,
    setData: (i: UserInterface) => void,
    setToggleModal: (i: boolean) => void
    setIsLoading: (i: boolean) => void,
    setIsSubmitting: (i: boolean) => void,
    clearErrors: () => void,
    resetData: () => void,
    getDataList: () => Promise<void>
    getSearchDatalist: (search: string) => Promise<void>
    getPaginatedDatalist: (url: string) => Promise<void>
    getData: (id: string | number) => Promise<void>
    validateField: (name: string, value: string) => string,
    validateForm: () => { isValid: boolean; errors: UserInterface },
}


export const useUserStore = create<UserStoreInterface>((set, get) => ({
    dataList: [],
    meta: MetaEntity,
    links: MetaLinksEntity,
    data: UserEntity,
    errors: UserEntity,
    preData: UserEntity,
    toggleModal: false,
    isLoading: true,
    search: "",
    isSearching: false,
    isSubmitting: false,
    resetData: () => {
        set({
            data: UserEntity,
        });
    },
    validateField: (name, value) => {
        const { data } = get();
        let error = ""
        switch(name){
            case "name":
                if(!value.trim()){
                    error = "Full Name is required.";
                } 
                break;
            case "email":
                if(!value.trim()){
                    error = "Email is required.";
                } 
                break;
            case "phone":
                if (!value.trim()) {
                    error = "Phone Number is required.";
                }
                break;
            default:
                break;
        }
        return error
    },
    validateForm: () => { 
        const { data } = get();
        let errors = { ...UserEntity };
        let hasError = false;
        // Validate NAME
        const nameError = get().validateField("name", data.name);
        if (nameError) {
            errors.name = nameError;
            hasError = true;
        }
        // Validate PHONE
        const phoneError = get().validateField("phone", data.phone);
        if (phoneError) {
            errors.phone = phoneError;
            hasError = true;
        }
        // Validate EMAILT4H
        const emailError = get().validateField("email", data.email);
        if (emailError) {
            errors.email = emailError;
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
            errors: UserEntity,
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
    setIsSearching: (i) => {
        set({
            isSearching: i
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
            const res = await _userListAction();
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
            const res = await _userSearchAction(search);
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
            const res = await _userPaginateAction(url);
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
            const res = await _userViewAction(id);
            if (res && res.data) {
                set({
                    data: res.data,
                    preData: res.data,
                    isLoading: false,
                });
            } else {
                set({
                    data: UserEntity,
                    preData: UserEntity,
                    isLoading: false,
                });
            }
        } catch (error) {
            console.error(`Error: ${error}`);
            set({
                data: UserEntity,
                preData: UserEntity,
                isLoading: false,
            });
        }
    },
}));