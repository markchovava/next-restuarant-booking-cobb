"use client"
import { _appInfoViewAction } from "@/_api/actions/AppInfoActions";
import { AppInfoEntity, AppInfoInterface } from "@/_data/entity/AppInfoEntity";
import { create } from "zustand";

interface AppInfoStoreInterface{
    data: AppInfoInterface,
    preData: AppInfoInterface,
    errors: AppInfoInterface,
    toggleModal: boolean,
    isLoading: boolean,
    isSubmitting: boolean,
    setInputValue: (
        e: React.ChangeEvent<HTMLInputElement> | 
        React.ChangeEvent<HTMLTextAreaElement> |
        React.ChangeEvent<HTMLSelectElement>
    ) => void,
    setData: (i: AppInfoInterface) => void,
    setToggleModal: (i: boolean) => void
    setIsLoading: (i: boolean) => void,
    setIsSubmitting: (i: boolean) =>void,
    clearErrors: () => void,
    resetData: () => void,
    validateField: (name: string, value: string) => string,
    validateForm: () => { isValid: boolean; errors: AppInfoInterface },
    getData: () => Promise<void>

}


export const useAppInfoStore = create<AppInfoStoreInterface>((set, get) => ({
    data: AppInfoEntity,
    preData: AppInfoEntity,
    errors: AppInfoEntity,
    toggleModal: false,
    isLoading: true,
    isSubmitting: false,
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
    clearErrors: () => {
        set({
            errors: AppInfoEntity,
        })
    },
    resetData: () => {
        set({
            data: AppInfoEntity,
        })
    },
    validateField: (name, value) => {
        let error = ""
        switch(name){
            case "name":
                if(!value?.trim()) {
                    error = "Name is required.";
                }
                break;
            case "phone":
                if(!value?.trim()) {
                    error = "Phone is required.";
                }
                break;
            case "email":
                if(!value?.trim()){
                    error = "Email is required.";
                } 
                break;
            case "description":
                if(!value?.trim()){
                    error = "Description is required.";
                }
                break;
            default:
                break;
        }
        return error
    },
    validateForm: () => { 
        const { data } = get();
        let errors = { ...AppInfoEntity };
        let hasError = false;
        // Validate name
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
        // Validate PHONE
        const emailError = get().validateField("email", data.email);
        if (emailError) {
            errors.email = emailError;
            hasError = true;
        }
        // Validate description
        const descriptionError = get().validateField("description", data.description);
        if (descriptionError) {
            errors.description = descriptionError;
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
            const res = await _appInfoViewAction();
            if (res && res.data ) {
                set({
                    data: res.data,
                    preData: res.data,
                    isLoading: false,
                });
            } else {
                set({
                    data: AppInfoEntity,
                    preData: AppInfoEntity,
                    isLoading: false,
                });
            }
        } catch (error) {
            console.error(`Error: ${error}`);
            set({
                data: AppInfoEntity,
                preData: AppInfoEntity,
                isLoading: false,
            });
        }
    },

}));