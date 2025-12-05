"use client"
import React, { useState } from 'react';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { toast } from 'react-toastify';
import ButtonClose from '@/_components/buttons/ButtonClose';
import TextInput from '@/_components/inputs/TextInput';
import ButtonPrimary from '@/_components/buttons/ButtonPrimary';
import { useTableStore } from '@/_store/useTableStore';
import { _tableUpdateAction } from '@/_api/actions/TableActions';
import SelectInputPrimary from '@/_components/inputs/SelectInputPrimary';
import SelectInputInitial from '@/_components/inputs/SelectInputInitial';
import { StatusData } from '@/_data/sample/StatusData';

 

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





export default function TableEditModal({id}: {id: number | string}) {
    const { setToggleModal, 
        toggleModal, 
        data, 
        errors, 
        isSubmitting,
        locations,
        resetData,
        setInputValue, 
        clearErrors,
        validateForm,
        setIsSubmitting,
        getData,
    } = useTableStore()
        
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
            const firstError = validation.errors.name || validation.errors.locationId ||
                validation.errors.seats || validation.errors.status
            toast.warn(firstError);
            return;
        }
        setIsSubmitting(true);
        const formData = {
            name: data.name,
            seats: data.seats,
            locationId: data.locationId,
            status: data.status,
            quantity: data.quantity,
        }
        try {
            const res = await _tableUpdateAction(id, formData);
            switch(res.status) {
                case 1:
                    await getData(id);
                    toast.success(res.message);
                    setToggleModal(false);
                    clearErrors();
                    return
                default:
                    toast.warn('Something went wrong, please try again.')
                    return
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
                <h2 className='text-[2rem] text-center font-light'>Booking Form</h2>
                <div className='w-full mb-3 border-b border-gray-400' />
                <form onSubmit={handleSubmit} className='space-y-5'>
                    <TextInput 
                        type="text"
                        name="name"
                        label='Name'
                        onChange={setInputValue}
                        value={data.name}
                        placeholder="Enter Name here..."
                        error={errors.name}
                    /> 
                    <TextInput 
                        type="number"
                        name="seats"
                        label='Seats'
                        onChange={setInputValue}
                        value={data.seats}
                        placeholder="Enter Seats here..."
                        error={errors.seats}
                    />

                    <TextInput 
                        type="number"
                        name="quantity"
                        label='Quantity'
                        onChange={setInputValue}
                        value={data.quantity}
                        placeholder="Enter Number of Tables here..."
                        error={''}
                    />
                
                    <SelectInputPrimary
                        data={StatusData}
                        type="text"
                        name="status"
                        label='Status'
                        onChange={setInputValue}
                        value={data.status}
                        placeholder="Enter Status here..."
                        error={errors.status}
                    />

                    {locations ?
                        <SelectInputInitial
                            data={locations}
                            name="locationId"  
                            label='Location'  
                            onChange={setInputValue}
                            value={data.locationId}  
                            error={errors.locationId}  
                        />
                    :
                        <p className='font-light text-2xl text-red-500'>
                            Locations not Added at the moment.
                        </p>
                    }
                
                    <div className='flex items-center justify-center'>
                        <ButtonPrimary 
                            name='Submit' 
                            type='submit' 
                            status={isSubmitting} />
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
