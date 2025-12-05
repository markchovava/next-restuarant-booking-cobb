"use client"
import React, { useState } from 'react';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import ButtonClose from '@/_components/buttons/ButtonClose';
import TextInput from '@/_components/inputs/TextInput';
import TextAreaInput from '@/_components/inputs/TextAreaInput';
import ButtonPrimary from '@/_components/buttons/ButtonPrimary';
import { useAppInfoStore } from '@/_store/useAppInfoStore';
import { _appInfoStoreAction } from '@/_api/actions/AppInfoActions';


const title = "Edit App Information"

const variants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            type: 'spring',
            duration: 1,
        }
    },
}


export default function AppInfoEditModal() {
    const { setToggleModal, 
        toggleModal, 
        setInputValue, 
        data, 
        setIsSubmitting, 
        isSubmitting,
        errors,
        clearErrors,
        validateForm,
        getData
    } = useAppInfoStore()

    const handleToggleModal = () => {
        setToggleModal(false)
    }
   
   
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        clearErrors();
        // Validate form using store
        const validation = validateForm();
        if (!validation.isValid) {
            // Show the first error as toast
            const firstError = validation.errors.name || validation.errors.phone ||
                validation.errors.email || validation.errors.description
            toast.warn(firstError);
            return;
        }
        setIsSubmitting(true);
        const formData = {
            name: data.name,
            phone: data.phone,
            email: data.email,
            address: data.address,
            website: data.website,
            facebook: data.facebook,
            whatsapp: data.whatsapp,
            instagram: data.instagram,
            description: data.description,
        }
        try {
            const res = await _appInfoStoreAction(formData);
            if (res.status === 1) {
                toast.success(res.message);
                await getData();
                clearErrors();
                setToggleModal(false);
            } else {
                toast.error(res.message || 'Failed to update. Please try again.');
                console.error('Server response:', res);
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
    <AnimatePresence>
        {toggleModal &&
        <motion.section
            variants={variants}
            initial='hidden'
            animate='visible'
            exit='hidden'
            className='w-screen h-screen fixed top-0 left-0 z-200 overflow-y-auto' >
            <div className='absolute z-0 top-0 left-0 w-full h-full bg-black opacity-40'></div>
            <div className='w-full h-full absolute z-10 overflow-auto scroll__width py-24'>
            <section className='mx-auto lg:w-[50%] w-[90%] bg-white text-black p-6 rounded-2xl'>
                <div className='flex items-center justify-end'>
                    <ButtonClose onClick={handleToggleModal} />
                </div>
                <h2 className='text-[2rem] text-center font-light'>{title}</h2>
                <div className='w-full mb-3 border-b border-gray-400' />
                <form onSubmit={handleSubmit} className='space-y-5'>
                    {/* 1. Name */}
                    <TextInput 
                        type="text"
                        name="name"
                        label='Name'
                        onChange={setInputValue}
                        value={data.name}
                        placeholder="Enter Name here..."
                        error={errors.name}
                    />
                    {/* 2. Phone */}
                    <TextInput 
                        type="text"
                        name="phone"
                        label='Phone'
                        onChange={setInputValue}
                        value={data.phone}
                        placeholder="Enter Phone here..."
                        error={errors.phone} 
                    />

                    <TextInput 
                        type="email" 
                        name="email"
                        label='Email'
                        onChange={setInputValue}
                        value={data.email}
                        placeholder="Enter Email here..."
                        error={errors.email}
                    />

    {/* 4. Website (COMPLETED) */}
    <TextInput 
        type="url"
        name="website"
        label='Website URL'
        onChange={setInputValue}
        value={data.website}
        placeholder="Enter Website URL here..."
        error={errors.website}
    />

    {/* 5. WhatsApp (COMPLETED) */}
    <TextInput 
        type="text"
        name="whatsapp"
        label='WhatsApp Number'
        onChange={setInputValue}
        value={data.whatsapp}
        placeholder="Enter WhatsApp number here..."
        error={errors.whatsapp}
    />

    {/* 6. Facebook (COMPLETED) */}
    <TextInput 
        type="url"
        name="facebook"
        label='Facebook Profile URL'
        onChange={setInputValue}
        value={data.facebook}
        placeholder="Enter Facebook URL here..."
        error={errors.facebook}
    />
    
        {/* 7. Instagram (COMPLETED) */}
        <TextInput 
            type="text"
            name="instagram"
            label='Instagram Handle'
            onChange={setInputValue}
            value={data.instagram}
            placeholder="Enter Instagram handle here..."
            error={errors.instagram}
        />

    {/* 8. Address (COMPLETED) */}
    <TextAreaInput
        name="address"
        label='Address'
        onChange={setInputValue}
        value={data.address}
        placeholder="Enter Address here..."
        error={errors.address}
    />

    {/* 9. Description (CORRECTED) */}
    <TextAreaInput 
        name="description"
        label='Description'
        onChange={setInputValue}
        value={data.description} 
        placeholder="Enter Description here..."
        error={errors.description} 
    />

    <div className='flex items-center justify-center'>
        <ButtonPrimary name='Submit' type='submit' status={isSubmitting} />
    </div>
</form>

            </section>
            </div>
        </motion.section>
        }
    </AnimatePresence>
    </>
  )
}
