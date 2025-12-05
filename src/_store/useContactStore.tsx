"use client"

import { ContactEntity, ContactInterface } from "@/_data/entity/ContactEntity"
import { ResponseInterface } from "@/_data/entity/ResponseEntity"
import { create } from "zustand"

interface ContactStoreInterface {
    data: ContactInterface,
    datalist: ContactInterface[],
    errors: Partial<ContactInterface>,
    search: string,
    message: string,
    isLoading: boolean,
    isSubmitting: boolean,
    isSearching: boolean,
    links?: any,
    meta?: any,
    setMessage: (message: string) => void,
    setSearch: (e: React.ChangeEvent<HTMLInputElement>) => void,
    setIsSearching: (status: boolean) => void,
    setIsSubmitting: (status: boolean) => void,
    setData: (data: ContactInterface) => void,
    setDatalist: (data: ResponseInterface) => void,
    setInputValue: (
        e: React.ChangeEvent<HTMLInputElement> | 
        React.ChangeEvent<HTMLTextAreaElement> |
        React.ChangeEvent<HTMLSelectElement>
    ) => void,
    resetData: () => void,
    clearErrors: () => void,
    getDatalist: () => Promise<void>
    getSearchDatalist: (search: string) => Promise<void>
    getPaginatedDatalist: (url: string) => Promise<void>
    getDataById: (id: string | number) => Promise<void>
    validateField: (name: string, value: string) => string,
    validateForm: () => { isValid: boolean; errors: ContactInterface },
}


export const useContactStore = create<ContactStoreInterface>((set, get) => ({ 
    data: ContactEntity,
    datalist: [],
    errors: ContactEntity,
    search: "",
    message: "",
    isLoading: true,
    isSubmitting: false,
    isSearching: false,
    links: undefined,
    meta: undefined,
    setMessage: (msg) => {
        set({ message: msg })
    },    
    setSearch: (e) => {
        const { value } = e.target;
        set({
            search: value
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
            errors: currentErrors[name as keyof ContactInterface]
                ? { ...currentErrors, [name]: "" }
                : currentErrors
        });
    },
    validateField: (name, value) => {
            let error = ""
            switch(name){
                case "name":
                    if(!value.trim()) {
                        error = "Name is required.";
                    }
                    break;
                case "message":
                    if(!value.trim()) {
                        error = "Message is required.";
                    }
                    break;
                case "email":
                    if(!value.trim()) {
                        error = "Email is required.";
                    }
                    break;
                default:
                    break;
            }
            return error
    },
    validateForm: () => { 
        const { data } = get();
        let errors = { ...ContactEntity };
        let hasError = false;
        // Validate name
        const nameError = get().validateField("name", data.name);
        if (nameError) {
            errors.name = nameError;
            hasError = true;
        }
            // Validate PHONE
        const emailError = get().validateField("email", data.email);
        if (emailError) {
            errors.email = emailError;
            hasError = true;
        }
        // Validate PHONE
        const messageError = get().validateField("message", data.message);
        if (messageError) {
            errors.message = messageError;
            hasError = true;
        }
        set({ errors });
        return {
            isValid: !hasError,
            errors
        };
    },
    setData: (data) => {
        set({
            data: data,
            isLoading: false,
        })
    },   
    setDatalist: (res) => {
        const { links, meta, data } = res
        set({
            datalist: data,
            links: links,
            meta: meta,
            isLoading: false,
        })
    }, 
    setIsSearching: (status) => {
        set({ isSearching: status })
    },
    setIsSubmitting: (status) => {
        set({ isSubmitting: status })
    },
    resetData: () => {
        set({
            data: ContactEntity,
            errors: {},
            message: ""
        })
    }, 
    clearErrors: () => {
        set({ errors: {} })
    }, 
    getDatalist: async () => {
        // Implementation needed
    },
    getSearchDatalist: async (search: string) => {
        // Implementation needed
    },
    getPaginatedDatalist: async (url: string) => {
        // Implementation needed
    }, 
    getDataById: async (id: string | number) => {
        // Implementation needed
    }
}));