"use client"
import React from 'react';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import ButtonClose from '@/_components/buttons/ButtonClose';
import { useScheduleBookingStore } from '@/_store/useScheduleBookingStore';
import { useBookingStore } from '@/_store/useBookingStore';
import TextInput from '@/_components/inputs/TextInput';
import TextAreaInput from '@/_components/inputs/TextAreaInput';
import ButtonPrimary from '@/_components/buttons/ButtonPrimary';
import { toast } from 'react-toastify';
import { _bookingUpdateAction } from '@/_api/actions/BookingActions';

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

interface PropsInterface{
    id: string | number
}


export default function BookingUserEditModal({id}: PropsInterface) {
    const { setToggleModal, 
        toggleModal, 
        setInputValue, 
        isSubmitting,
        data,
        errors,
        setIsSubmitting,
        clearErrors,
        validateForm2,
        getData
    } = useBookingStore()
    
    const handleToggleModal = () => {
        setToggleModal(false)
    }
       
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        clearErrors();
        
        setIsSubmitting(true);
        const formData = {
            fullName: data.fullName,
            email: data.email,
            guests: data.guests,
            phone: data.phone,
            notes: data.notes,
        }
        try {
            const res = await  _bookingUpdateAction(id, formData);
            //console.log('', res)
            if (res.status === 1) {
                toast.success(res.message);
                await getData(id);
                setToggleModal(false);
                clearErrors();
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
                <h2 className='text-[2rem] text-center font-light'>Booking Form</h2>
                <div className='w-full mb-3 border-b border-gray-400' />
                <div className='h-4' />
                <form onSubmit={handleSubmit} className='space-y-5'>
                    <TextInput 
                        type="text" 
                        name="fullName"
                        label='Full Name'
                        onChange={setInputValue}
                        value={data.fullName}
                        placeholder="Enter Full Name here..."
                        error={errors.fullName}
                    />
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
                    <TextInput 
                        type="number" 
                        name="guests"
                        label="Guests"
                        onChange={setInputValue}
                        value={data.guests}
                        placeholder="Enter guests here..."
                        error={errors.guests.toString()}
                    />
                     <TextAreaInput 
                        type="" 
                        name="notes"
                        label='Notes'
                        onChange={setInputValue}
                        value={data.notes}
                        placeholder="Enter Notes here..."
                        error={errors.notes}
                    />
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