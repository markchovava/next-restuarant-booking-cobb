"use client"

import { useContactStore } from "@/_store/useContactStore"
import ButtonPrimary from "../buttons/ButtonPrimary"
import TextAreaInput from "../inputs/TextAreaInput"
import TextInput from "../inputs/TextInput"
import { useEffect } from "react"
import { toast } from "react-toastify"
import { contactStoreAction } from "@/_api/actions/ContactActions"



export default function FormContact() {
    const {  
        data, 
        setData, 
        resetData,
        errors,
        setInputValue, 
        isSubmitting, 
        setIsSubmitting,
        clearErrors,
        validateForm,
        getDatalist
    } = useContactStore()

    useEffect(() => {
        resetData();
    }, [])
    
        
    
    async function postData(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        clearErrors();
        // Validate form using store
        const validation = validateForm();
        if (!validation.isValid) {
            // Show the first error as toast
            const firstError = validation.errors.name || validation.errors.email ||
                validation.errors.message
            toast.warn(firstError);
            return;
        }
        setIsSubmitting(true);
        const formData = {
            name: data.name,
            email: data.email,
            message: data.message,
        }
        try {
            const res = await contactStoreAction(formData);
            console.log('res', res)
            if(res.status){
                toast.success(res.message)
                resetData()
                clearErrors();
                return
            }
            else{
                toast.warn("Something went wrong, please try again.")
            }   
        } catch (error) {
            toast.error('Failed to save data. Please try again.');
            console.error('Form submission error:', error);
        } finally {
            setIsSubmitting(false);
        }
    }


  return (
    <>
    <form onSubmit={postData}>
        <h3 className="text-[2.5rem] font-light mb-3">Write to us</h3>
        <div className="space-y-3">
            <TextInput
                label="Name"
                type="text"
                name="name"
                onChange={setInputValue}
                value={data.name}
                placeholder="Enter Name here..."
                error={errors.name ?? ""}
            />
            <TextInput
                label="Email"
                type="text"
                name="email"
                onChange={setInputValue}
                value={data.email}
                placeholder="Enter Email here..."
                error={errors.email ?? ""}
            />
            {/*  */}
            <TextAreaInput
                label="Message"
                type="text"
                name="message"
                onChange={setInputValue}
                value={data.message}
                placeholder="Enter Message here..."
                error={errors.message ?? ""}
            />
            <ButtonPrimary 
                name='Submit' 
                status={isSubmitting} />

        </div>
    </form>
    </>
  )
}
