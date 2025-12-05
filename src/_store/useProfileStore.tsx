"use client"
import { _profileViewAction } from "@/_api/actions/ProfileActions";
import { ProfileEntity, ProfileInterface } from "@/_data/entity/ProfileEntity";
import { create } from "zustand";


interface ProfileStoreInterface{
    preData: ProfileInterface,
    data: ProfileInterface,
    errors: ProfileInterface,
    message: string,
    isLoading: boolean,
    isSubmitting: boolean,
    toggleModal: boolean,
    setToggleModal: (i: boolean) => void,
    setInputValue: (
        e: React.ChangeEvent<HTMLInputElement> | 
        React.ChangeEvent<HTMLTextAreaElement> |
        React.ChangeEvent<HTMLSelectElement>
    ) => void,
    setError: (name: string, value: string) => void,
    setData: (data: ProfileInterface) => void,
    resetData: () => void,
    setIsSubmitting: (status: boolean) => void,
    setMessage: (str: string) => void,
    clearErrors: () => void
    validateField: (name: string, value: string) => string,
    validateForm: () => { isValid: boolean; errors: ProfileInterface },
    getData: () => Promise<void>,
}


export const useProfileStore = create<ProfileStoreInterface>((set, get) => ({ 
    data: ProfileEntity,
    preData: ProfileEntity,
    errors: ProfileEntity,
    message: "",
    isLoading: true,
    isSubmitting: false,
    toggleModal: false,
    setToggleModal: (i) => {
        set({
            toggleModal: i
        })
    },
    setIsSubmitting: (status) => {
        set({
            isSubmitting: status
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
    setData: (data) => {
        set({
            data: data,
            preData: data,
            isLoading: false
        })
    },
    setError: (name, value) => {
        const currentErrors = get().errors;
        set({
            errors: { ...currentErrors, [name]: value }
        })
    },
    resetData: () => {
        set({
            data: ProfileEntity
        })
    },
    clearErrors: () => {
        set({ errors: ProfileEntity })
    },
    setMessage: (str) => {
        set({
            message: str
        })
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
        let errors = { ...ProfileEntity };
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
    getData: async () => {
        try {
            const res = await _profileViewAction();
            if (res && res.data ) {
                set({
                    data: res.data,
                    preData: res.data,
                    isLoading: false,
                });
            } else {
                set({
                    data: ProfileEntity,
                    preData: ProfileEntity,
                    isLoading: false,
                });
            }
        } catch (error) {
            console.error(`Error: ${error}`);
            set({
                data: ProfileEntity,
                preData: ProfileEntity,
                isLoading: false,
            });
        }
    }
   
}));