"use client"
import { _bookingListAction, _bookingPaginateAction, _bookingSearchAction, _bookingViewAction } from "@/_api/actions/BookingActions";
import { BookingEntity, BookingInterface, BookingIsCheckedEntity, BookingIsCheckedInterface } from "@/_data/entity/BookingEntity";
import { MetaEntity, MetaInterface, MetaLinksEntity, MetaLinksInterface, ResponseInterface } from "@/_data/entity/ResponseEntity";
import { create } from "zustand";



interface BookingStoreInterface{
    message: string,
    search: string,
    isChecked: BookingIsCheckedInterface
    meta: MetaInterface,
    links: MetaLinksInterface,
    isSubmitting: boolean,
    isSearching: boolean,
    toggleModal: boolean,
    isLoading: boolean,
    errors: BookingInterface,
    data: BookingInterface,
    preData: BookingInterface,
    dataList: BookingInterface[],
    setDataList: (i: ResponseInterface) => void,
    setIsLoading: (i: boolean) => void,
    resetChecked: () => void,
    setIsChecked: (name: string, value: boolean) => void,
    setError: (name: string, value: string) => void,
    setIsSearching: (i: boolean) => void,
    setSearch: (e: React.ChangeEvent<HTMLInputElement>) => void,
    setToggleModal: (i: boolean) => void,
    setMessage: (i: string) => void,
    setIsSubmitting: (i: boolean) => void,
    setData: (i: BookingInterface) => void,
    setValue: (name: string, value: string | number) => void,
    setInputValue: (
        e: React.ChangeEvent<HTMLInputElement> | 
        React.ChangeEvent<HTMLTextAreaElement> |
        React.ChangeEvent<HTMLSelectElement>
    ) => void,
    resetData: () => void,
    clearErrors: () => void,
    validateField: (name: string, value: string) => string,
    validateForm: () => { isValid: boolean; errors: BookingInterface },
    validateForm2: () => { isValid: boolean; errors: BookingInterface },
    getData: (id: string | number) => Promise<void>,
    getDataList: () => Promise<void>,
    getSearchDatalist: (search: string) => Promise<void>,
    getPaginatedDatalist: (url: string) => Promise<void>,
}


export const useBookingStore = create<BookingStoreInterface>((set, get) => ({
    data: BookingEntity,
    preData: BookingEntity,
    errors: BookingEntity,
    message: "",
    meta: MetaEntity,
    isChecked: BookingIsCheckedEntity,
    links: MetaLinksEntity,
    isSubmitting: false,
    isSearching: false,
    isLoading: true,
    toggleModal: false,
    search: "",
    dataList: [],
    setIsLoading: (i) => {
        set({ isLoading: i })
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
    resetChecked: () => {
        set({
            isChecked: BookingIsCheckedEntity,
        })
    },
    setIsChecked: (name, value) => {
        const currentChecked = get().isChecked
        set({
            isChecked: {...currentChecked, [name]: value}
        })
    },
    setError: (name, value) => {
        const currentErrors = get().errors
        set({
            errors: {...currentErrors, [name]: value}
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
    setToggleModal: (i) => {
        set({ toggleModal: i })
    },
    setMessage: (i) => {
        set({ message: i })
    },
    setIsSubmitting: (i) => { 
        set({ 
            isSubmitting: i 
        }) 
    },
    setData: (i) => {
        set({ 
            data: i, 
            preData: i,
            isLoading: false,
        })
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
    resetData: () => {
        set({ 
            data: BookingEntity, 
            preData: BookingEntity
        })
    },
    clearErrors: () => {
        set({
            errors: BookingEntity
        })
    },
    validateField: (name, value) => {
        const { data } = get();
        let error = ""
        switch(name){
            case "tableId":
                if(!value.trim()){
                    error = "Table is required.";
                } 
                break;
            case "fullName":
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
            case "guests":
                if (!value.trim()) {
                    error = "Guests is required.";
                }
                break;
            case "cancelPolicy":
                if (!value.trim()) {
                    error = "Cancellation Policy is required.";
                }
                break;
            case "reservationPolicy":
                if (!value.trim()) {
                    error = "Reservation Policy is required.";
                }
                break;
            default:
                break;
        }
        return error
    },
    validateForm: () => { 
        const { data } = get();
        let errors = { ...BookingEntity };
        let hasError = false;
        // Validate TABLE ID
        const tableIdError = get().validateField("tableId", data.tableId.toString());
        if (tableIdError) {
            errors.tableId = tableIdError;
            hasError = true;
        }
        // Validate NAME
        const fullNameError = get().validateField("fullName", data.fullName);
        if (fullNameError) {
            errors.fullName = fullNameError;
            hasError = true;
        }
        // Validate PHONE
        const phoneError = get().validateField("phone", data.phone);
        if (phoneError) {
            errors.phone = phoneError;
            hasError = true;
        }
        // Validate EMAIL
        const emailError = get().validateField("email", data.email);
        if (emailError) {
            errors.email = emailError;
            hasError = true;
        }
        // Validate CANCEL POLICY
        const cancelPolicyError = get().validateField("cancelPolicy", data.cancelPolicy);
        if (cancelPolicyError) {
            errors.cancelPolicy = cancelPolicyError;
            hasError = true;
        }
        // Validate CANCEL POLICY
        const reservationPolicyError = get().validateField("reservationPolicy", data.reservationPolicy);
        if (reservationPolicyError) {
            errors.reservationPolicy = reservationPolicyError;
            hasError = true;
        }
        set({ errors });
        return {
            isValid: !hasError,
            errors
        };
    },
    validateForm2: () => { 
        const { data } = get();
        let errors = { ...BookingEntity };
        let hasError = false;
        // Validate FULL NAME
        const fullNameError = get().validateField("fullName", data.fullName);
        if (fullNameError) {
            errors.fullName = fullNameError;
            hasError = true;
        }
        // Validate GUESTS
        const guestsError = get().validateField("guests", data.guests.toString());
        if (guestsError) {
            errors.guests = guestsError;
            hasError = true;
        }
        // Validate PHONE
        const phoneError = get().validateField("phone", data.phone);
        if (phoneError) {
            errors.phone = phoneError;
            hasError = true;
        }
        // Validate EMAIL
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
    getData: async (id) => {
        set({ isLoading: true });
        try {
            const res = await _bookingViewAction(id);
            if (res && res.data) {
                set({
                    data: res.data,
                    preData: res.data,
                    isLoading: false,
                });
            } else {
                set({
                    data: BookingEntity,
                    preData: BookingEntity,
                    isLoading: false,
                });
            }
        } catch (error) {
            console.error(`Error: ${error}`);
            set({
                data: BookingEntity,
                preData: BookingEntity,
                isLoading: false,
            });
        }
    },
    getDataList: async() => {
        set({ isLoading: true });
        try {
            const res = await _bookingListAction();
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
            const res = await _bookingSearchAction(search);
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
            const res = await _bookingPaginateAction(url);
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
}));